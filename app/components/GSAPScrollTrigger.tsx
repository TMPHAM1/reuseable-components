"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP); // hook registration (optional but safer) :contentReference[oaicite:0]{index=0}
gsap.registerPlugin(ScrollTrigger); // plugin registration :contentReference[oaicite:1]{index=1}

const GSAPScrollTrigger = () => {
  const ref = useRef(null);
  //   const { contextSafe, context } = useGSAP(
  //     () => {
  //       // Start of our tween
  //       gsap.to(".b", {
  //         // What Element WE are triggering
  //         scrollTrigger: {
  //           trigger: ".b", // What casues the animation to trigger
  //           start: "top center",
  //           end: "top 100px",
  //           scrub: 1, // This is effecting the play head of the animation and sets the animation lag
  //           pin: true,
  //           markers: true,
  //           // 4 Positions
  //           // Keywords: Play, Pause, Resume, Reverse, restart, reset, complete or none
  //           // These are defined as 4 Toggle Points onEnter/onLeave/onEnterBack/onLeaveBack
  //           //snap: lets them land on a single panel
  //           // pin : pins an element
  //           // Set onEnter: () set call backs
  //           // Set on Enter Back when you go backwards into the viewport
  //           // onLEaveBack is when you go all the way back
  //           // onUpdate: (self) => console.log("update", self.progress);
  //           // toggleClass will add to trigger (in scroll trigger can add to other elements)
  //           // id set by trigger id
  //           // scroller: "#container", watch scroll position of this element
  //           // horizontal: true sets for horizontal scrolling instead
  //         },
  //         x: 700,
  //         rotation: 360,
  //         duration: 3,
  //         markers: true,
  //       });
  //       return () => {};
  //     },
  //     { dependencies: [], scope: ref }
  //   );
  const { contextSafe, context } = useGSAP(
    () => {
      // Start of our tween
      gsap.to(".b", {
        // What Element WE are triggering
        scrollTrigger: {
          trigger: "#main-container", // What casues the animation to trigger
          start: "top top",
          end: "bottom center",
          scrub: 1, // This is effecting the play head of the animation and sets the animation lag
          pin: true,
          markers: true,
          // 4 Positions
          // Keywords: Play, Pause, Resume, Reverse, restart, reset, complete or none
          // These are defined as 4 Toggle Points onEnter/onLeave/onEnterBack/onLeaveBack
          //snap: lets them land on a single panel
          // pin : pins an element
          // Set onEnter: () set call backs
          // Set on Enter Back when you go backwards into the viewport
          // onLEaveBack is when you go all the way back
          // onUpdate: (self) => console.log("update", self.progress);
          // toggleClass will add to trigger (in scroll trigger can add to other elements)
          // id set by trigger id
          // scroller: "#container", watch scroll position of this element
          // horizontal: true sets for horizontal scrolling instead
        },
        x: 700,
        rotation: 360,
        duration: 3,
        markers: true,
      });
      return () => {};
    },
    { dependencies: [], scope: ref }
  );
  console.log(context.data.length);
  const onClick = contextSafe(() => {
    gsap.to(".box", {
      scrollTrigger: {
        trigger: ".b",
        toggleActions: "none",
        // 4 Positions
        // Keywords: Play, Pause, Resume, Reverse, restart, reset, complete or none
      },
      x: 400,
      rotation: "+=360",
      duration: "5",
    });
  });

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white w-full items-center justify-around h-[300vh] gap-48 background-white p-40"
    >
      <div
        id="main-container"
        className="w-full h-[250vh] border-black border-2"
      ></div>
      <div
        onClick={onClick}
        className="box w-20 h-20 bg-blue-300 border  flex items-center justify-center"
      ></div>
      <div
        onClick={onClick}
        className="b box w-20 h-20 bg-blue-300 border text-white text-2xl flex items-center justify-center"
      >
        B
      </div>
      <div
        onClick={onClick}
        className="c box w-20 h-20 bg-blue-300 border white"
      ></div>
    </div>
  );
};

export default GSAPScrollTrigger;
