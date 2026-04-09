import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";

const HeroSlider = () => {
  const { banner } = useContext(ProductContext);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banner.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banner]);

  if (!banner || banner.length === 0) {
    return <div>Đang tải banner...</div>;
  }

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banner.length) % banner.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % banner.length);

  return (
    <div className="relative w-full h-[80vh] max-h-[700px] overflow-hidden mb-2">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banner.map((slide) => (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={slide.alt}
            className="w-full flex-shrink-0 h-[80vh] object-cover"
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banner.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-black" : "bg-white"
            } border border-black`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
