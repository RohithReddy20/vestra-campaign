'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import Image from 'next/image';

// Import the animation data
import crystalBallAnimation from '@/assets/jsons/crystal-ball-animation.json';
import { usePredictionProgress } from '@/hooks/use-prediction-progress';
import { Progress } from '@/components/ui/progress';

interface ProcessingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batchId: string | null;
}

export default function ProcessingModal({ open, onOpenChange, batchId }: ProcessingModalProps) {
  const { progressData } = usePredictionProgress(batchId);

  if (!progressData) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] border-none gradient-bg-color-black-2 text-white rounded-xl"
        style={{ maxWidth: 'min(90%, 425px)' }}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex flex-col items-center py-5">
          <h2 className="text-2xl font-bold mb-6 text-white font-tfnr">Twitter Predictions</h2>
          <div className="w-full h-px bg-[#333]"></div>
          <div className="flex items-center justify-between gap-2 px-2 py-2 bg-[#1A1A1A] rounded-3xl h-8 mt-8 border border-[#333]">
            <Image
              src={progressData.data.inputs.user_data.profile_image_url}
              alt="profile"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full bg-[#3b3b3b]"
            />
            <span className="text-base text-[#B8B8B8]">
              @{progressData.data.inputs.user_data.username}
            </span>
          </div>
          <div className="w-48 h-24">
            <Lottie
              animationData={crystalBallAnimation}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          {/* <p className="text-sm text-[#737373]">Scanning your tweets for hidden prophecies.</p> */}
          <div className="space-y-2 w-full mt-8">
            <Progress
              value={progressData.data.current_progress}
              className="[&>div]:bg-[#E52D27] h-[2px] w-[90%] mx-auto"
            />
            <h3 className="text-xl font-bold text-white mb-2 text-center font-tfnr">
              Peering into the crystal ball...
            </h3>
            <p className="text-center text-sm text-muted-foreground text-[#B8B8B8] font-alliance">
              {progressData.data.current_state}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
