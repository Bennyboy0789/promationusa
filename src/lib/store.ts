import storeData from "@/content/store.json";

export type StoreVariant = { name: string; price?: string; sku?: string };

export type StoreItem = {
  slug: string;
  url: string;
  name: string;
  price?: string;
  variants?: StoreVariant[];
  description?: string;
  categories?: string[];
  images?: { src: string; alt?: string }[];
  sku?: string;
};

type StoreContent = {
  categories: string[];
  products: StoreItem[];
};

const store = storeData as StoreContent;

export const storeCategories: string[] = store.categories.filter(
  (c) => c.toLowerCase() !== "all"
);

export const storeItems: StoreItem[] = store.products;

export function getStoreItem(slug: string): StoreItem | undefined {
  return storeItems.find((p) => p.slug === slug);
}

export function getRelatedItems(item: StoreItem, limit = 4): StoreItem[] {
  const cats = new Set(item.categories ?? []);
  const related = storeItems.filter(
    (p) => p.slug !== item.slug && (p.categories ?? []).some((c) => cats.has(c))
  );
  const rest = storeItems.filter(
    (p) => p.slug !== item.slug && !related.includes(p)
  );
  return [...related, ...rest].slice(0, limit);
}
