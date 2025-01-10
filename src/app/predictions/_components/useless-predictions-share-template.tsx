import Image from 'next/image';
import uselessPredictionsBg from '@/assets/images/useless-predictions-bg.svg';
import crystallBall from '@/assets/images/crystal-ball.svg';

interface UselessPredictionsShareTemplateProps {
  predictions: { prediction: string }[];
}

export function UselessPredictionsShareTemplate({
  predictions,
}: UselessPredictionsShareTemplateProps) {
  const firstPrediction = predictions[0];
  const remainingCount = predictions.length - 1;

  return (
    <div className="w-[1200px] h-[600px] bg-white relative p-16 overflow-hidden mx-auto flex flex-col justify-center">
      <Image
        src={uselessPredictionsBg}
        alt="Predictions Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <div className="bg-purple-100 p-2 rounded-full">
          <Image src={crystallBall} alt="Crystal Ball" width={36} height={36} />
        </div>
        <span className="text-2xl font-tfnr font-bold text-[#141414] tracking-tight">
          Useless Predictions
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="bg-[#EFE5F6] rounded-2xl p-8 shadow-lg border border-purple-100">
          <div className="text-3xl font-alliance font-bold text-[#141414] leading-relaxed">
            &quot;{firstPrediction.prediction}&quot;
          </div>
        </div>

        {/* Footer */}
        {remainingCount > 0 && (
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-purple-200 to-transparent" />
            <div className="text-base text-gray-600 font-tfnr">
              + {remainingCount} more predictions
            </div>
          </div>
        )}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-8 right-8 opacity-50">
        <Image src={crystallBall} alt="" width={64} height={64} className="opacity-20" />
      </div>
    </div>
  );
}
