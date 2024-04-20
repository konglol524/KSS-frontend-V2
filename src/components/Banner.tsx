"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Banner() {
  const { data: session } = useSession();
  // console.log('In Banner ' + JSON.stringify(session));
  const [ loadingStep, setLoadingStep ] = useState<number>(0);

  //const [ isGlassBreak, setGlassBreak ] = useState<boolean>(false);

  useEffect(()=>{
    const timeouts:NodeJS.Timeout[] = [
      setTimeout(()=>{
        setLoadingStep(0.5);
      }, 500),
      setTimeout(()=>{
        setLoadingStep(1);
      }, 1000),
      // setTimeout(()=>{
      //   setGlassBreak(true);
      // }, 750),
    ];

    return () => {
      timeouts.forEach((timeout)=>{
        clearTimeout(timeout);
      })
    }
  }, [])

  //console.log(nameGradientPercentage)
  let carActionString:string = "-translate-x-[120%]";
  let textDescriptionActionString:string = loadingStep == 1 ? "":"-translate-y-full opacity-0";

  if (loadingStep == 0) {
    
  } else if (loadingStep == 0.5) {
    carActionString = "";
  } else if (loadingStep == 1) {
    carActionString = "scale-[120%]"
  }
  
  return (
    <div className="w-[100vw] h-[100vh] flex relative top-[180px]">
      <div className={`w-[50vw] h-[100vh] top-0 duration-1000 fixed flex items-center ${loadingStep == 1 ? "":"-translate-y-full translate-x-[33vw]"} overflow-hidden`}>
        <div className={`absolute w-[15px] h-[200%] rotate-[35deg] ml-[270px] rounded-lg bg-[#ffb7df]`}/>
        <div className={`absolute w-[150px] h-[200%] rotate-[35deg] ml-[330px] rounded-lg bg-[#ffb7df]`}/>
        <div className={`absolute w-[15px] h-[200%] rotate-[35deg] ml-[527px] rounded-lg bg-[#ffb7df]`}/>
      </div>
      
      <div className={`fixed w-auto h-auto origin-bottom-left flex items-center ${carActionString} transition-transform duration-300 ml-[48px] mt-[100px]`}>
        { /*
          isGlassBreak ? <Image src={'/img/glass-break.png'} alt="glass-break" width={500} height={500} 
          className="absolute z-[5] ml-[230px] mb-5 object-cover"/>:null
          */
        }
        <Image src="/img/red-sport-car.png" alt="sport-car" draggable={false}
        width={600} height={200} className="rotate-[-7deg] object-cover z-0"/>
        {/* <Image src={'/img/wheel.png'} alt="wheel" width={135} height={135} className="absolute ml-[135px] mt-[70px] z-[1] animate-spin"/> */}
      </div>

      <div className={`w-[4px] h-[80vh] fixed ${loadingStep == 1 ? "":"opacity-0"} transition-opacity duration-1000 top-0 left-1/2 mt-[100px] rounded-lg bg-[#FE83C6]`}/>

      <div className={`fixed ${textDescriptionActionString} select-none transition-all duration-[950ms] ease-in-out right-0 mr-[90px] w-[40vw] z-20 h-[100vh] top-0 pt-7 text-center justify-center items-center flex flex-col`}>
        <div className="text-5xl font-extrabold text-[#FA4EAB] p-2 w-fit mx-auto rounded-md mb-3">
          Start Your Journey Here
          <span className="text-lg ml-[8px]">with </span>
          <span className={`text-3xl hover:text-[2.075rem] transition-all dekbanjarnkim animate-text-gradient`}>DekBanJarnKim</span>
          <span className="text-lg mx-[8px]">car rental system</span>
        </div>
        <div className="text-2xl font-sans text-[#323232] drop-shadow-md text-left p-4 w-fit mx-auto rounded-md indent-8">
          Welcome to 
          <span className="font-sans font-bold hover:text-[1.7rem] px-2 transition-all dekbanjarnkim animate-text-gradient">
            DekBanJarnKim
          </span>
          Car Rental System, where renting a car is as easy as a few clicks. Browse, book, and hit the road hassle-free with our streamlined platform. With a range of options to fit your budget and preferences, your perfect ride awaits. Start your journey with confidence today.
        </div>

        <Link href="/reservation">
          <button className="my-5 text-white text-lg bg-[#FE83C6] rounded-xl border-2 border-[#ff6fbe] hover:scale-[115%] duration-[250ms] p-5 font-bold">
            Make Your Reservation
          </button>
        </Link>
      </div>
      {session ? (
        <div id="username" className="z-30 fixed hidden w-[100vw] h-[100vh] flex items-center justify-center font-bold text-white text-6xl" data-testid="welcome">
          Welcome {session.user.data.name}
        </div>
      ) : null}
    </div>
  );
}
