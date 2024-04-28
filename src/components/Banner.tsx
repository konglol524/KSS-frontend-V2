"use client";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Lily_Script_One } from "next/font/google";

const lilyScriptOne = Lily_Script_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Banner() {
  return (
    <div className="grid h-screen grid-cols-2 lg:grid-cols-5">
      <section className="col-span-1 lg:col-span-2 flex justify-center items-start bg-[url(/img/smoke.png)] bg-cover bg-no-repeat">
        <div className="text-[1.3rem] text-left w-[85%] leading-6 z-[2]">
          <div className="text-2xl z-[2] mb-[2rem]">
            <div className=" mt-16 lg:mt-24 mb-16 text-4xl lg:text-6xl font-bold tracking-tighter text-pink-500 text-nowrap  text-start">
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
          <div className=" line-clamp-[12] lg:line-clamp-none">
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
          <Link
            href={"/cars"}
            prefetch={true}
            draggable={false}
            className="bg-pink-500 shadow w-[80%] lg:w-[40%] select-none h-[66px] mt-[33px] gap-3 cursor-pointer hover:scale-110 transition-transform flex items-center text-md lg:text-2xl justify-center rounded-md text-white font-[600]"
          >
            <ShoppingCartIcon />
            Rent Now
          </Link>
        </div>
      </section>
      <section className="bg-pink-100 col-span-1 lg:col-span-3 bg-[url(/img/bgscene.png)]  bg-cover bg-no-repeat flex items-center justify-start">
        <Image
          src="/img/homecar.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="homecar"
          className="w-full h-auto transition -translate-x-[8%] z-1 select-none"
          draggable={false}
        />
      </section>
      <footer className="bottom-0 left-0 w-full absolute flex items-end justify-center z-[5]">
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
            src="/img/arrowdown2.png"
            className="object-contain select-none cursor-pointer animate-bounce"
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
