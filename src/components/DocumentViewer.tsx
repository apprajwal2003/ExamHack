// src/components/DocumentViewer.tsx

"use client";

import { useEffect, useRef, useState } from "react";

export function DocumentViewer({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  const viewerRef = useRef<HTMLIFrameElement>(null);
  const [lastScroll, setLastScroll] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${fileName}`);
    if (saved) setLastScroll(Number(saved));
  }, [fileName]);

  const handleScrollSave = () => {
    if (viewerRef.current?.contentWindow) {
      const scrollY = viewerRef.current.contentWindow.scrollY;
      localStorage.setItem(`progress-${fileName}`, scrollY.toString());
    }
  };

  return (
    <iframe
      ref={viewerRef}
      src={`https://docs.google.com/gview?url=${window.location.origin}${fileUrl}&embedded=true`}
      onLoad={() => {
        if (viewerRef.current && lastScroll) {
          viewerRef.current.contentWindow?.scrollTo(0, lastScroll);
        }
      }}
      onScroll={handleScrollSave}
      className="w-full h-[90vh] rounded-xl border"
    />
  );
}
