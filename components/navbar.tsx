"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Category } from "@/lib/data"

export default function Navbar({categories}: {categories: Category[]}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <header className="border-b bg-[#FFEBD8] dark:bg-[#0a0043] sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 mx-4">
            <Link href="/" className="flex items-center">
              <Image  src="/cambiumlogo.png" alt="Cambium Academy" width={128} height={128} />
            </Link>
            {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 bg-[#FFEBD8] dark:bg-[#0a0043]">
            <NavigationMenu >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#0a0043]">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-row gap-4 p-4 min-w-[600px]">
                    {categories.map((category) => (
                      <NavigationMenuLink key={category.id} href={`/categories/${category.slug}`}>{category.name}</NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu> 
          </nav>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="mr-1">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4 px-4">
              <Link
                key={"categories"}
                href={"/categories"}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-teal-600",
                    pathname === "/categories" ? "text-teal-600" : "text-foreground/80",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
            </nav>
          </div>
        )}
    </header>
  )
}
