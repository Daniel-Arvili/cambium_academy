import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Code,
  Lightbulb,
  Microscope,
  PenTool,
  Rocket,
  Users,
  Cpu,
  CheckCircle,
  MoreHorizontal,
  Aperture,
  Smartphone,
} from "lucide-react"

export type Category = {
  id: string
  name: string
  slug: string
  count: number
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "cambium-processes": Rocket,
  "git-sessions": Code,
  "personal-projects-&-others": BookOpen,
  "personal-projects-others": BookOpen,
  "dev-sessions": Microscope,
  "mobile-applications": Smartphone,
  "management-and-customer-services": Users,
  "devops-&-aws": PenTool,
  "devops-aws": PenTool,
  "react": Code,
  "node-js": Code,
  "meetups": Users,
  "ai": Cpu,
  "qa": CheckCircle,
  "other": MoreHorizontal,
  "dot-net": Code,
  ".net": Code,
  "flutter": Aperture,
  "angular": Aperture,
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const key = category.slug.toLowerCase()
        const IconComponent = iconMap[key] || Lightbulb
        return (
          <Link href={`/categories/${category.slug}`} key={category.id}>
            <Card className="h-full transition-all hover:shadow-md border-[#0a0043]/20 dark:border-[#ffebd8]/20  dark:bg-muted/40">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-[#0a0043]/10 dark:bg-[#ffebd8]/10 p-3 rounded-full mb-4">
                  <IconComponent className="h-6 w-6 text-[#0a0043] dark:text-[#ffebd8]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#0a0043] dark:text-[#ffebd8]">
                  {category.name}
                </h3>
                <span className="text-xs bg-[#0a0043]/10 dark:bg-[#ffebd8]/10 text-[#0a0043] dark:text-[#ffebd8] px-2 py-1 rounded-full">
                  {category.count} videos
                </span>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}