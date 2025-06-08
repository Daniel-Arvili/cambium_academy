"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { RowData } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function RelatedVideos({ videos }: { videos: RowData[] }) {
  const filteredVideos = videos.filter(
    (video) => video.id && video.id.trim() !== ""
  );
  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">No related videos found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] w-[400px] rounded-md border">
      <div className="p-4 space-y-4">
        {filteredVideos.map((video) => (
          <Link
            href={`/videos/${video.id}`}
            key={video.id}
            className="flex gap-3 group"
          >
            <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {video.image && !video.image.includes('drive.google.com') ? (
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="96px"
                />
              ) : (
                <span className="text-xs text-[#0A0043]/70 dark:text-[#FFEBD8]/70 text-center">No Image Available</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-[#FD7F41] transition-colors">
                {video.title}
              </h4>
              <div className="flex items-center mt-1 text-xs">
                <span className="mr-2 line-clamp-1">{video.category}</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(video.date)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
