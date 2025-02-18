"use client"
import { useEffect, useState, useRef } from "react";

const Accordion = () => {
  const [inView, setInView] = useState(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Content is in view, trigger the fade-in
          } else {
            setInView(false); // Content is out of view, hide it
          }
        });
      },
      {
        threshold: 1, // Trigger when 50% of the element is in view
      }
    );

    if (accordionRef.current) {
      observer.observe(accordionRef.current); // Start observing the accordion element
    }

    // Cleanup observer on component unmount
    return () => {
      if (accordionRef.current) {
        observer.unobserve(accordionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={accordionRef}
      className={`accordion mb-6 ${inView ? "accordion-visible" : ""}`}
    >
      <div className="accordion-title text-xl font-bold py-2 px-4 border-b">
        Accordion Title
      </div>
      <div className={`accordion-content ${inView ? "opacity-100" : "opacity-0"} md:w-1/4 w-full`}>
        <div className="p-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, ipsum fugit quas rerum atque autem. Atque ut sunt animi error corporis mollitia esse? Assumenda nobis culpa excepturi delectus, deserunt cupiditate, veniam a atque doloribus explicabo, voluptatem sequi? Dolorem hic, cupiditate in doloremque impedit dolores enim! Expedita omnis asperiores neque voluptatibus.
          </div>
        <div>
          <button className="btn btn-primary px-4 py-2 bg-white text-black text-xs rounded-md">Learn More</button>
        </div> 
      </div>
    </div>
  );
};

export default Accordion;
