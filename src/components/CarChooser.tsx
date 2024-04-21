"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CarCard from "./CarCard";

export default function CarChooser() {
  const cars = ["accord", "civic", "fortuner", "Lightning McQueen", "tesla"];
  const [swiperRef, setSwiperRef] = useState(null) as any;

  const slides = cars.map((car, index) => (
    <SwiperSlide key={car} virtualIndex={index}>
      <CarCard car={car} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        spaceBetween={100}
        slidesPerView={1.75}
        centeredSlides
        navigation
        virtual
        modules={[Navigation, Pagination, Virtual]}
        onSwiper={setSwiperRef as any}
        className="h-1/2 w-auto cursor-grab"
      >
        {slides.map((slide) => slide)}
        <br />
      </Swiper>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 p-4 bg-white rounded-lg">
        {cars.map((car, index) => (
          <Image
            key={car}
            src={`/cars/${car}.jpg`}
            alt={car}
            width={0}
            height={0}
            sizes="100vw"
            className="w-1/6 h-auto cursor-pointer rounded-lg"
            draggable={false}
            onClick={() => swiperRef.slideTo(index)}
          />
        ))}
      </div>
      <style>
        {`
          .swiper-button-next, .swiper-button-prev {
            color: #FA4EAB;
            margin: 0 17em;
          }
        `}
      </style>
    </>
  );
}
