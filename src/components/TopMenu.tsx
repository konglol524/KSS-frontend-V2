'use client'
import TopMenuItem from "./TopMenuItem";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TopMenu() {
  const session = useSession();

  const iconColor = session ? "#f42e9b" : "#FFF";

  const [ isLoaded, setIsLoaded ] = useState<boolean>(false);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [isLoaded])

  return (
    <div className={`w-[100vw] flex-nowrap flex h-[65px] items-center bg-white shadow justify-between fixed top-0 z-[100] ${isLoaded ? "":"-translate-y-full"} transition-transform duration-900`}>
      <div className="flex items-center justify-center px-4 py-2 absolute bg-pink-400 rounded-lg ml-[80px] text-white text-2xl font-normal">
        キム先生
      </div>
      <div className="w-full h-full items-center flex justify-center absolute text-center text-black text-3xl font-normal font-['Lily Script One']">
        DekBanJarnKim
      </div>
      <div className="h-full w-[50%] absolute right-0 flex items-center justify-end mr-[60px] gap-14">
        <img className="w-[35px] h-[35px]" src="/img/car-icon.png"/>
        <img className="w-[35px] h-[35px]" src="/img/profile-icon.png"/>
      </div>
    </div>
  );
}
