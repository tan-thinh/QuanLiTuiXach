import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { ProductContext } from "../context/ProductProvider";

const TrangChu = () => {
  const { products } = useContext(ProductContext);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const flashSaleProducts = products.filter(p => p.trangThai === 0);
  const itemsPerSlide = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(flashSaleProducts.length / itemsPerSlide);

  const intervalRef = useRef(null);

  // Đếm ngược đến cuối ngày
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay - now;

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const countdown = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Tự động chuyển slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const pad = (num) => String(num).padStart(2, "0");

  const goToPrevSlide = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <>
      <Navbar />
      <HeroSlider />

      {/* Flash Sale Header */}
      <div className="mt-6 mb-2 text-center">
        <div className="inline-block bg-red-600 px-4 py-2 rounded-md text-white text-sm font-semibold">
          FLASH SALE ⏰ {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </div>
      </div>

      {/* Flash Sale Slider */}
      <div className="max-w-7xl mx-auto px-4 mt-4 mb-10 relative">
        <div className="flex items-center justify-between mb-4">
          <button onClick={goToPrevSlide} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            ←
          </button>
          <button onClick={goToNextSlide} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 transition-all duration-500">
          {flashSaleProducts
            .slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="inline-block text-red-600 border border-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-600 hover:text-white transition">
          Xem tất cả
        </button>
      </div>

      {/* TNQ Store giới thiệu */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="rounded-xl bg-gradient-to-r from-blue-500 via-blue-300 to-black text-white shadow-md p-6 flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-1">Khám phá TNQ Store</h2>
            <p className="text-sm opacity-90">
              Chúng tôi mang đến những mẫu túi xách nữ hiện đại, tinh tế và đầy cá tính
              - lựa chọn hoàn hảo cho mọi phong cách và dịp đặc biệt
            </p>
            <h3>TNQ Store - Nơi phong cách bắt đầu</h3>
          </div>
          <button className="bg-white text-red-600 px-5 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300 text-sm">
            <Link to="/productList">Khám phá ngay</Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TrangChu;
