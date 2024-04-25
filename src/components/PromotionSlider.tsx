"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PromotionBanner from "@/components/PromotionBanner";
import "@/components/MySwiper.css";

import { Lily_Script_One } from "next/font/google";

const lilyScriptOne = Lily_Script_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function PromotionSlider() {
  const slides = Array.from({ length: 3 }).map((_, index) => (
    <SwiperSlide key={index} virtualIndex={index}>
      <PromotionBanner promotion={index.toString()} />
    </SwiperSlide>
  ));

  return (
    <>
      <div
        className={`bg-white shadow-xl text-7xl font-normal text-start p-8 ${lilyScriptOne.className} text-[#FA4EAB]`}
        id="promotions"
      >
        Promotions
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1.75}
        navigation
        centeredSlides
        pagination={{ clickable: true, type: "bullets" }}
        virtual
        modules={[Navigation, Pagination, Virtual]}
        className="h-1/4 w-auto cursor-grab bg-flower bg-cover bg-center"
      >
        {slides.map((slide) => slide)}
        <br />
      </Swiper>
    </>
  );
}
