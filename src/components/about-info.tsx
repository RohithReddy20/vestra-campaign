'use client';

import Image from 'next/image';
import vestraLogo from '@/assets/images/vestra.svg';
import { AgentsInfoCarousel } from './agents-info-carousel';
import lines from '@/assets/images/lines.png';
import bgGraphic from '@/assets/images/bg-graphic.png';
import Link from 'next/link';
import { trackVisitVestra } from '@/utils/analytics';

export function AboutInfo() {
  return (
    <>
      <div className="flex relative flex-col items-center justify-center w-full py-4 px-3 sm:px-6 mt-16">
        <Image
          src={lines}
          alt="Background Lines"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />
        <Image
          src={bgGraphic}
          alt="Background Graphic"
          className="absolute top-[-150px] sm:top-[-300px] right-0 w-[200px] sm:w-[300px] md:w-[400px] h-auto object-contain opacity-70 z-10"
        />
        <p className="text-white text-2xl md:text-4xl font-tfnr font-medium text-center z-20">
          This agent is built by{' '}
          <Link href="https://vestra.ai" target="_blank" onClick={() => trackVisitVestra()}>
            <span className="font-fauna text-xl sm:text-2xl sm:text-[28px] gradient-text font-thin">
              VESTRA
            </span>
          </Link>
        </p>
        <p className="font-tfnr text-base md:text-xl text-[#B8B8B8] text-center mt-4 sm:mt-6 z-20 max-w-4xl">
          Explore a vast library of pre-built agents and tools. Find ready-to-use solutions or get
          inspired to build your own.
        </p>
        <AgentsInfoCarousel />
      </div>
      <div className="footer flex flex-col sm:flex-row gap-y-8 sm:gap-x-8 md:gap-x-16 justify-center items-center w-full pt-14 pb-52">
        <div className="flex flex-col items-center justify-center md:gap-4 relative z-10 w-full sm:w-[40%]">
          <Link href="https://vestra.ai" target="_blank" onClick={() => trackVisitVestra()}>
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={vestraLogo}
                alt="Vestra Logo"
                width={60}
                height={60}
                className="sm:w-[80px] sm:h-[80px] md:w-[120px] md:h-[120px]"
              />
              <p className="font-fauna text-lg sm:text-xl md:text-2xl gradient-text font-thin">
                VESTRA
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-10 sm:gap-12 items-center sm:items-start w-full sm:w-[60%] px-5 sm:pl-0 sm:pr-5">
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-tfnr text-xl md:text-2xl lg:text-3xl font-bold text-white">
              An Agent for every use case
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm md:text-base font-medium">
              Build smart agents effortlessly and let them do your work for you
            </p>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-tfnr text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Work Smarter, Not Harder
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm md:text-base font-medium">
              Let AI agents handle the heavy lifting, so you can focus on what matters.
            </p>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-tfnr text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Get Things Done
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm md:text-base font-medium">
              Build smart agents effortlessly and let them do your work for you
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
