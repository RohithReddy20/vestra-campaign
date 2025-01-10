'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function withImageCopy<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function WithImageCopy(props: T) {
    const ref = useRef<HTMLDivElement>(null);
    const [isCopying, setIsCopying] = useState(false);
    const { toast } = useToast();

    const handleCopyImage = async () => {
      if (ref.current === null) {
        return;
      }

      setIsCopying(true);

      try {
        const dataUrl = await toPng(ref.current, { cacheBust: true });
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);

        toast({
          title: 'Success',
          description: 'Image copied to clipboard!',
        });
      } catch (err) {
        console.error('Error copying image to clipboard:', err);
        toast({
          title: 'Error',
          description: 'Failed to copy image to clipboard.',
          variant: 'destructive',
        });
      } finally {
        setIsCopying(false);
      }
    };

    return (
      <div className="space-y-4">
        <div ref={ref}>
          <WrappedComponent {...props} />
        </div>
        <Button onClick={handleCopyImage} disabled={isCopying}>
          {isCopying ? 'Copying...' : 'Copy to Clipboard'}
        </Button>
      </div>
    );
  };
}
