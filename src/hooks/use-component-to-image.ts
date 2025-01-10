'use client';

import { useRef, useState, useCallback, RefObject, useEffect } from 'react';

export function useComponentToImage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toPngFunction, setToPngFunction] = useState<
    ((node: HTMLElement, options?: object) => Promise<string>) | null
  >(null);

  useEffect(() => {
    import('html-to-image').then(mod => {
      setToPngFunction(() => mod.toPng);
    });
  }, []);

  const uploadImage = useCallback(
    async (targetRef?: RefObject<HTMLDivElement>, filePrefix?: string) => {
      if (!toPngFunction) {
        throw new Error('html-to-image library not loaded yet');
      }

      const element = targetRef?.current ?? ref.current;
      if (!element) {
        throw new Error('Component reference is not set');
      }

      setIsUploading(true);

      try {
        const base64Image = await toPngFunction(element, {
          cacheBust: true,
          pixelRatio: 2,
          quality: 1,
          width: 1200,
          height: 600,
        });

        // Use provided prefix or default
        const tempFileName = `${filePrefix || 'share-image-' + Date.now()}.png`;

        // Upload through the Next.js API route
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            base64Image,
            imagePath: tempFileName,
          }),
        });

        const data = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(data.error || 'Failed to upload image');
        }

        return { success: true, data };
      } catch (err) {
        console.error('Error uploading image:', err);
        return { success: false, message: 'Failed to upload image.' };
      } finally {
        setIsUploading(false);
      }
    },
    [toPngFunction]
  );

  return { ref, isUploading, uploadImage };
}
