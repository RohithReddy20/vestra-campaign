'use client';

import Image from 'next/image';
import vestraLogo from '@/assets/images/vestra.svg';
import { AgentsInfoCarousel } from './agents-info-carousel';
import lines from '@/assets/images/lines.png';
import bgGraphic from '@/assets/images/bg-graphic.png';

export function AboutInfo() {
  return (
    <div className="flex relative flex-col items-center justify-center w-full py-4 px-3 sm:px-6">
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
      <p className="text-white text-xl sm:text-2xl md:text-4xl font-tfnr font-medium text-center">
        This agent is built by{' '}
        <span className="font-fauna text-xl sm:text-2xl sm:text-[28px] gradient-text font-thin">
          VESTRA
        </span>
      </p>
      <p className="font-tfnr text-base sm:text-lg md:text-3xl text-[#B8B8B8] text-center mt-4 sm:mt-6">
        Explore a vast library of pre-built agents and tools. Find ready-to-use solutions or get
        inspired to build your own.
      </p>
      <AgentsInfoCarousel />
      <div className="footer flex flex-col sm:flex-row gap-y-8 sm:gap-x-16 justify-center items-center w-full pb-8 sm:pb-16">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 relative z-10 w-full sm:w-[40%]">
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
        <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-[45%]">
          <div>
            <p className="font-tfnr text-xl sm:text-2xl md:text-3xl font-bold text-white">
              An Agent for every use case
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm sm:text-base md:text-xl font-medium mt-1 sm:mt-2 md:mt-4">
              Build smart agents effortlessly and let them do your work for you
            </p>
          </div>
          <div>
            <p className="font-tfnr text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Work Smarter, Not Harder
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm sm:text-base md:text-xl font-medium mt-1 sm:mt-2 md:mt-4">
              Let AI agents handle the heavy lifting, so you can focus on what matters.
            </p>
          </div>
          <div>
            <p className="font-tfnr text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Get Things Done
            </p>
            <p className="font-tfnr text-[#BFBFBF] text-sm sm:text-base md:text-xl font-medium mt-1 sm:mt-2 md:mt-4">
              Build smart agents effortlessly and let them do your work for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
