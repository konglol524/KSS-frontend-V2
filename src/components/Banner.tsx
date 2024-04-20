"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Banner() {
  const { data: session } = useSession();
  // console.log('In Banner ' + JSON.stringify(session));
  return (
    <div className="w-[100vw] h-[200vh] z-0 relative bg-white top-[65px]">
      <div className="w-[55vw] z-[1] h-[100vh] absolute right-0 bg-pink-400 opacity-25"/>
      <div className="w-[55vw] z-0 h-[100vh] absolute right-0 select-none">
        <img className="w-full h-full object-cover" src="/img/scenic-road-trips.png"/>
      </div>

      <div className="w-full z-[1] absolute select-none">
        <img className="absolute right-0 mr-[309px] mt-[18px]" src="/img/crown.png" width={170}/>
        <img className="absolute right-0 top-[20vh] rotate-[1.5deg] mr-[50px]" src="/img/sport-car.png" draggable={false} width={829}/>
      </div>

      <div className="w-[45vw] h-[100vh] z-[0] left-0 absolute select-none">
        <img className="w-full h-full" src="/img/smoke.png" draggable={false}/>
      </div>
      
      <div className="w-[45vw] h-[100vh] absolute pl-[90px] z-[2]">
        <div className="text-pink-500 text-[4.2rem] z-[2] text-nowrap tracking-tighter font-bold text-left pt-[70px]">
          Start Your Journey Here
        </div>

        <div className="text-2xl text-left z-[2]">
          <span className="text-black font-bold font-sans">
            with{" "}
          </span>
          <span className="font-extrabold font-sans dekbanjarnkim animate-text-gradient">
            DekBanJarnKim{" "}
          </span>
          <span className="text-black font-bold font-sans">
            car rental system
          </span>
        </div>

        <div className="text-[1.3rem] text-left mt-[35px] w-[85%] leading-6 z-[2]">
          <span className="text-black font-sans">
            Welcome to{" "}
          </span>
          <span className="font-extrabold font-sans dekbanjarnkim animate-text-gradient">
            DekBanJarnKim
          </span>
          <span className="text-black font-sans">
            {" "}
            Car Rental System, where renting a car is as easy as a few clicks.
            Browse, book, and hit the road hassle-free with our streamlined
            platform. With a range of options to fit your budget and preferences,
            your perfect ride awaits. Start your journey with confidence today.
          </span>
        </div>

        <div className="bg-pink-500 shadow w-[30%] select-none h-[66px] mt-[33px] gap-4 cursor-pointer hover:scale-110 transition-transform flex items-center text-2xl justify-center rounded-lg text-white">
          <ShoppingCartIcon/>
          Rent Now
        </div>
      </div>

      <div className="top-1/2 right-1/2 absolute flex items-end justify-center z-[5] hover:scale-110 transition-transform -translate-y-[140px]">
        <img src="/img/arrow-down.png" className="object-contain animate-bounce" width={60}/>
      </div>

      <div className="w-[1010px] h-[481px] left-[1567px] top-[1403px] absolute">
        <img
          className="w-[323px] h-[420px] left-[72px] top-[48px] absolute shadow"
          src="/img/Right_promotion.png"
        />
      </div>
      <div className="w-[907px] h-[466px] left-[-548px] top-[1418px] absolute">
        <img
          className="w-[387px] h-[377px] left-[446px] top-[54px] absolute"
          src="/img/left_promotion.png"
        />
      </div>

      <div className="left-[79px] top-[1108px] absolute text-pink-500 text-9xl font-normal font-['Lily Script One']">
        Promotion
      </div>
      <img
        className="w-[923px] h-[469px] left-[488px] top-[1415px] absolute shadow"
        src="/img/Rectangle_8.png"
      />
      <div className="w-6 h-6 left-[812px] top-[1635px] absolute justify-center items-center inline-flex" />
      <div className="w-[289px] h-[289px] left-[1374px] top-[1499px] absolute justify-center items-center inline-flex" />
      <div className="w-[289px] h-[289px] left-[271px] top-[1490px] absolute justify-center items-center inline-flex" />
      <div className="w-[29px] h-[29px] left-[854px] top-[1953px] absolute bg-white rounded-full" />
      <div className="w-[29px] h-[29px] left-[1017px] top-[1953px] absolute bg-white rounded-full" />
      <div className="w-[29px] h-[29px] left-[964px] top-[1953px] absolute bg-white rounded-full" />
      <div className="w-[29px] h-[29px] left-[909px] top-[1953px] absolute bg-pink-500 rounded-full" />
      <div className="w-[219.78px] h-[200.73px] left-[1373.76px] top-[91px] absolute origin-top-left rotate-[20.95deg] justify-center items-center inline-flex" />
      <div className="w-[292px] h-[88px] left-[804px] top-[1763px] absolute">
        <div className="w-[292px] h-[88px] px-4 left-0 top-0 absolute bg-pink-500 bg-opacity-60 rounded-md shadow justify-center items-center gap-1 inline-flex">
          <div className="text-white text-[32px] font-medium font-['Inter']">
            Rent Now
          </div>
        </div>
      </div>
    </div>
  );
}
