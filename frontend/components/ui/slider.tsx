"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-black" />
    </SliderPrimitive.Track>

    {/* --- Two Thumbs --- */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-50 focus:outline-none" />
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-50 focus:outline-none" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
