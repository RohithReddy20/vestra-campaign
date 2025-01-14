import { useState, useEffect } from 'react';
import { PredictionProgress } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function usePredictionProgress(batchId: string | null) {
  const [progressData, setProgressData] = useState<PredictionProgress | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchProgress = async () => {
      if (!batchId || !mounted) return;

      try {
        const response = await fetch(`/api/progress/${batchId}`, {
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }

        const data: PredictionProgress = await response.json();
        if (!mounted) return;

        setProgressData(data);

        if (data.data.current_progress === 100) {
          setIsComplete(true);
          router.push(`/predictions?batchId=${batchId}`);
          return true;
        }

        if (data.data.error) {
          toast({
            title: 'Error',
            description:
              typeof data.data.error === 'string'
                ? data.data.error
                : 'An error occurred during processing',
            variant: 'destructive',
          });
          return true;
        }

        return false;
      } catch (error) {
        if (!mounted) return true;

        console.error('Error fetching progress:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch progress',
          variant: 'destructive',
        });
        return true;
      }
    };

    const poll = async () => {
      if (await fetchProgress()) return;
      setTimeout(poll, 1000);
    };

    if (batchId && !isComplete) {
      poll();
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [batchId, toast, router, isComplete]);

  return { progressData, isComplete };
}
