// components/video-grid.tsx
"use client"; // only if you use client‐side interactivity; remove if purely server

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { RowData } from "@/lib/data";

type VideoGridProps = { videos: RowData[] };
export default function VideoGrid({ videos }: VideoGridProps) {
  console.log(videos)
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No videos found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link href={`/videos/${video.id}`} key={video.id}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={video.image}
                alt={video.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{video.person_name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(video.date)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
