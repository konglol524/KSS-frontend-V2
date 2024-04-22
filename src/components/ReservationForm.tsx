'use client'
import getCars from "@/libs/getCars";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function ReservationForm() {
    const router = useRouter();
    const params = useParams<{cname: string}>();

    const cars:{[key:string]: Car} = getCars();

    const selectedCar:Car|null = cars[decodeURIComponent(params.cname)] || null;

    useEffect(()=>{
        let redirectTimeout:NodeJS.Timeout;

        if (!selectedCar) {
            redirectTimeout = setTimeout(()=>{
                router.push('/cars');
            }, 2000)
        }

        return () => {
            clearTimeout(redirectTimeout);
        }
    }, [])

    return (
        <>
            {
                selectedCar ?
                <div className="grid grid-cols-2">
                    <div className="flex justify-center items-start h-[143vh]">
                        <Image className="object-contain bg-no-repeat mt-[100px]" 
                        src={selectedCar.img} alt={selectedCar.model} width={600} height={600}/>  
                    </div>
                    <div className="flex items-center">
                        <div className="bg-[#FFF2F9] w-[80%] h-[90%] rounded-[30px]">
                            <div className="text-5xl text-black text-left font-bold px-10 pt-7">{selectedCar.model}</div>

                        </div>
                    </div>
                </div>
                :
                <div className="w-[100vw] h-[100vh] fixed text-3xl top-1/2 font-bold">
                    Error: Car Not Found (Redirecting...)
                </div>
            }
        </>
    )
}