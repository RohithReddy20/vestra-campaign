'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useComponentToImage } from '@/hooks/use-component-to-image';
import { useToast } from '@/hooks/use-toast';
import { useRef, useCallback, useState, forwardRef } from 'react';
import { ShareURLBuilder } from '@/lib/share-utils';

import resolutionsBg from '@/assets/images/resolutions-bg.svg';
import target from '@/assets/images/target.svg';
import twitter from '@/assets/images/twitter.svg';
// import whatsapp from '@/assets/images/whatsapp.svg';
// import facebook from '@/assets/images/facebook.svg';
// import linkedin from '@/assets/images/linkedin.svg';
import { ResolutionsShareTemplate } from './resolutions-share-template';
import { PredictionProgress } from '@/types/types';
import { trackShare } from '@/utils/analytics';
// import ShinyButton from '@/components/ui/shiny-button';

export const Resolutions = forwardRef<HTMLDivElement, { predictionsData: PredictionProgress }>(
  ({ predictionsData }, ref) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Check if required data exists
    const canShare = Boolean(
      predictionsData.data.additional_data.resolutions?.media_url &&
        predictionsData.data.additional_data.resolutions?.campaign_id &&
        predictionsData.data.batch_id
    );

    const handleShare = useCallback(async () => {
      if (!canShare) {
        toast({
          title: 'Error',
          description: 'Required data for sharing is missing',
          variant: 'destructive',
        });
        return;
      }

      setLoading(true);
      const urlBuilder = new ShareURLBuilder(window.location.origin);
      try {
        const mediaUrl = predictionsData.data.additional_data.resolutions?.media_url;
        const campaignId = predictionsData.data.additional_data.resolutions?.campaign_id;

        if (!mediaUrl || !campaignId) {
          throw new Error('Required share data is missing');
        }

        const { twitterShareUrl } = urlBuilder.buildShareUrls(
          predictionsData.data.batch_id,
          campaignId,
          'resolutions'
        );

        // Track share event
        trackShare('resolutions', predictionsData.data.inputs.user_data.username);

        window.open(twitterShareUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.error('Share error:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to share image',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, [predictionsData, toast, canShare]);

    return (
      <Card className="p-6 md:p-10 rounded-2xl relative overflow-hidden">
        <Image
          src={resolutionsBg}
          alt="Resolutions Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 bg-[#D9C2E9]"
        />
        <div>
          <div className="relative z-10 h-10 flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <Image src={target} alt="Target" width={40} height={40} />
              <span className="text-[#141414]  font-tfnr text-base md:text-xl font-bold">
                Resolutions
              </span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                className="text-sm font-semibold border-none text-white bg-[#292929] hover:bg-[#1c1c1c] hover:text-white font-tfnr"
                onClick={handleShare}
                disabled={loading || !canShare}
              >
                <span className="h-6 w-6">
                  <Image src={twitter} height={24} width={24} alt="twitter" />
                </span>
                {loading ? 'Sharing...' : 'Share'}
              </Button>
              {/* <Button className="bg-transparent p-0 h-10 w-10 hover:bg-slate-200">
                <Image src={whatsapp} height={100} width={100} alt="whatsapp" />
              </Button>
              <Button className="bg-transparent p-0 h-10 w-10 hover:bg-slate-200">
                <Image src={facebook} height={100} width={100} alt="facebook" />
              </Button>
              <Button className="bg-transparent p-0 h-10 w-10 hover:bg-slate-200">
                <Image src={linkedin} height={100} width={100} alt="linkedin" />
              </Button> */}
            </div>
          </div>

          <div className="my-3 md:my-5 h-px bg-[#262626] z-10 relative"></div>

          <div className="resolution-list flex flex-col gap-5 md:gap-10 z-10">
            {predictionsData.data.outputs.resolutions.goals.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row w-full justify-between gap-3 md:gap-5 gap-y-5 pt-4 items-stretch z-10"
              >
                <div className="reality rounded-xl bg-[#efe5f680] p-3 md:p-5 flex flex-col justify-start items-start gap-2 md:gap-3 flex-1 w-full md:w-1/2">
                  <div className="font-tfnr text-lg md:text-xl font-bold text-[#141414] text-left">
                    Expectation
                  </div>
                  <div className="font-tfnr text-base md:text-lg text-left">{item.resolution}</div>
                </div>
                <div className="reality rounded-xl bg-[#EFE5F6] p-3 md:p-5 flex flex-col justify-start items-start gap-2 md:gap-3 flex-1 w-full md:w-1/2">
                  <div className="font-tfnr text-lg md:text-xl font-bold text-[#141414] text-left">
                    Reality
                  </div>
                  <div className="font-tfnr text-base md:text-lg text-left">{item.reality}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden share template */}
        <div className="fixed -z-50" style={{ left: '-9999px', top: '-9999px' }}>
          <div ref={ref}>
            <ResolutionsShareTemplate
              resolutionItems={predictionsData.data.outputs.resolutions.goals}
            />
          </div>
        </div>
      </Card>
    );
  }
);

Resolutions.displayName = 'Resolutions';
