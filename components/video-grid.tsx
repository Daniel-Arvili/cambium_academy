"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { RowData } from "@/lib/data";

type VideoGridProps = { videos: RowData[] };
export default function VideoGrid({ videos }: VideoGridProps) {
  const validVideos = videos.filter(
    (video) => video.video_id && video.video_id.trim() !== ""
  );

  if (validVideos.length === 0) {
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
      {validVideos.map((video) => (
        <Link href={`/videos/${video.video_id}`} key={video.video_id}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition dark:bg-muted/40 border-[#0a0043]/10 dark:border-[#ffebd8]/10">
            {video.image ? (
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-sm text-gray-500 dark:text-gray-400">No Image</span>
              </div>
            )}

            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 text-[#0a0043] dark:text-[#ffebd8]">
                {video.title}
              </h3>
              <p className="text-sm text-[#0a0043]/70 mb-3 line-clamp-2 dark:text-[#ffebd8]/70">
                {video.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[#0a0043]/70 dark:text-[#ffebd8]/70">
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