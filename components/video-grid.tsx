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
      <div className="text-center py-8">
        <p className="text-[#0A0043]/70 dark:text-[#FFEBD8]/70">
          No videos found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {validVideos.map((video) => (
        <Link href={`/videos/${video.video_id}`} key={video.video_id}>
          <Card
            className="p-0 flex flex-col h-full overflow-hidden 
              border-2 border-[#0A0043] dark:border-[#FFEBD8] 
              rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1
              bg-white dark:bg-[#0A0043]"
          >
            {video.image ? (
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  
                  className={
                    "object-cover transition-transform duration-300 ease-in-out hover:scale-105 " +
                    "rounded-t-lg"
                  }
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-[#FFEBD8]/30 dark:bg-[#0A0043]/30 rounded-t-lg">
                <span className="text-[#0A0043]/70 dark:text-[#FFEBD8]/70 text-sm">
                  No Image Available
                </span>
              </div>
            )}

            <CardContent className="p-4 flex flex-col flex-1">
              <div className="flex-grow">
                <h3 className="text-base font-bold text-[#0A0043] dark:text-[#FFEBD8] line-clamp-2">
                  {video.title}
                </h3>

                <p className="mt-2 text-sm text-[#0A0043]/80 dark:text-[#FFEBD8]/80 line-clamp-2">
                  {video.description || ""}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#0A0043]/70 dark:text-[#FFEBD8]/70">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{video.person_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
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
