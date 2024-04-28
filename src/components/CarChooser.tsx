"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual, Scrollbar } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CarCard from "./CarCard";

import getCars from "@/libs/getCars";

import "@/components/MySwiper.css";

export default function CarChooser() {
  const cars: { [key: string]: Car } = getCars();
  const [swiperRef, setSwiperRef] = useState(null) as any;

  const slides = Object.keys(cars).map((key, index) => (
    <SwiperSlide key={key} virtualIndex={index}>
      <CarCard car={cars[key]} carkey={key} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        scrollbar={{
          hide: false,
        }}
        spaceBetween={100}
        slidesPerView={1.75}
        centeredSlides
        navigation
        virtual
        modules={[Navigation, Pagination, Virtual, Scrollbar]}
        onSwiper={setSwiperRef as any}
        className="h-1/2 w-auto cursor-grab"
      >
        {slides.map((slide) => slide)}
        <br />
      </Swiper>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 p-4 bg-[#FFF2F9] rounded-lg relative z-10">
        {Object.keys(cars).map((car, index) => (
          <Image
            key={car}
            src={cars[car].img}
            alt={car}
            width={0}
            height={0}
            sizes="100vw"
            className="w-1/6 h-auto cursor-pointer rounded-lg hover:opacity-50 transition-opacity duration-100 ease-in-out"
            draggable={false}
            onClick={() => swiperRef.slideTo(index)}
          />
        ))}
      </div>
    </>
  );
}
