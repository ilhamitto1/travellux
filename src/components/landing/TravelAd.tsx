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

function setupIOSVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.controls = false;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
  video.setAttribute('x5-playsinline', 'true');
  video.setAttribute('x5-video-player-type', 'h5');
  video.setAttribute('disablepictureinpicture', '');
  video.removeAttribute('controls');
}

async function forcePlay(video: HTMLVideoElement): Promise<boolean> {
  setupIOSVideo(video);
  try {
    await video.play();
    return !video.paused;
  } catch {
    return false;
  }
}

export function TravelAd({ onReserve }: TravelAdProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef(false);
  const [hotspot, setHotspot] = useState<ElementHotspot>({ ...MEDIA.landingHotspot });
  const [videoReady, setVideoReady] = useState(false);

  const updateHotspot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setHotspot(mapHotspotToCover(video));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setupIOSVideo(video);

    const tryPlay = () => { forcePlay(video); };

    const onReady = () => {
      updateHotspot();
      setVideoReady(true);
      tryPlay();
    };

    tryPlay();

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('canplaythrough', tryPlay);

    const ro = new ResizeObserver(updateHotspot);
    ro.observe(video);

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    const onPageShow = () => tryPlay();

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('resize', updateHotspot);
    window.addEventListener('orientationchange', updateHotspot);

    // iOS: ilk toxunuşda videonu unlock et (autoplay bloklanıbsa)
    const unlock = () => { forcePlay(video); };
    document.addEventListener('touchstart', unlock, { once: true, passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('canplaythrough', tryPlay);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('resize', updateHotspot);
      window.removeEventListener('orientationchange', updateHotspot);
    };
  }, [updateHotspot]);

  const handleReserve = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    if (video?.paused) {
      await forcePlay(video);
    }

    if (firedRef.current) return;
    firedRef.current = true;
    onReserve();
  }, [onReserve]);

  const hotspotStyle: CSSProperties = {
    left: `${hotspot.left}%`,
    top: `${hotspot.top}%`,
    width: `${hotspot.width}%`,
    height: `${hotspot.height}%`,
  };

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
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          src={MEDIA.landingVideo}
        />

        <button
          type="button"
          className="ad-hotspot"
          style={hotspotStyle}
          onClick={handleReserve}
          aria-label="Rezerv edin"
        />

        {!videoReady && (
          <div className="ad-video-loader" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
