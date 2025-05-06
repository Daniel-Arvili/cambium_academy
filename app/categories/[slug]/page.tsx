import { notFound } from 'next/navigation';
import {
  fetchCategoryBySlug,
  fetchVideosByCategory,
} from '@/services/google_sheet';
import VideoGrid from '@/components/video-grid';
import { Pagination } from '@/components/pagination';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) notFound();

  // fetch _all_ the videos in this category
  const allVideos = await fetchVideosByCategory(category.slug);

  // figure out current page (default to 1), pageSize, and slice
  const pageSize = 6;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const start = (currentPage - 1) * pageSize;
  const videos = allVideos.slice(start, start + pageSize);

  const basePath = `/categories/${category.slug}`;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">{category.name}</h1>
      </header>

      <VideoGrid videos={videos} />

      <Pagination
        total={allVideos.length}
        pageSize={pageSize}
        currentPage={currentPage}
        basePath={basePath}
      />
    </main>
  );
}
