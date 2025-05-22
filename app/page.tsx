// app/page.tsx
import MainPage from "./(main)/main-page";
import { getCategories, getRows } from "@/services/google_sheet";
import { Category, RowData } from "@/lib/data";

export default async function Home() {
  const rows: RowData[] = await getRows();
  const categories: Category[] = await getCategories();

  const latestSixRaw = rows
    .filter(r => r.date.trim())
    .sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  const featuredVideos = latestSixRaw;
  return (
    <MainPage
      data={rows}
      categories={categories}
      featuredVideos={featuredVideos}
    />
  );
}
