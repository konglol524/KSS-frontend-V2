"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Lily_Script_One } from "next/font/google";

const lilyScriptOne = Lily_Script_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Banner() {
  const { data: session } = useSession();
  // console.log('In Banner ' + JSON.stringify(session));
  return (
    <div className="w-[100vw] h-[200vh] z-0 relative bg-white">
      <div className="w-[55vw] z-[1] h-[100vh] absolute right-0 bg-pink-400 opacity-25" />
      <div className="w-[55vw] z-0 h-[100vh] absolute right-0 select-none">
        <img
          className="w-full h-full object-cover"
          src="/img/scenic-road-trips.png"
        />
      </div>

      <div className="w-full z-[1] absolute select-none">
        <img
          className="absolute right-0 mr-[309px] mt-[18px]"
          src="/img/crown.png"
          width={170}
        />
        <img
          className="absolute right-0 top-[20vh] rotate-[1.5deg] mr-[50px]"
          src="/img/sport-car.png"
          draggable={false}
          width={829}
        />
      </div>

      <div className="w-[45vw] h-[100vh] z-[0] left-0 absolute select-none">
        <img
          className="w-full h-full opacity-60"
          src="/img/smoke.png"
          draggable={false}
        />
      </div>

      <div className="w-[45vw] h-[100vh] absolute pl-[120px] z-[2]">
        <div className="text-pink-500 text-[4.2rem] z-[2] text-nowrap tracking-tighter font-bold text-left pt-[70px]">
          Start Your Journey Here
        </div>

        <div className="text-2xl text-left z-[2]">
          <span className="text-black font-bold font-sans">with </span>
          <span className="font-extrabold font-sans dekbanjarnkim animate-text-gradient">
            DekBanJarnKim{" "}
          </span>
          <span className="text-black font-bold font-sans">
            car rental system
          </span>
        </div>

        <div className="text-[1.3rem] text-left mt-[35px] w-[85%] leading-6 z-[2]">
          <span className="text-black font-sans">Welcome to </span>
          <span className="font-extrabold font-sans dekbanjarnkim animate-text-gradient">
            DekBanJarnKim
          </span>
          <span className="text-black font-sans">
            {" "}
            Car Rental System, where renting a car is as easy as a few clicks.
            Browse, book, and hit the road hassle-free with our streamlined
            platform. With a range of options to fit your budget and
            preferences, your perfect ride awaits. Start your journey with
            confidence today.
          </span>
        </div>

        <div className="bg-pink-500 shadow w-[30%] select-none h-[66px] mt-[33px] gap-4 cursor-pointer hover:scale-110 transition-transform flex items-center text-2xl justify-center rounded-lg text-white">
          <ShoppingCartIcon />
          Rent Now
        </div>
      </div>

      <div className="top-1/2 right-1/2 absolute flex items-end justify-center z-[5] hover:scale-110 transition-transform -translate-y-[140px]">
        <img
          src="/img/arrow-down.png"
          className="object-contain animate-bounce"
          width={60}
        />
      </div>

      <div className="absolute top-[100vh] z-[5] w-[100vw] h-[120px] bg-white shadow-md flex items-center">
        <div
          className={`pl-[90px] text-pink-500 text-[4.2rem] ${lilyScriptOne.className}`}
        >
          Promotion
        </div>
      </div>
      <div className="absolute top-[100vh] z-0 opacity-50">
        <img src="/img/flower-background.png" />
      </div>
    </div>
  );
}
