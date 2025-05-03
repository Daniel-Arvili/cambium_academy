// app/page.tsx
import MainPage from "./(main)/main-page";
import { getCategories, getRows } from "@/services/google_sheet";
import { Category, RowData } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
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

  const idCountMap: Record<string, number> = {};
  const featuredVideos = latestSixRaw.map(video => {
    const seen = (idCountMap[video.id] ||= 0) + 1;
    idCountMap[video.id] = seen;
    return {
      ...video,
      id: seen > 1 ? `${video.id}-${seen}` : video.id,
    };
  });

  return (
    <MainPage
      searchParams={searchParams}
      data={rows}
      categories={categories}
      featuredVideos={featuredVideos}
    />
  );
}
