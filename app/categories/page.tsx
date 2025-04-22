import { Suspense } from "react"
import { fetchCategories } from "@/lib/data"
import CategoryGrid from "@/components/category-grid"

export const metadata = {
  title: "Categories - Cambium Academy",
  description: "Browse all educational content categories",
}

export default async function CategoriesPage() {
  const categories = await fetchCategories()

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryGrid categories={categories} />
      </Suspense>
    </main>
  )
}
