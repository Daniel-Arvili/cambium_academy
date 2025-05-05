// app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchCategoryBySlug, fetchVideosByCategory } from "@/services/google_sheet";
import VideoGrid from "@/components/video-grid";

// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const category = await fetchCategoryBySlug(params.slug);
//   return {
//     title: category
//       ? `${category.name} – Cambium Academy`
//       : "Category Not Found – Cambium Academy",
//   };
// }

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const videos = await fetchVideosByCategory(category.slug);
  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-">{category.name}</h1>
      </header>

      <VideoGrid videos={videos} />
    </main>
  );
}
