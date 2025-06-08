import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Calendar, User, FileText, Hash, Video } from "lucide-react";
import {
  fetchVideoById,
  fetchRelatedVideos,
  slugify,
} from "@/services/google_sheet";
import VideoPlayer from "@/components/video-player";
import RelatedVideos from "@/components/related-videos";
import { formatDate } from "@/lib/utils";
import Loading from '../loading';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) {
    return { title: "Video Not Found - Cambium Academy" };
  }
  return {
    title: `${video.title} - Cambium Academy`,
    description: video.description,
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) notFound();

  const categorySlug = slugify(video.category.trim());
  const relatedVideos = await fetchRelatedVideos(categorySlug, video.id);

  return (
    <main className="container mx-auto max-w-6xl px-0 py-8">
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {video.video_id ? (
              <VideoPlayer videoId={video.video_id} />
            ) : (
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-8 text-center">
                <Video className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Video Not Available</h2>
                <p className="text-gray-500 dark:text-gray-400">This content is currently not available in video format.</p>
              </div>
            )}

            <div>
              <h1 className="text-3xl font-extrabold mb-2">{video.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-[#0a0043] dark:text-[#ffebd8] mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(video.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{video.person_name}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{video.description}</p>
              </div>

              {video.hashtags && (
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <Hash className="h-5 w-5 text-indigo-500 dark:text-[#ff6900]" />
                  {video.hashtags.split(' ').map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-[#ff6900] text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(video.slide_url_1 || video.slide_url_2) && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span>Slides</span>
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {video.slide_url_1 && (
                      <a
                        href={video.slide_url_1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-lg hover:underline"
                      >
                        Slide 1
                      </a>
                    )}
                    {video.slide_url_2 && (
                      <a
                        href={video.slide_url_2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-lg hover:underline"
                      >
                        Slide 2
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </Suspense>
    </main>
  );
}