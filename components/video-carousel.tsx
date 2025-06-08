"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import type { RowData } from "@/lib/data";

type VideoCarouselProps = { videos: RowData[] };

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const filteredVideos = videos.filter(
    (video) => video.id && video.id.trim() !== ""
  );
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      nextRef.current?.click();
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4 flex gap-4">
          {filteredVideos.map((video) => (
            <CarouselItem
              key={video.id}
              className="pl-4 basis-1/4 group"
            >
              <Link
                href={`/videos/${video.id}`} key={video.id}
                className="block text-left"
              >
                <div className="overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40 transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="align-middle mt-2 text-sm text-center font-semibold text-[#0a0043] dark:text-[#ffebd8] group-hover:text-[#FD7F41] transition-colors duration-300">
                  {video.title}
                </h3>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 transition-colors">
          <span className="sr-only">Previous</span>
        </CarouselPrevious>
        <CarouselNext ref={nextRef} className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 transition-colors">
          <span className="sr-only">Next</span>
        </CarouselNext>
      </Carousel>
    </div>
  );
}
