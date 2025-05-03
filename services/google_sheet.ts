import { RowData } from "@/lib/data";
import { Category } from "@/lib/data";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

if (!SPREADSHEET_ID || !API_KEY) {
  throw new Error('Missing required environment variables: GOOGLE_SHEETS_SPREADSHEET_ID or GOOGLE_SHEETS_API_KEY');
}

export const rowToObject = (
    dataRow: string[],
    headerRow: string[],
  ): RowData => {
    const rowObject: any = {};
  
    headerRow.forEach((column: string, index: number) => {
      rowObject[column] = dataRow[index];
    });
  
    return rowObject as RowData;
  };

  // get all rows and categories once and cache them
let rows: RowData[] = [];
let categories: string[] = [];
export const getRows = async (): Promise<RowData[]> => {
  if (rows.length === 0) {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`,
        {
          next: {
            revalidate: 3600 // Revalidate every hour
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const [headerRow, ...dataRows] = data.values;

      rows = dataRows.map((dataRow: string[]) =>
        rowToObject(dataRow, headerRow),
      );

      //rows.sort((a, b) => compareDates(a.date, b.date));
    } catch (e) {
      console.error('Error fetching data:', e);
      return [];
    }
  }

  return rows;
};

let categoriesCache: Category[] = [];

/** simple slugify: lowercase + replace non-alphanum with hyphens */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const getCategories = async (): Promise<Category[]> => {
  if (categoriesCache.length === 0) {
    const rows = await getRows();

  
    // 1️⃣ count how many times each category name appears
    const counts: Record<string, number> = {};
    for (const row of rows) {
      const name = row.category?.trim() || "Misc";
      counts[name] = (counts[name] || 0) + 1;
    }

    // 2️⃣ build your Category objects in the order they first appeared
    const seen = new Set<string>();
    categoriesCache = rows
      .map(r => r.category?.trim() || "Misc")
      .filter(name => {
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      })
      .map(name => {
        const slug = slugify(name);
        return {
          id: slug,        // you could also use a UUID here
          name,
          slug,
          count: counts[name],
          icon: "",        // fill in your icon logic later
        };
      });
  }

  return categoriesCache;
};

export const getCategoryNames = async (): Promise<string[]> => {
  const cats = await getCategories();
  return cats.map(c => c.name);
};


export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  const cats = await getCategories();
  return cats.find(c => c.slug === slug);
}

export async function fetchVideosByCategory(categorySlug: string): Promise<RowData[]> {
  const rows = await getRows();
  return rows.filter(r => slugify(r.category?.trim() || "") === categorySlug);
}
export async function fetchVideoById(id: string): Promise<RowData | undefined> {
  const rows = await getRows();
  return rows.find(r => r.id === id);
}
export async function fetchRelatedVideos(
  categorySlug: string,
  currentId: string
): Promise<RowData[]> {
  const rows = await getRows();
  return rows.filter(
    (r) => slugify(r.category.trim()) === categorySlug && r.id !== currentId
  );
}