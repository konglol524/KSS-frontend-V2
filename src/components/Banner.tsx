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
  return (
    <div className="grid h-auto md:h-screen grid-cols-5">
      <section className="col-span-2  flex justify-center items-start bg-[url(/img/smoke.png)] bg-cover bg-no-repeat">
        <div className="text-[1.3rem] text-left w-[85%] leading-6 z-[2]">
          <div className="text-2xl z-[2] mb-[2rem]">
            <div className="text-pink-500 text-nowrap tracking-tighter font-bold text-start text-6xl mt-24 mb-16">
              Start Your Journey Here
            </div>
            <span className="font-sans font-bold text-black">with </span>
            <span className="font-sans font-extrabold dekbanjarnkim animate-text-gradient">
              DekBanJarnKim{" "}
            </span>
            <span className="font-sans font-bold text-black">
              car rental system
            </span>
          </div>
          <div className="">
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
          <div className="bg-pink-500 shadow w-[40%] select-none h-[66px] mt-[33px] gap-3 cursor-pointer hover:scale-110 transition-transform flex items-center text-2xl justify-center rounded-md text-white font-[600]">
            <ShoppingCartIcon />
            <Link href={"/cars"} prefetch={true} draggable={false}>
              Rent Now
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-pink-100 col-span-3 bg-[url(/img/scenic-road-trips.png)] bg-cover bg-no-repeat">
        <div className="w-full z-[1]">
          <Image
            className="absolute right-[4vw] top-1/5 rotate-[1.5deg] w-[880px] 2xl:w-[1100px] h-auto"
            src="/img/Group 1038.png"
            draggable={false}
            width={0}
            height={0}
            sizes="100vh"
            alt="sport car"
          />
        </div>
      </section>
      <footer className="bottom-0 left-0 w-full absolute flex items-end justify-center z-[5] scroll-smooth">
        <Link
          href={"#promotions"}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("promotions")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Image
            src="/img/arrow-down.png"
            className="object-contain cursor-pointer animate-bounce"
            draggable={false}
            width={60}
            height={60}
            alt="arrow down"
          />
        </Link>
      </footer>
    </div>
  );
}
