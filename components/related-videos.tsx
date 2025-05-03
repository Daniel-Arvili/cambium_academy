"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { RowData } from '@/lib/data';

/**
 * Displays a list of related videos using the raw RowData shape.
 */
export default function RelatedVideos({ videos }: { videos: RowData[] }) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">No related videos found</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Link
          href={`/videos/${video.id}`}
          key={video.id}
          className="flex gap-3 group"
        >
          <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={video.image}
              alt={video.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="96px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-teal-600 transition-colors">
              {video.title}
            </h4>
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2 line-clamp-1">{video.category}</span>
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(video.date)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
