'use client';

import { useEffect, useRef } from 'react';

export default function Iframe({ src , cssFiles }: {src: string, cssFiles: string[]}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef) return;
    const iframe = iframeRef.current;

    const injectCSS = () => {
      if (!iframe) return;
      const iframeDoc = iframe.contentDocument || (iframe.contentWindow ? iframe.contentWindow.document : null);

      if (!iframeDoc) return;

      cssFiles.forEach((href) => {
        const link = iframeDoc.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        iframeDoc.head.appendChild(link);
      });
    };

    iframe?.addEventListener('load', injectCSS);

    return () => {
      iframe?.removeEventListener('load', injectCSS);
    };
  }, [cssFiles, src]);

  return (
    <div>
    <iframe
      ref={iframeRef}
      src={src}
      className='h-screen overflow-y-auto w-[calc(100vw-320px)] overflow-x-hidden'
      />
    </div>
  );
}
