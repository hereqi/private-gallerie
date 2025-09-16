export type Item = {
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

export const CATEGORIES: Array<Item["category"]> = [
  "shirt",
  "jacket",
  "pants",
  "shoes",
  "hoodie",
  "accessory",
  "other",
];

