import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ items, infinite = false }) => {
  const [index, setIndex] = useState(0);
  const visibleItems = 3;
  const totalItems = items.length;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      nextSlide();
    } else if (info.offset.x > 50) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex gap-4"
            initial={{ x: 0 }}
            animate={{ x: `-${index * (100 / visibleItems)}%` }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <div key={i} className="w-1/3 flex-shrink-0">
                {item}
              </div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
