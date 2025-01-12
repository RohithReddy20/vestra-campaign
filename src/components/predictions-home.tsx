'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProcessingModal from './processing-modal';
import vestraLogo from '@/assets/images/vestra.svg';
import { PredictionStart } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

import homeBg from '@/assets/images/home-bg.png';
import { initializeAnalytics, trackPredictionClick } from '@/utils/analytics';

export default function PredictionsHome() {
  const [nostradamusUsername, setNostradamusUsername] = useState('');
  const [resolutionsUsername, setResolutionsUsername] = useState('');
  const [isResolutionLoading, setIsResolutionLoading] = useState(false);
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [batchId, setBatchId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Initializing analytics on main page');
    initializeAnalytics();
  }, []);

  const handlePredict = async (username: string, type: 'prediction' | 'resolution') => {
    if (!username) return;

    // Track prediction click
    trackPredictionClick(type === 'prediction' ? 'predictions' : 'resolutions', username);

    if (type === 'prediction') {
      setIsPredictionLoading(true);
    } else {
      setIsResolutionLoading(true);
    }

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
      const data: PredictionStart = await response.json();
      if (data.success) {
        setBatchId(data.data.batch_id);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to start prediction. Please try again.',
      });
      setShowModal(false);
    } finally {
      if (type === 'prediction') {
        setIsPredictionLoading(false);
      } else {
        setIsResolutionLoading(false);
      }
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    username: string,
    type: 'prediction' | 'resolution'
  ) => {
    if (e.key === 'Enter') {
      handlePredict(username, type);
    }
  };

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-black flex items-center overflow-hidden"
      >
        <div className="w-full h-full min-h-screen mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-7">
          {/* Powered by Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center relative h-[30vh] md:h-screen w-full"
          >
            <Image
              src={homeBg}
              alt="Background"
              priority
              fill
              className="object-cover absolute inset-0 z-[1]"
            />
            <div className="flex flex-col items-center justify-center gap-2 md:gap-4 relative z-10">
              <p className="tracking-[0.3em] md:tracking-[0.5em] text-base md:text-xl text-white font-tfnr">
                Powered by
              </p>
              <Image
                src={vestraLogo}
                alt="Vestra Logo"
                width={80}
                height={80}
                className="md:w-[120px] md:h-[120px]"
              />
              <p className="font-fauna text-xl md:text-2xl gradient-text font-thin">VESTRA</p>
              <p className="text-white font-tfnr text-lg md:text-2xl leading-[32px] md:leading-[46px] text-center px-4">
                AI that&apos;s easy to use and fun to explore
              </p>
            </div>
          </motion.div>

          {/* Spacer - hidden on mobile */}
          <div className="hidden md:block" />

          {/* Cards Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="px-4 md:px-0"
          >
            <div className="py-6 md:py-10 flex flex-col items-center justify-center gap-6 md:gap-10 h-full">
              {/* Nostradamus Card */}
              <div className="rounded-[20px] gradient-bg-color-black p-6 md:p-10 w-full max-w-[min(768px,95%)] flex flex-col gap-1 md:gap-2">
                <h1 className="text-[#E52D27] text-2xl md:text-4xl font-bold font-tfnr">
                  Nostradamus IRL
                </h1>
                <div>
                  <p className="text-[#B8B8B8] text-base md:text-xl font-tfnr">
                    He knows your future, in a way that&apos;s fun. So right, it&apos;s second to
                    none.
                  </p>
                </div>
                <p className="text-white text-xl md:text-3xl font-semibold font-tfnr">
                  Drop your <span className="text-[#E52D27]">@</span> and unlock the mystery!
                </p>
                <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-6">
                  <Input
                    type="text"
                    placeholder="@username"
                    value={nostradamusUsername}
                    onChange={e => setNostradamusUsername(e.target.value)}
                    onKeyDown={e => handleKeyPress(e, nostradamusUsername, 'prediction')}
                    className="bg-black border-[#333333] text-white font-alliance h-12 rounded-s text-base w-full"
                    disabled={isPredictionLoading}
                  />
                  <Button
                    className="bg-[#FFFDEE] hover:bg-[#F5F5DC]/90 text-black text-sm px-4 h-12 font-alliance font-medium rounded-s w-full md:w-48"
                    onClick={() => handlePredict(nostradamusUsername, 'prediction')}
                    disabled={isPredictionLoading}
                  >
                    {isPredictionLoading ? 'Predicting...' : 'Predict'}
                  </Button>
                </div>
              </div>

              {/* Resolutions Card */}
              <div className="rounded-[20px] gradient-bg-color-black p-6 md:p-10 w-full max-w-[min(768px,95%)] flex flex-col gap-1 md:gap-2">
                <div className="text-white font-tfnr text-2xl md:text-4xl font-bold">
                  Discover your <span className="text-[#E52D27]">2025</span> resolutions with a
                  twist
                </div>
                <p className="text-[#B8B8B8] text-base md:text-xl font-tfnr">
                  Crafts resolutions based on your Twitter profile.
                </p>
                <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-6">
                  <Input
                    type="text"
                    placeholder="@username"
                    value={resolutionsUsername}
                    onChange={e => setResolutionsUsername(e.target.value)}
                    onKeyDown={e => handleKeyPress(e, resolutionsUsername, 'resolution')}
                    className="bg-black border-[#333333] text-white font-alliance h-12 rounded-s text-base w-full"
                    disabled={isResolutionLoading}
                  />
                  <Button
                    className="bg-[#FFFDEE] hover:bg-[#F5F5DC]/90 text-black text-sm px-4 h-12 font-alliance font-medium rounded-s w-full md:w-48"
                    onClick={() => handlePredict(resolutionsUsername, 'resolution')}
                    disabled={isResolutionLoading}
                  >
                    {isResolutionLoading ? 'Processing...' : 'Make Resolutions'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ProcessingModal open={showModal} onOpenChange={setShowModal} batchId={batchId} />
    </div>
  );
}
