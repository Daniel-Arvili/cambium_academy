// app/page.tsx
import MainPage from "./(main)/main-page";
import { getCategories, getRows } from "@/services/google_sheet";
import { Category, RowData } from "@/lib/data";

export default async function Home()
{
  const rows: RowData[] = await getRows();
  const categories: Category[] = await getCategories();


  const latestSixRaw = rows
    .map(r => ({
      ...r,
      _parsedDate: new Date(r.date.split("/").reverse().join("-")), 
    }))
    .sort((a, b) => b._parsedDate.getTime() - a._parsedDate.getTime())
    .slice(0, 6)
    .map(({ _parsedDate, ...rest }) => rest); 

  const featuredVideos = latestSixRaw;

  return (
    <MainPage
      data={rows}
      categories={categories}
      featuredVideos={featuredVideos}
    />
  );
}
