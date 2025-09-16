import { promises as fs } from "fs";
import { exec } from "child_process";
import path from "path";

const IMG_DIR = path.join(process.cwd(), "public", "items");
const PICS_DIR = path.join(process.cwd(), "pics");
const OUT = path.join(process.cwd(), "data", "items.json");

type Item = {
  id: string;
  title: string;
  brand?: string;
  category: "shirt"|"jacket"|"pants"|"shoes"|"hoodie"|"accessory"|"other";
  size?: string;
  condition?: "neu"|"sehr gut"|"gut"|"ok";
  price?: number;
  image: string;
  notes?: string;
  tags?: string[];
};



function toTitleCase(input: string): string {
  return input
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function guessTitleBrand(rawTitle: string) {
  const cleaned = rawTitle.replace(/[_]+/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const brand = (parts[0] || "Generic").toUpperCase();
  const title = toTitleCase(cleaned || "Item");
  return { brand, title };
}

function parseName(name: string) {
  const [rawTitle = "item", rawCategory = "other", rawSize = "", rawPrice = ""] = name.split("-");
  const { brand, title } = guessTitleBrand(rawTitle);
  const category = (rawCategory as Item["category"]) || "other";
  const size = rawSize || undefined;
  const price = rawPrice ? Number(rawPrice) : undefined;
  return { brand, title, category, size, price };
}

async function main() {
  try {
    await fs.mkdir(IMG_DIR, { recursive: true });
    // Optional: sync from ./pics → public/items
    await syncFromPics();
    const files = await fs.readdir(IMG_DIR);
    const items: Item[] = files
      .filter((f) => /\.(?:jpe?g|png|webp|avif)$/i.test(f))
      .map((f) => {
        const base = f.replace(/\.[^.]+$/, "");
        const { brand, title, category, size, price } = parseName(base);
        const id = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const item: Item = {
          id,
          title,
          brand,
          category: (category as Item["category"]) || "other",
          size,
          condition: "gut",
          price,
          image: `/items/${f}`,
          notes: "",
        };
        return item;
      });

    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, JSON.stringify(items, null, 2));
    console.log(`Generated ${items.length} items → data/items.json`);
  } catch (err) {
    console.error("items:gen failed:", err);
    process.exitCode = 1;
  }
}

main();

async function fileExists(p: string) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function syncFromPics() {
  const exists = await fileExists(PICS_DIR);
  if (!exists) return; // nothing to do

  const entries = await fs.readdir(PICS_DIR);
  for (const name of entries) {
    const src = path.join(PICS_DIR, name);
    const stat = await fs.stat(src);
    if (!stat.isFile()) continue;
    const ext = path.extname(name).toLowerCase();
    const base = path.basename(name, ext);
    if ([".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
      const dest = path.join(IMG_DIR, name);
      await fs.copyFile(src, dest).catch(() => {});
    } else if (ext === ".heic") {
      const destJpg = path.join(IMG_DIR, `${base}.jpg`);
      await convertHeicToJpeg(src, destJpg).catch(() => {});
    }
  }
}

function convertHeicToJpeg(input: string, output: string): Promise<void> {
  // Uses macOS `sips` if available; otherwise no-op
  return new Promise((resolve, reject) => {
    exec(`command -v sips >/dev/null 2>&1 && sips -s format jpeg ${JSON.stringify(input)} --out ${JSON.stringify(output)} >/dev/null`, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}


