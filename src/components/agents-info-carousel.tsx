'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import agents from '@/assets/jsons/agents.json';

import cost from '@/assets/images/cost.svg';
import runs from '@/assets/images/runs.svg';

type SystemType = {
  category: string;
  created_at: string;
  created_by: {
    image_url: string;
    user_id: string;
    username: string;
  };
  image_blurhash: string;
  credits_per_run: number;
  description: string;
  dynamic_pricing: boolean;
  image_url: string;
  name: string;
  run_count: number;
  status: string;
  system_id:
    | 'system_flux_labs'
    | 'system_virtual_tryon'
    | 'system_ideo_v2_turbo'
    | 'system_recraft_svg'
    | 'system_image_captioning'
    | 'system_image_upscaling'
    | 'system_recraft_v3'
    | 'system_tweet_generation'
    | 'system_career_counselor'
    | 'system_food_nutrition'
    | 'system_flux_lora'
    | 'system_tutor';
  tags: string[];
  updated_at: string;
  version: string;
  x_order: number;
  slug: string;
};

const features: SystemType[] = agents.data as SystemType[];

export function AgentsInfoCarousel() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = React.useState(2);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const updateCenterCard = React.useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let minDistance = Infinity;
    let centerCardIndex = 0;

    const cards = container.getElementsByClassName('carousel-card');
    Array.from(cards).forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        centerCardIndex = index;
      }
    });

    setCenterIndex(centerCardIndex);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (!containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(updateCenterCard);
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateCenterCard);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCenterCard);
    };
  }, [updateCenterCard]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setTimeout(() => {
      const cards = container.getElementsByClassName('carousel-card');
      const defaultCenterCard = cards[centerIndex] as HTMLElement;
      if (!defaultCenterCard) return;

      const containerRect = container.getBoundingClientRect();
      const cardRect = defaultCenterCard.getBoundingClientRect();
      container.scrollLeft +=
        cardRect.left + cardRect.width / 2 - (containerRect.left + containerRect.width / 2);
    }, 0);
  }, []);

  return (
    <div className="relative group mx-auto w-full overflow-hidden py-[5vh]">
      <button
        onClick={handleScrollLeft}
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 group-hover:flex z-10 bg-zinc-700 p-2 rounded text-white"
      >
        ‹
      </button>
      <button
        onClick={handleScrollRight}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 group-hover:flex z-10 bg-zinc-700 p-2 rounded text-white"
      >
        ›
      </button>
      <div
        ref={containerRef}
        className={cn(
          'flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden px-[5vw]',
          'scrollbar-none perspective-carousel',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {features.map((feature, index) => {
          const distance = index - centerIndex;

          return (
            <div
              key={feature.system_id}
              className={cn(
                'carousel-card relative px-2 select-none',
                'min-w-[300px] max-w-[300px]',
                'sm:min-w-[320px] sm:max-w-[320px]',
                'md:min-w-[340px] md:max-w-[340px]',
                'lg:min-w-[360px] lg:max-w-[360px]'
              )}
            >
              <div
                className="transition-all duration-300 ease-out"
                style={{
                  transform: `
                    perspective(1000px)
                    scale(${1 - Math.abs(distance) * 0.15})
                    translateX(${distance * -2}%)
                    translateZ(${-Math.abs(distance) * 80}px)
                    rotateY(${distance * -5}deg)
                  `,
                  opacity: 1 - Math.abs(distance) * 0.2,
                }}
              >
                <Card className="w-full bg-zinc-900 border-zinc-800">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={feature.image_url}
                        blurDataURL={feature.image_blurhash}
                        alt={feature.system_id}
                        className="object-cover pointer-events-none"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={Math.abs(distance) <= 1}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5">
                    <h3 className="text-xl font-semibold text-white font-tfnr">{feature.name}</h3>
                    <p className="text-zinc-400 text-sm font-tfnr">{feature.description}</p>
                    <div className="flex flex-wrap gap-2 font-tfnr">
                      {feature.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-tfnr"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 pb-5 flex items-center justify-between text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Image src={cost} alt="cost" width={16} height={16} />
                      <span>{feature.credits_per_run}/Run</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image src={runs} alt="runs" width={16} height={16} />
                      <span>{feature.run_count}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
