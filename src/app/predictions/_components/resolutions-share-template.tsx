import { Card } from '@/components/ui/card';
import Image from 'next/image';
import resolutionsBg from '@/assets/images/resolutions-bg.svg';
import target from '@/assets/images/target.svg';

interface ResolutionsShareTemplateProps {
  resolutionItems: { resolution: string; reality: string }[];
}

export function ResolutionsShareTemplate({ resolutionItems }: ResolutionsShareTemplateProps) {
  const firstResolution = resolutionItems[0];
  const remainingCount = resolutionItems.length - 1;

  return (
    <Card className="p-12 rounded-2xl relative overflow-hidden w-[1200px] h-[600px] bg-white">
      <Image
        src={resolutionsBg}
        alt="Resolutions Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
      />

      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <div className="bg-purple-100 p-2 rounded-full">
          <Image src={target} alt="Target" width={36} height={36} />
        </div>
        <span className="text-2xl font-tfnr font-bold text-[#141414] tracking-tight">
          New Year Resolution
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
        {/* Resolution Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
          <div className="text-sm uppercase font-tfnr text-purple-600 mb-2 tracking-wider">
            Resolution
          </div>
          <div className="text-2xl font-tfnr font-bold text-[#141414] leading-tight">
            {firstResolution.resolution}
          </div>
        </div>

        {/* Reality Section */}
        <div className="bg-[#EFE5F6] rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="text-sm uppercase font-tfnr text-purple-700 mb-2 tracking-wider">
            Reality Check
          </div>
          <div className="text-2xl font-tfnr text-[#141414] italic leading-relaxed">
            {firstResolution.reality}
          </div>
        </div>

        {/* Footer */}
        {remainingCount > 0 && (
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-purple-200 to-transparent" />
            <div className="text-base text-gray-600 font-tfnr">
              + {remainingCount} more resolutions
            </div>
          </div>
        )}
      </div>

      {/* Decorative corner element */}
      <div className="absolute bottom-8 right-8 opacity-50">
        <Image src={target} alt="" width={64} height={64} className="opacity-20" />
      </div>
    </Card>
  );
}
