"use client"

import { useRef, useEffect, useState } from "react"
import { Play } from "lucide-react"  // you can still import these if you want a “click to play” overlay
import { cn } from "@/lib/utils"

export default function VideoPlayer({
  videoId,
}: {
  videoId: string
}) {
  const [showPlayOverlay, setShowPlayOverlay] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // optional: remove overlay once iframe has loaded
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const onLoad = () => setShowPlayOverlay(false)
    iframe.addEventListener("load", onLoad)
    return () => void iframe.removeEventListener("load", onLoad)
  }, [])

  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`

  return (
    <div
      className="relative aspect-video bg-black rounded-lg overflow-hidden"
      onClick={() => {
        // if you want clicking the overlay to start playback, you could postMessage here,
        // or simply hide the overlay so the user can click the native play button.
        setShowPlayOverlay(false)
      }}
    >
      <iframe
        ref={iframeRef}
        src={embedUrl}
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full border-0"
      />

      {showPlayOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setShowPlayOverlay(false)}
        >
          <div className="bg-black/50 rounded-full p-4">
            <Play className="h-10 w-10 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}
