import { RowData } from "@/lib/data";
import { Category } from "@/lib/data";
import { slugify } from "@/lib/utils";

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

let rows: RowData[] = [];
export const getRows = async (): Promise<RowData[]> => {
  if (rows.length === 0) {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`,
        {
          next: {
            revalidate: 3600 
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

    } catch (e) {
      console.error('Error fetching data:', e);
      return [];
    }
  }

  return rows;
};

let categoriesCache: Category[] = [];

export const getCategories = async (): Promise<Category[]> => {
  if (categoriesCache.length === 0) {
    const rows = await getRows();

    const counts: Record<string, number> = {};
    for (const row of rows) {
      if (row.id) {
        const name = row.category?.trim() || "Misc";
        const norm = slugify(name);
        counts[norm] = (counts[norm] || 0) + 1;
      }
    }

    const seen = new Set<string>();
    categoriesCache = rows
      .map(r => r.category?.trim() || "Misc")
      .map(name => {
        const norm = slugify(name);
        return { name, norm };
      })
      .filter(({ norm }) => {
        if (seen.has(norm)) return false;
        seen.add(norm);
        return true;
      })
      .map(({ name, norm }) => ({
        name,
        count: counts[norm] || 0,
      }))
      .filter(category => category.count > 0);
  }

  return categoriesCache;
};

export const getCategoryNames = async (): Promise<string[]> => {
  const cats = await getCategories();
  return cats.map(c => c.name);
};

export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  const cats = await getCategories();
  const decoded = decodeURIComponent(slug);
  const norm = slugify(decoded);
  return cats.find(c => slugify(c.name) === norm);
}

export async function fetchVideosByCategory(categorySlug: string): Promise<RowData[]> {
  const rows = await getRows();
  const norm = slugify(decodeURIComponent(categorySlug));
  const filteredVideos = rows.filter(r => slugify(r.category?.trim() || "") === norm);
  return filteredVideos.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    const dateA = new Date(`20${yearA}-${monthA}-${dayA}`).getTime();
    const dateB = new Date(`20${yearB}-${monthB}-${dayB}`).getTime();
    return dateB - dateA;
  });
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
  const norm = slugify(decodeURIComponent(categorySlug));
  return rows.filter(
    (r) => slugify(r.category.trim()) === norm && r.id !== currentId
  );
}

export async function searchVideos(query: string): Promise<RowData[]> {
  const rows = await getRows();
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) return [];
  
  return rows.filter(row => {
    const title = (row.title || '').toLowerCase();
    const category = (row.category || '').toLowerCase();
    const personName = (row.person_name || '').toLowerCase();
    
    return title.includes(searchQuery) || 
           category.includes(searchQuery) ||
           personName.includes(searchQuery);
  });
}