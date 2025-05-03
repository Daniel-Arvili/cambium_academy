// //import { fetchVideosBySearch } from "@/lib/data"
// import Link from "next/link"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Calendar, User } from "lucide-react"
// import { formatDate } from "@/lib/utils"
// export default async function SearchResults({ query }: { query: string }) {
//   const videos = await fetchVideosBySearch(query)

//   if (videos.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 dark:text-gray-400">No videos found for "{query}"</p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {videos.map((video) => (
//         <Link href={`/videos/${video.id}`} key={video.id}>
//           <Card className="h-full overflow-hidden hover:shadow-md transition-all">
//             <div className="aspect-video relative overflow-hidden">
//               <Image
//                 src={video.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
//                 alt={video.title}
//                 fill
//                 className="object-cover transition-transform hover:scale-105"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               />
//             </div>
//             <CardContent className="p-4">
//               <div className="mb-2">
//                 <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">
//                   {video.categoryName}
//                 </span>
//               </div>
//               <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
//               <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
//               <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
//                 <div className="flex items-center">
//                   <User className="h-3 w-3 mr-1" />
//                   <span>{video.presenter}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="h-3 w-3 mr-1" />
//                   <span>{formatDate(video.publishedAt)}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   )
// }
