import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Lightbulb, Microscope, PenTool, Rocket } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  count: number
  icon: string
}

const iconMap = {
  book: BookOpen,
  code: Code,
  lightbulb: Lightbulb,
  microscope: Microscope,
  pen: PenTool,
  rocket: Rocket,
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Lightbulb

        return (
          <Link href={`/categories/${category.slug}`} key={category.id}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
                  <IconComponent className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{category.count} videos</span>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
