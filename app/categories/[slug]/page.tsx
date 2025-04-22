import { Suspense } from "react"
import { notFound } from "next/navigation"
import { fetchCategoryBySlug } from "@/lib/data"
import VideoGrid from "@/components/video-grid"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await fetchCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found - Cambium Academy",
    }
  }

  return {
    title: `${category.name} - Cambium Academy`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await fetchCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
      </div>

      <Suspense fallback={<div>Loading videos...</div>}>
        <VideoGrid categorySlug={params.slug} />
      </Suspense>
    </main>
  )
}
