"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Feature {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  views: string
}

const features: Feature[] = [
  {
    id: 1,
    title: "Turn ideas into stunning images",
    description: "Create professional visuals with our AI-powered image generation tool.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "AI", "Creative"],
    views: "102k"
  },
  {
    id: 2,
    title: "Curate engaging content",
    description: "Extract the essence of any content to generate impactful social media posts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Social", "Content", "Marketing"],
    views: "102k"
  },
  {
    id: 3,
    title: "Get realistic images with text in them",
    description: "Generate customized text overlays seamlessly.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Text", "Design", "Custom"],
    views: "102k"
  },
  {
    id: 4,
    title: "Try garments you love",
    description: "Virtual try-on for a perfect fit every time.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Fashion", "AR", "Shopping"],
    views: "102k"
  },
  {
    id: 5,
    title: "Build images of yourself",
    description: "Create professional avatars and personal branding images.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Personal", "Branding", "AI"],
    views: "102k"
  }
]

export function MultiCardCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length)
  }

  React.useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth * activeIndex
      containerRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
    }
  }, [activeIndex])

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      <div 
        ref={containerRef}
        className="hide-scrollbar flex snap-x snap-mandatory overflow-x-hidden"
      >
        {features.map((feature, index) => {
          const distance = Math.abs(activeIndex - index)
          const isCenter = distance === 0
          const scale = isCenter ? 1 : 0.8
          const opacity = isCenter ? 1 : 0.7
          
          return (
            <div
              key={feature.id}
              className={cn(
                "min-w-full flex-shrink-0 transform snap-center px-4 transition-all duration-300 ease-in-out",
                "sm:min-w-[50%]",
                "lg:min-w-[33.333%]",
                "xl:min-w-[25%]"
              )}
              style={{
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <Card 
                className="bg-zinc-950 text-white"
              >
                <CardHeader className="relative h-[200px] p-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="rounded-t-lg object-cover"
                    priority={distance <= 1}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4">
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span>{feature.views} views</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-950/50 text-white"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-950/50 text-white"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="mt-8 flex justify-center gap-2">
        {features.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              activeIndex === index 
                ? "bg-white" 
                : "bg-zinc-600 hover:bg-zinc-400"
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

