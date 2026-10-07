'use client';
import { useEffect, useRef } from 'react';

export default function GlobalClickSound() {
      const audioRef = useRef<HTMLAudioElement>(null);

      useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                  if (!(event.target instanceof Element)) return;
                  const control = event.target.closest('button, a, input[type="checkbox"], [role="button"]');
                  if (!control || control.matches(':disabled, [aria-disabled="true"]')) return;
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.currentTime = 0;
                  void audio.play().catch(() => {});
            };
            document.addEventListener('click', handleClick);
            
            return () => document.removeEventListener('click', handleClick);
      }, []);
      
      return <audio ref={audioRef} src="/audio/ginkgo-boing.mp3" preload="auto" />;
}