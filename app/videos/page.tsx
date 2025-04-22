import { Suspense } from "react"
import { fetchVideos } from "@/lib/data"
import FeaturedVideos from "@/components/featured-videos"

export const metadata = {
  title: "All Videos - Cambium Academy",
  description: "Browse all educational videos in our library",
}

export default async function VideosPage() {
  const videos = await fetchVideos()

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Videos</h1>
      <Suspense fallback={<div>Loading videos...</div>}>
        <FeaturedVideos videos={videos} />
      </Suspense>
    </main>
  )
}
