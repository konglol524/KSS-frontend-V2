import React from 'react';
import getPromotions from '@/libs/getPromotions';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/libs/auth";
import getBookings from "@/libs/getBookings";
import PromotionCatalog from "@/components/PromotionCatalog";


export default async function Promotion(){

    const promotions = await getPromotions();

  return (
    <main className="p-1 h-[125vh] bg-gradient-to-tl from-red-600 to-slate-950">
        <div className="bg-white h-[5px] mt-[20px] mb-[30px] w-[80%] sm:w-[60%] md:w-[50%] m-auto rounded-xl"></div>
        <PromotionCatalog PromotionJson={promotions}/>
    </main>
  )
}