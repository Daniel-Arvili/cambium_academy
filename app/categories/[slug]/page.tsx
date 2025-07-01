import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import {
  fetchCategoryBySlug,
  fetchVideosByCategory,
} from '@/services/google_sheet';
import VideoGrid from '@/components/video-grid';
import { Pagination } from '@/components/pagination';
import Loading from '../loading';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const decodedName = decodeURIComponent(slug);
  const category = await fetchCategoryBySlug(decodedName);
  if (!category) notFound();

  const allVideos = await fetchVideosByCategory(slug);

  const pageSize = 6;
  const currentPage = parseInt(page || '1', 10);
  const start = (currentPage - 1) * pageSize;
  const videos = allVideos.slice(start, start + pageSize);

  const basePath = `/categories/${encodeURIComponent(category.name)}`;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">{category.name}</h1>
      </header>

      <Suspense fallback={<Loading />}>
        <VideoGrid videos={videos} />
        <Pagination
          total={allVideos.length}
          pageSize={pageSize}
          currentPage={currentPage}
          basePath={basePath}
        />
      </Suspense>
    </main>
  );
}
