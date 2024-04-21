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
    <div className="grid h-screen grid-cols-5">
      <div className="w-[45vw] h-[100vh] absolute pl-[120px] z-[2]">
        <div className="text-pink-500 mt-[2rem] text-[4.2rem] z-[2] text-nowrap tracking-tighter font-bold text-left pt-[70px]">
          Start Your Journey Here
        </div>
      </div>
      <section className="col-span-2 flex justify-center items-center bg-[url(/img/smoke.png)] bg-cover bg-no-repeat">
        <div className="text-[1.3rem] text-left w-[85%] leading-6 z-[2]">
          <div className="text-2xl text-center z-[2] mb-[2rem]">
            <span className="font-sans font-bold text-black">with </span>
            <span className="font-sans font-extrabold dekbanjarnkim animate-text-gradient">
              DekBanJarnKim{" "}
            </span>
            <span className="font-sans font-bold text-black">
              car rental system
            </span>
          </div>
          <div className="ml-[2rem]">
            <span className="font-sans text-black">Welcome to </span>
            <span className="font-sans font-extrabold dekbanjarnkim animate-text-gradient">
              DekBanJarnKim
            </span>
            <span className="font-sans text-black">
              {" "}
              Car Rental System, where renting a car is as easy as a few clicks.
              Browse, book, and hit the road hassle-free with our streamlined
              platform. With a range of options to fit your budget and
              preferences, your perfect ride awaits. Start your journey with
              confidence today.
            </span>
          </div>
          <div className="bg-pink-500 ml-[2rem] shadow w-[40%] select-none h-[66px] mt-[33px] gap-3 cursor-pointer hover:scale-110 transition-transform flex items-center text-2xl justify-center rounded-md text-white font-[600]">
            <ShoppingCartIcon />
            Rent Now
          </div>
        </div>
      </section>
      <section className="bg-pink-100 col-span-3 bg-[url(/img/scenic-road-trips.png)]">
        <div className="w-full z-[1]">
          <Image
            className="ml-[25rem] mt-[4rem]"
            src="/img/crown.png"
            width={170}
            height={170}
            alt="crown"
          />
          <Image
            className="absolute left-[35rem] top-[25vh] rotate-[1.5deg] mr-[50px]"
            src="/img/sport-car.png"
            draggable={false}
            width={829}
            height={300}
            alt="sport car"
          />
        </div>
      </section>
      <footer className="bottom-0 left-0 w-full absolute flex items-end justify-center z-[5]">
        <Image
          src="/img/arrow-down.png"
          className="object-contain cursor-pointer animate-bounce"
          width={60}
          height={60}
          alt="arrow down"
        />
      </footer>
    </div>
  );
}
