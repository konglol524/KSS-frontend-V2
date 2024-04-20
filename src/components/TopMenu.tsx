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
    <div className={`w-[100vw] flex-nowrap flex h-[65px] items-center bg-[#ff9fd4] justify-between fixed top-0 z-[100] ${isLoaded ? "":"-translate-y-full"} transition-transform duration-900`}>
      <div className="flex flex-row h-full ml-0 text-white">
        <TopMenuItem
          title="Home page"
          item={<HomeIcon sx={{ color: "#FFF" }} fontSize="large" />}
          pageRef="/"
        />
        <TopMenuItem title="Car catalogs" item="Cars" pageRef="/cars" />
        <TopMenuItem title="Shop catalogs" item="Shops" pageRef="/shops" />
      </div>
      <div className="flex flex-row h-full mr-3 sm:mr-0">
        <TopMenuItem
          title="Make Reservation"
          item={
            session ? (
              <MinorCrashIcon sx={{ color: iconColor }} fontSize="large" />
            ) : (
              <MinorCrashIcon sx={{ color: "#FFF" }} fontSize="large" />
            )
          }
          pageRef="/reservation"
        />
        <TopMenuItem
          title="User page"
          item={<PermIdentityIcon sx={{ color: iconColor }} fontSize="large" />}
          pageRef="/user"
        />
        {
        session ? (
          <TopMenuItem
            title="Sign out"
            item={<LogoutIcon sx={{ color: iconColor }} fontSize="large" />}
            pageRef="/api/auth/signout"
          />
        ) : (
          ""
        )
        }
      </div>
    </div>
  );
}
