'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import ProcessingModal from '@/components/processing-modal';

import home from '@/assets/images/home.svg';
import vestra from '@/assets/images/vestra.svg';
import twitter from '@/assets/images/twitter.svg';
import { Resolutions } from './resolutions';
import { UselessPredictions } from './useless-predictions';
import { PredictionProgress } from '@/types/types';
import { AboutInfo } from '@/components/about-info';

export default function Predictions() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get('batchId');
  const { toast } = useToast();
  const router = useRouter();
  const [predictionsData, setPredictionsData] = useState<PredictionProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolutionsUsername, setResolutionsUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [predictBatchId, setPredictBatchId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(`/api/progress/${batchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch predictions');
        }
        const data = await response.json();
        setPredictionsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (batchId) {
      fetchPredictions();
    } else {
      router.push('/');
    }
    setShowModal(false);
    setResolutionsUsername('');
  }, [batchId, router]);

  const handlePredict = async (username: string) => {
    if (!username) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      if (data.success) {
        setPredictBatchId(data.data.batch_id);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to start prediction. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePredict(resolutionsUsername);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white flex items-center justify-center">
        <p>Loading predictions...</p>
      </div>
    );
  }

  if (error || !predictionsData) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white flex items-center justify-center">
        <p>{error || 'No predictions found'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0C0C0C] text-white">
        <header className="flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex-grow basis-0 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image src={home} height={32} width={32} alt="home" />
              <span className="text-sm sm:text-base font-tfnr font-medium">Home</span>
            </div>
          </Link>
          <div className="hidden items-center justify-center sm:flex flex-grow">
            <Image src={vestra} alt="Vestra" width={40} height={40} />
            <p className="font-fauna text-2xl sm:text-[28px] gradient-text font-thin">VESTRA</p>
          </div>
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-24 sm:w-auto justify-center sm:justify-end flex-grow basis-0">
            <Link href="https://vestra.ai" target="_blank" className="sm:w-full">
              <Button
                variant="outline"
                className="text-xs sm:text-sm font-medium bg-transparent text-black bg-white hover:bg-zinc-100 font-tfnr sm:w-full p-3"
              >
                <span className="hidden sm:block">Visit Vestra</span>
                <span className="h-5 w-5 sm:h-6 sm:w-6 sm:hidden">
                  <Image src={vestra} height={20} width={20} alt="twitter" />
                </span>
              </Button>
            </Link>
            <Link href="https://x.com/vestra_ai" target="_blank" className="sm:w-full">
              <Button
                variant="outline"
                className="text-xs sm:text-sm font-medium border-none text-white bg-[#292929] hover:bg-[#1c1c1c] hover:text-white font-tfnr sm:w-full p-3"
              >
                <span className="hidden sm:block"> Follow us on</span>
                <span className="h-5 w-5 sm:h-6 sm:w-6">
                  <Image src={twitter} height={20} width={20} alt="twitter" />
                </span>
              </Button>
            </Link>
          </div>
        </header>
        <div className="mx-auto px-4 pt-8 sm:py-16 text-center block sm:hidden">
          <div className="flex items-center justify-center sm:hidden">
            <Image src={vestra} alt="Vestra" width={40} height={40} />
            <p className="font-fauna text-2xl sm:text-[28px] gradient-text font-thin">VESTRA</p>
          </div>
          <p className="text-white font-tfnr text-base md:text-xl leading-[32px] md:leading-[46px] text-center px-4">
            AI that&apos;s easy to use and fun to explore
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-16 text-center">
          <div className="mb-8 sm:mb-12">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6">
              <Image
                src={predictionsData.data.inputs.user_data.profile_image_url}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 font-tfnr">
              {predictionsData.data.inputs.user_data.user_name}
            </h1>
            <p className="text-[#B8B8B8] text-lg sm:text-xl mb-4 sm:mb-6">
              @{predictionsData.data.inputs.user_data.username}
            </p>
            <p className="text-white mb-8 max-w-lg mx-auto text-base font-alliance leading-relaxed">
              {predictionsData.data.inputs.user_data.user_description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-10">
            <UselessPredictions predictionsData={predictionsData} />
            <Resolutions predictionsData={predictionsData} />
          </div>

          <div className="text-center mt-8 sm:mt-10 max-w-lg mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-medium font-tfnr mb-4 sm:mb-5">
              Try with your own profile
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="@username"
                value={resolutionsUsername}
                onChange={e => setResolutionsUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-black border-[#333333] text-white font-alliance text-base sm:text-lg h-9 rounded-s"
              />
              <Button
                className="bg-[#FFFDEE] hover:bg-[#F5F5DC]/90 text-black text-xs sm:text-sm px-4 h-9 font-alliance font-medium rounded-s w-full sm:w-auto"
                onClick={() => handlePredict(resolutionsUsername)}
                disabled={isLoading}
              >
                {isLoading ? 'Predicting...' : 'Predict'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ProcessingModal open={showModal} onOpenChange={setShowModal} batchId={predictBatchId} />
      )}
      <AboutInfo />
    </>
  );
}
