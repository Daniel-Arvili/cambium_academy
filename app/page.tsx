import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategoryGrid from "@/components/category-grid"
import FeaturedVideos from "@/components/featured-videos"
import SearchResults from "@/components/search-results"
import { fetchCategories, fetchFeaturedVideos } from "@/lib/data"

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const searchQuery = searchParams.q || ""
  const categories = await fetchCategories()
  const featuredVideos = await fetchFeaturedVideos()

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cambium Academy</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Your knowledge hub for educational content. Discover, search, and learn from our curated video library.
          </p>
          <form action="/search" className="flex w-full max-w-lg gap-2">
            <Input
              name="q"
              placeholder="Search for educational content..."
              className="bg-white/20 text-white placeholder:text-white/70 border-white/30 focus-visible:ring-white"
              defaultValue={searchQuery}
            />
            <Button type="submit" variant="secondary" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {searchQuery ? (
          <Suspense fallback={<div>Searching...</div>}>
            <SearchResults query={searchQuery} />
          </Suspense>
        ) : (
          <>
            {/* Categories Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Browse by Category</h2>
                <Link
                  href="/categories"
                  className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  View all
                </Link>
              </div>
              <CategoryGrid categories={categories} />
            </section>

            {/* Featured Videos Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Content</h2>
                <Link
                  href="/videos"
                  className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  View all
                </Link>
              </div>
              <FeaturedVideos videos={featuredVideos} />
            </section>
          </>
        )}
      </div>
    </main>
  )
}
