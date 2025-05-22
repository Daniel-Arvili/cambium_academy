// app/search/page.tsx
import { searchVideos } from '@/services/google_sheet';
import VideoGrid from '@/components/video-grid';
import { Pagination } from '@/components/pagination';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  return {
    title: q
      ? `Search results for "${q}" - Cambium Academy`
      : 'Search - Cambium Academy',
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = '', page = '1' } = await searchParams;

  const query = q;
  const pageSize = 6;
  const currentPage = parseInt(page, 10);

  const allVideos = await searchVideos(query);
  const start = (currentPage - 1) * pageSize;
  const videos = allVideos.slice(start, start + pageSize);

  const basePath = `/search?q=${encodeURIComponent(query)}`;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          {query ? `Search Results for "${query}"` : 'Search Videos'}
        </h1>
        {query && (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Found {allVideos.length}{' '}
            {allVideos.length === 1 ? 'result' : 'results'}
          </p>
        )}
      </header>

      {query ? (
        <>
          <VideoGrid videos={videos} />
          <Pagination
            total={allVideos.length}
            pageSize={pageSize}
            currentPage={currentPage}
            basePath={basePath}
          />
        </>
      ) : (
        <div className="text-center text-gray-600">
          There are no relevant videos for your search.
        </div>
      )}
    </main>
  );
}
