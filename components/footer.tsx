import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#0a0043]">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#0a0043] dark:text-[#FFEBD8]">Cambium Academy</h3>
            <p className="text-sm text-muted-foreground">
              Your knowledge hub for educational content. Discover, search, and learn from our curated video library.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#0a0043] dark:text-[#FFEBD8]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground ">
          <p>&copy; {new Date().getFullYear()} Cambium Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
