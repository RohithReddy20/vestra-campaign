"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export function FocusedCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = React.useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollPosition = container.scrollLeft
    const itemWidth = container.offsetWidth
    const newIndex = Math.round(scrollPosition / itemWidth)
    
    setActiveIndex(newIndex)
  }, [])

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const itemWidth = container.offsetWidth
    container.scrollTo({
      left: itemWidth * index,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      <div 
        ref={containerRef}
        className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        onScroll={handleScroll}
      >
        {features.map((feature, index) => {
          const distance = Math.abs(activeIndex - index)
          const scale = 1 - distance * 0.1 // Cards get smaller based on distance from active
          const opacity = 1 - distance * 0.2 // Cards get more transparent based on distance
          
          return (
            <div
              key={feature.id}
              className="min-w-full snap-center px-4"
              style={{
                scrollSnapAlign: "center",
              }}
            >
              <Card 
                className={cn(
                  "relative mx-auto w-full max-w-2xl cursor-pointer bg-zinc-950 text-white transition-all duration-300",
                  "hover:shadow-xl"
                )}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                }}
                onClick={() => scrollToIndex(index)}
              >
                <CardHeader className="relative h-[300px] p-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="rounded-t-lg object-cover"
                    priority={distance <= 1} // Prioritize loading for visible cards
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-6">
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
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

