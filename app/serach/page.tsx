import { Suspense } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchResults from "@/components/search-results"

export function generateMetadata({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ""
  return {
    title: query ? `Search results for "${query}" - Cambium Academy` : "Search - Cambium Academy",
  }
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ""

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <form className="flex w-full max-w-lg gap-2">
          <Input name="q" placeholder="Search for educational content..." className="flex-1" defaultValue={query} />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {query ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Search results for: <span className="text-teal-600">"{query}"</span>
          </h2>
          <Suspense fallback={<div>Searching...</div>}>
            <SearchResults query={query} />
          </Suspense>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Enter a search term to find educational content</p>
        </div>
      )}
    </main>
  )
}
