'use client';

import { useRef,  RefObject } from 'react';
import { toPng } from 'html-to-image';

export function useComponentToImage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const uploadImage = async (
    ref: RefObject<HTMLDivElement>,
    imagePath: string,
    type: 'predictions' | 'resolutions',
    batchId: string
  ) => {
    if (!ref.current) {
      throw new Error('Component reference is not available');
    }

    try {
      const base64Image = await toPng(ref.current);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imagePath,
          base64Image,
          type,
          batchId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating/uploading image:', error);
      throw error;
    }
  };

  return { ref,  uploadImage };
}
