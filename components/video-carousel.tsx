// components/video-carousel.tsx
"use client";

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
  return (
    <div className="relative">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4 flex gap-4">
          {videos.map((video) => (
            <CarouselItem
              key={video.id}
              //className="pl-4 basis-1/3" /* 33% width per slide */
              className="pl-4 basis-1/4"
            >
              <button
                onClick={() => {
                  // TODO: open modal with `video` data
                  console.log("open modal for", video.id);
                }}
                className="block text-left"
              >
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />
                </div>
                <h3 className="align-middle mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {video.title}
                </h3>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 " />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
