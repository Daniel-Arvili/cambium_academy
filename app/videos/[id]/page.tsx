import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import { fetchVideoById, fetchRelatedVideos } from "@/lib/data"
import VideoPlayer from "@/components/video-player"
import RelatedVideos from "@/components/related-videos"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const video = await fetchVideoById(params.id)

  if (!video) {
    return {
      title: "Video Not Found - Cambium Academy",
    }
  }

  return {
    title: `${video.title} - Cambium Academy`,
    description: video.description,
  }
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await fetchVideoById(params.id)

  if (!video) {
    notFound()
  }

  const relatedVideos = await fetchRelatedVideos(video.categoryId, video.id)

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer videoId={video.videoUrl} />

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Link
                href={`/categories/${video.categorySlug}`}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full"
              >
                {video.categoryName}
              </Link>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(video.publishedAt)}</span>
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{video.presenter}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p>{video.description}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Related Videos</h2>
          <RelatedVideos videos={relatedVideos} />
        </div>
      </div>
    </main>
  )
}
