"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type LoomEmbedProps = {
  src: string;
};

export default function LoomEmbed({ src }: LoomEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="loom-container relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="animate-spin text-white w-10 h-10" />
        </div>
      )}
      <iframe
        src={src}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        className={`loom-iframe w-full h-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
