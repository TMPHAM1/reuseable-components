// SplitImagePage.jsx
"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitImagePage() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageRef.current,
        markers: true,
        scrub: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex h-[300vh] overflow-hidden bg-white">
      {/* Left: Pinned Placeholder Image */}
      <div className="w-2/5 flex flex-col items-center py-12">
        <img
          ref={imageRef}
          src="https://picsum.photos/800/1200"
          alt="Placeholder"
          className="max-h-[60vh] w-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right: Snap-scrolling Info Cards */}
      <div className="w-3/5 overflow-y-auto snap-y snap-mandatory">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="snap-start min-h-screen flex flex-col justify-center p-6  rounded-lg  m-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
