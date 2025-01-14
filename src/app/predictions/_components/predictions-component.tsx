'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import ProcessingModal from '@/components/processing-modal';
import { Resolutions } from './resolutions';
import { UselessPredictions } from './useless-predictions';
import { PredictionProgress } from '@/types/types';
import { AboutInfo } from '@/components/about-info';
import { trackTryWithOwnProfile, trackVisitVestra, trackFollowTwitter } from '@/utils/analytics';
import { useComponentToImage } from '@/hooks/use-component-to-image';

import home from '@/assets/images/home.svg';
import vestra from '@/assets/images/vestra.svg';
import twitter from '@/assets/images/twitter.svg';
import tryOwnProfile from '@/assets/images/try-own-profile.jpeg';

export default function Predictions() {
  const searchParams = useSearchParams();
  const batchId = searchParams?.get('batchId');
  const { toast } = useToast();
  const router = useRouter();
  const [predictionsData, setPredictionsData] = useState<PredictionProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolutionsUsername, setResolutionsUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [predictBatchId, setPredictBatchId] = useState<string | null>(null);
  const { uploadImage } = useComponentToImage();
  const resolutionsRef = useRef<HTMLDivElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadAttempts, setUploadAttempts] = useState(0);
  const MAX_UPLOAD_ATTEMPTS = 3;

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

  useEffect(() => {
    const uploadImages = async () => {
      if (!predictionsData?.success || isUploading) return;

      // Add check for maximum upload attempts
      if (uploadAttempts >= MAX_UPLOAD_ATTEMPTS) {
        console.warn('Maximum upload attempts reached');
        setIsUploading(false);
        return;
      }

      const needsUpload =
        !predictionsData.data.additional_data.predictions?.media_url ||
        !predictionsData.data.additional_data.resolutions?.media_url;

      if (needsUpload && predictionsRef.current && resolutionsRef.current) {
        setIsUploading(true);
        try {
          const uploads = [];

          if (!predictionsData.data.additional_data.predictions?.media_url) {
            uploads.push(
              uploadImage(
                predictionsRef,
                `useless-predictions-${predictionsData.data.batch_id}`,
                'predictions',
                predictionsData.data.batch_id
              )
            );
          }

          if (!predictionsData.data.additional_data.resolutions?.media_url) {
            uploads.push(
              uploadImage(
                resolutionsRef,
                `resolutions-${predictionsData.data.batch_id}`,
                'resolutions',
                predictionsData.data.batch_id
              )
            );
          }

          if (uploads.length > 0) {
            await Promise.all(uploads);
            setUploadAttempts(prev => prev + 1);

            const response = await fetch(`/api/progress/${batchId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch updated predictions');
            }
            const newData = await response.json();
            setPredictionsData(newData);
          }
        } catch (err) {
          console.error('Error uploading images:', err);
          setUploadAttempts(prev => prev + 1);
        } finally {
          setIsUploading(false);
        }
      }
    };

    uploadImages();
  }, [predictionsData, batchId, uploadImage, isUploading, uploadAttempts]);

  const handlePredict = async (username: string) => {
    if (!username) return;
    setIsLoading(true);

    // Track try with own profile
    trackTryWithOwnProfile(username);

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

  if (error || !predictionsData || !predictionsData.success) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white flex items-center justify-center flex-col gap-3">
        <p>{error || 'No predictions found'}</p>
        <Link href="/">
          <Button
            variant="outline"
            className="text-xs sm:text-sm font-semibold bg-transparent text-black bg-white hover:bg-zinc-300 font-tfnr sm:w-full p-3 max-w-36"
          >
            <Image src={vestra} height={20} width={20} alt="twitter" /> Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0C0C0C] text-white pt-3">
        <header className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex-grow basis-0 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image src={home} height={32} width={32} alt="home" />
              <span className="text-sm sm:text-base font-tfnr font-medium">Home</span>
            </div>
          </Link>
          <div className="hidden items-center justify-center lg:flex flex-grow flex-col">
            <Link href="/" className="cursor-pointer">
              <div className="hidden items-center justify-center md:flex flex-grow">
                <Image src={vestra} alt="Vestra" width={60} height={60} />
                <p className="font-fauna text-2xl md:text-[28px] gradient-text font-thin">VESTRA</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center w-24 sm:w-auto justify-end flex-grow basis-0">
            <div className="flex flex-row items-center gap-2 sm:gap-3 w-24 sm:w-auto justify-end">
              <Link
                href="https://vestra.ai"
                target="_blank"
                className="sm:w-full"
                onClick={() => trackVisitVestra()}
              >
                <Button
                  variant="outline"
                  className="text-xs sm:text-sm font-semibold bg-transparent text-black bg-white hover:bg-zinc-300 font-tfnr sm:w-full p-3 max-w-36"
                >
                  <span className="hidden sm:block">Visit Vestra</span>
                  <span className="h-5 w-5 sm:h-6 sm:w-6 sm:hidden">
                    <Image src={vestra} height={20} width={20} alt="twitter" />
                  </span>
                </Button>
              </Link>
              <Link
                href="https://x.com/vestra_ai"
                target="_blank"
                className="sm:w-full"
                onClick={() => trackFollowTwitter()}
              >
                <Button
                  variant="outline"
                  className="text-xs sm:text-sm font-semibold border-none text-white bg-[#292929] hover:bg-[#1c1c1c] hover:text-white font-tfnr sm:w-full p-3 max-w-36"
                >
                  <span className="hidden sm:block"> Follow us on</span>
                  <span className="h-5 w-5 sm:h-6 sm:w-6">
                    <Image src={twitter} height={20} width={20} alt="twitter" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <p className="font-tfnr text-base text-[#B8B8B8] mx-auto w-full hidden lg:block text-center">
          AI that’s easy to use and fun to explore
        </p>
        <div className="mx-auto px-4 pt-8 sm:py-8 text-center block lg:hidden">
          <div className="flex items-center justify-center">
            <Image src={vestra} alt="Vestra" width={45} height={45} />
            <Link href="/" className="cursor-pointer">
              <p className="font-fauna text-2xl sm:text-[28px] gradient-text font-thin">VESTRA</p>
            </Link>
          </div>
          <p className="text-white font-tfnr text-base md:text-xl leading-[32px] md:leading-[46px] text-center px-4">
            AI that&apos;s easy to use and fun to explore
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-8 text-center">
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
            <UselessPredictions predictionsData={predictionsData} ref={predictionsRef} />
            <Resolutions predictionsData={predictionsData} ref={resolutionsRef} />
          </div>

          <div className="relative rounded-[20px] flex justify-center items-center mt-8 sm:mt-16 w-full max-w-[1100px] overflow-hidden p-4 sm:p-6 md:p-10 mx-auto">
            <Image
              src={tryOwnProfile}
              alt="Try own profile background"
              className="absolute h-auto w-full object-cover"
              priority
            />
            <div className="text-center w-full max-w-lg mx-auto px-2 sm:px-4 bg-transparent z-50">
              <h2 className="text-lg sm:text-xl md:text-3xl font-medium font-tfnr mb-2 sm:mb-3 md:mb-5">
                Try with your own profile
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 z-50">
                <Input
                  type="text"
                  placeholder="@username"
                  value={resolutionsUsername}
                  onChange={e => setResolutionsUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-black border-[#333333] text-white font-alliance text-base sm:text-lg md:text-xl h-10 sm:h-12 rounded-md z-50"
                />
                <Button
                  className="bg-[#FFFDEE] hover:bg-[#F5F5DC]/90 text-black text-sm sm:text-base px-4 sm:px-6 h-10 sm:h-12 font-alliance rounded-md w-full sm:w-auto font-semibold z-50 mt-2 sm:mt-0 max-w-40 mx-auto"
                  onClick={() => handlePredict(resolutionsUsername)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Predicting...' : 'Predict'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutInfo />
      {showModal && (
        <ProcessingModal open={showModal} onOpenChange={setShowModal} batchId={predictBatchId} />
      )}
    </>
  );
}
