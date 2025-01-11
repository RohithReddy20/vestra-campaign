'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRef, useCallback } from 'react';
import { useComponentToImage } from '@/hooks/use-component-to-image';
import { useToast } from '@/hooks/use-toast';
import { ShareURLBuilder } from '@/lib/share-utils';

import twitter from '@/assets/images/twitter.svg';
import crystallBall from '@/assets/images/crystal-ball.svg';
import uselessPredictionsBg from '@/assets/images/useless-predictions-bg.svg';
import { PredictionProgress } from '@/types/types';
import { UselessPredictionsShareTemplate } from './useless-predictions-share-template';

export function UselessPredictions({ predictionsData }: { predictionsData: PredictionProgress }) {
  const shareRef = useRef<HTMLDivElement>(null);
  const { isUploading, uploadImage } = useComponentToImage();
  const { toast } = useToast();

  const handleShare = useCallback(async () => {
    const urlBuilder = new ShareURLBuilder(window.location.origin);
    try {
      const imagePrefix = 'useless-predictions';
      const result = await uploadImage(shareRef, `${imagePrefix}-${predictionsData.data.batch_id}`);

      if (!result.success) {
        throw new Error(result.message);
      }

      const campaignId = result.data.data[0].uid;

      // Add a delay to ensure image processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { twitterShareUrl } = urlBuilder.buildShareUrls(
        predictionsData.data.batch_id,
        campaignId,
        'predictions'
      );

      toast({
        title: 'Ready to share!',
        description: 'Opening Twitter...',
        variant: 'default',
      });

      // Open in a new tab instead of popup
      window.open(twitterShareUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to share image',
        variant: 'destructive',
      });
    }
  }, [predictionsData.data.batch_id, shareRef, toast, uploadImage]);

  return (
    <Card className="p-6 md:p-10 rounded-2xl relative overflow-hidden border-none">
      <Image
        src={uselessPredictionsBg}
        alt="Resolutions Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 h-10 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <Image src={crystallBall} alt="Target" width={40} height={40} />
          <span className="text-[#141414]  font-tfnr text-base md:text-xl font-bold">
            Useless Predictions
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            className="text-sm font-medium border-none text-white bg-[#292929] hover:bg-[#1c1c1c] hover:text-white font-tfnr"
            onClick={handleShare}
            disabled={isUploading}
          >
            <span className="h-6 w-6">
              <Image src={twitter} height={24} width={24} alt="twitter" />
            </span>
            {isUploading ? 'Sharing...' : 'Share'}
          </Button>
        </div>
      </div>
      <div className="my-5 h-px bg-[#262626] z-10 relative"></div>
      <div className="resolution-list flex flex-col gap-6 z-10">
        {predictionsData.data.outputs.predictions.predictions.map((prediction, index) => (
          <div
            key={index}
            className="z-10 font-tfnr text-base text-left font-medium text-[#141414]"
          >
            {prediction.prediction}
          </div>
        ))}
      </div>
      <div className="fixed -z-50" style={{ left: '-9999px', top: '-9999px' }}>
        <div ref={shareRef}>
          <UselessPredictionsShareTemplate
            predictions={predictionsData.data.outputs.predictions.predictions}
          />
        </div>
      </div>
    </Card>
  );
}
