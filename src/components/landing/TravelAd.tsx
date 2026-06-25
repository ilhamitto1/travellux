import { useRef, useEffect, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { MEDIA } from '../../config/media';
import './TravelAd.css';

interface TravelAdProps {
  onReserve: () => void;
}

interface ElementHotspot {
  left: number;
  top: number;
  width: number;
  height: number;
}

function mapHotspotToCover(video: HTMLVideoElement): ElementHotspot {
  const { landingHotspot: HOTSPOT } = MEDIA;
  const vw = video.videoWidth;
  const vh = video.videoHeight;

  if (!vw || !vh) {
    return { ...HOTSPOT };
  }

  const rect = video.getBoundingClientRect();
  const rVideo = vw / vh;
  const rElement = rect.width / rect.height;

  let visX = 0;
  let visY = 0;
  let visW = 100;
  let visH = 100;

  if (rElement > rVideo) {
    visH = (rVideo / rElement) * 100;
    visY = (100 - visH) / 2;
  } else {
    visW = (rElement / rVideo) * 100;
    visX = (100 - visW) / 2;
  }

  return {
    left: ((HOTSPOT.left - visX) / visW) * 100,
    top: ((HOTSPOT.top - visY) / visH) * 100,
    width: (HOTSPOT.width / visW) * 100,
    height: (HOTSPOT.height / visH) * 100,
  };
}

export function TravelAd({ onReserve }: TravelAdProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hotspot, setHotspot] = useState<ElementHotspot | null>(null);
  const firedRef = useRef(false);

  const updateHotspot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setHotspot(mapHotspotToCover(video));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => updateHotspot();
    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('loadeddata', onReady);
    if (video.readyState >= 1) onReady();

    const ro = new ResizeObserver(onReady);
    ro.observe(video);
    window.addEventListener('resize', onReady);
    window.addEventListener('orientationchange', onReady);

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('loadeddata', onReady);
      ro.disconnect();
      window.removeEventListener('resize', onReady);
      window.removeEventListener('orientationchange', onReady);
    };
  }, [updateHotspot]);

  const handleReserve = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firedRef.current) return;
    firedRef.current = true;
    onReserve();
  };

  const hotspotStyle: CSSProperties | undefined = hotspot
    ? {
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }
    : undefined;

  return (
    <div className="travel-ad">
      <div className="video-stage">
        <video
          ref={videoRef}
          className="ad-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={MEDIA.landingVideo}
        />

        {hotspot && (
          <button
            type="button"
            className="ad-hotspot"
            style={hotspotStyle}
            onPointerUp={handleReserve}
            aria-label="Rezerv edin"
          />
        )}
      </div>
    </div>
  );
}
