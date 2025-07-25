"use client"
import { useState, useMemo } from "react";
import Link from 'next/link'
import { Search, Link as LinkIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryGrid from "@/components/category-grid";
import { Category } from "@/lib/data";
import { RowData } from "@/lib/data";
import { VideoCarousel } from "@/components/video-carousel";

type MainPageProps = {
  data: RowData[];
  categories: Category[];
  featuredVideos: RowData[];
};

type Suggestions = {
  words: string[];
  persons: string[];
};

export default function MainPage({ data, categories, featuredVideos }: MainPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const suggestions = useMemo<Suggestions>(() => {
    if (!searchQuery) return { words: [], persons: [] };
    const lowerQuery = searchQuery.toLowerCase();
    const wordsSet = new Set<string>();
    const personSet = new Set<string>();

    data.forEach(video => {
      video.title.split(/\W+/).forEach(word => {
        if (word) wordsSet.add(word);
      });
      if (video.category) wordsSet.add(video.category);
      video.hashtags.split(/\s*,\s*/).forEach(tag => {
        if (tag) wordsSet.add(tag);
      });
      if (video.person_name) {
        personSet.add(video.person_name);
      }
    });

    const wordSuggestions = Array.from(wordsSet)
      .filter(word => word.toLowerCase().startsWith(lowerQuery))
      .slice(0, 3);

    const personSuggestions = Array.from(personSet)
      .filter(name => name.toLowerCase().startsWith(lowerQuery))
      .slice(0, 2);

    return {
      words: wordSuggestions,
      persons: personSuggestions
    };
  }, [searchQuery, data]);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-white/10 backdrop-blur-lg border-b border-white/20 py-22 px-4 w-full h-fit">
        <div className="absolute inset-0 z-0">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1318 482"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            
          >
            <rect
              x="0.556641"
              width="1316.89"
              height="481.22"
              className="fill-[#0A0043] dark:fill-[#FFEBD8]"
            />
            <path
              d="M-36.6111 116.135H229.007C298.521 116.135 354.899 62.6132 354.899 -3.3803C354.899 -69.3738 298.55 -122.896 229.007 -122.896H64.1665"
              stroke="#FD7F41"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M356.831 528.153C356.831 483.861 339.237 441.383 307.918 410.064C276.599 378.745 234.121 361.151 189.829 361.151C145.538 361.151 103.06 378.745 71.741 410.064C40.422 441.383 22.8272 483.861 22.8271 528.153L63.3079 528.153C63.3079 494.597 76.6378 462.416 100.365 438.689C124.093 414.961 156.274 401.631 189.829 401.631C223.385 401.631 255.566 414.961 279.293 438.689C303.021 462.416 316.351 494.597 316.351 528.153H356.831Z"
              fill="#7FD8BD"
            />
            <path
              d="M1144.56 166.355C1187.98 157.627 1226.16 132.006 1250.69 95.1294C1275.23 58.2528 1284.11 13.1408 1275.38 -30.2824C1266.65 -73.7056 1241.03 -111.883 1204.15 -136.416C1167.28 -160.949 1122.16 -169.828 1078.74 -161.1L1087.76 -116.234C1119.28 -122.571 1152.03 -116.125 1178.81 -98.3144C1205.58 -80.504 1224.18 -52.7883 1230.51 -21.2642C1236.85 10.2598 1230.4 43.0099 1212.59 69.7813C1194.78 96.5527 1167.07 115.153 1135.54 121.489L1144.56 166.355Z"
              fill="#FFEBD8"
            />
            <path
              d="M873.325 409.753H1435.85"
              stroke="#7FD8BD"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M692.08 409.7H936.711"
              stroke="#FD7F41"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M933.211 409.44H936.71"
              stroke="#FFEBD8"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M1146.36 409.753H1390.97"
              stroke="#FD7F41"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M1317.86 517.19H1443.52C1476.41 517.19 1503.08 493.133 1503.08 463.471C1503.08 433.809 1476.42 409.753 1443.52 409.753H1365.54"
              stroke="#FD7F41"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M816.719 409.7L646.779 409.7C602.304 409.7 566.234 441.394 566.234 480.473C566.234 519.552 602.285 551.245 646.779 551.245L752.242 551.245"
              stroke="#FD7F41"
              strokeWidth="46"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <circle
              cx="1139.58"
              cy="143.899"
              r="23"
              fill="#FFEBD8"
            />
          </svg>
        </div>
        <div className="mx-auto flex flex-col justify-center items-center max-w-6xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFEBD8] dark:text-[#0A0043]">
            Cambium Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl text-[#FFEBD8] dark:text-[#0A0043]">
            Your knowledge hub for educational content. Discover, search, and learn from our curated video library.
          </p>

          <form action="/search" className="w-full max-w-3xl">
            <div className="relative">
              <div className="flex w-full gap-2">
                <Input
                  name="q"
                  placeholder="Search"
                  className="bg-[#FFEBD8] dark:bg-[#0A0043] focus-visible:ring-[#FFEBD8] dark:focus-visible:ring-[#0A0043]"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="secondary" size="icon" className="bg-[#FFEBD8] dark:bg-[#0A0043] text-[#0A0043] dark:text-[#FFEBD8]" >
                  <Search className="h-5 w-5 text-[#0A0043] dark:text-[#FFEBD8]" />
                </Button>
              </div>

              {suggestions.words.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-1/2 bg-[#FFEBD8] dark:bg-[#0A0043] rounded-lg shadow-lg z-10">
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="text-sm font-medium text-[#0A0043] dark:text-[#FFEBD8]">Suggestions</span>
                    <LinkIcon className="h-4 w-4 text-[#0A0043] dark:text-[#FFEBD8]" />
                  </div>
                  <div className="flex flex-wrap gap-2 p-2">
                    {suggestions.persons.map(name => (
                      <Link
                        key={`person-${name}`}
                        href={`/search?q=${encodeURIComponent(name)}`}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-[#0A0043] dark:text-[#FFEBD8] rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                      >
                        <User className="h-3 w-3" />
                        {name}
                      </Link>
                    ))}
                    {suggestions.words.map(s => (
                      <Link
                        key={s}
                        href={`/search?q=${encodeURIComponent(s)}`}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-[#0A0043] dark:text-[#FFEBD8] rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0A0043] dark:text-[#FFEBD8]">Browse by Category</h2>
            <Link href="/categories" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                  View all
            </Link>
          </div>
          <CategoryGrid categories={categories} limit={12} />
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0A0043] dark:text-[#FFEBD8]">Newest Videos</h2>
          </div>
          <VideoCarousel videos={featuredVideos} />
        </section>
      </div>
    </main>
  );
}