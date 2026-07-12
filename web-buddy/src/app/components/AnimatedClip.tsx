"use client";

import { useEffect, useRef } from "react";

interface AnimatedClipProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/**
 * Renders a looping screen-recording clip as compressed video instead of an
 * animated image. Playback starts only once the clip scrolls into view and
 * pauses again when it leaves, and is skipped entirely under
 * prefers-reduced-motion (the poster frame is shown instead).
 */
export default function AnimatedClip({
  src,
  poster,
  label,
  className,
}: AnimatedClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
