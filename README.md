# Private Gallerie

Minimalistische, mobile-first Galerie (Next.js + Tailwind). Zero-Backend. Bilder aus `public/items`.

## Quickstart

1) Bilder hinzufügen
- Lege deine Bilder in `public/items/` ab (oder in `pics/`, wird beim Generieren kopiert/konvertiert).
- Dateiname: `brand_model-category-size-price.jpg` (z.B. `nike_airmax-shoes-43-80.jpg`).
- Felder sind optional, sinnvolle Defaults werden gesetzt.

2) Install & Generate
```bash
npm i
npm run items:gen
npm run dev
```

3) Deploy
- Push auf Vercel. Statisch, kein Backend nötig.

## WhatsApp Nummer
- Optional: `WHATSAPP_NUMBER` in `lib/config.ts` setzen. Standard ist leer (Buttons aus).

## Hinweise
- Infinite Scroll via IntersectionObserver.
- `next/image` für Lazy Loading & CLS-Schutz.
- Filter: Kategorie, Größe. Suche: Titel/Brand.
- Detail: Sheet/Modal, Share (Web Share / Clipboard).
