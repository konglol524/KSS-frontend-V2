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
    const names = selectedCar.model.split(" ");
    const firstname = names[0];
    names.splice(0, 1);
    const lastname = names.join(" ");

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
                        <div className="bg-[#FFF2F9] w-[80%] h-[90%] rounded-[30px] grid grid-cols-6 grid-rows-12 gap-2 pl-2 pr-1">
                            {/* name + 3icon */}
                            <div className="flex justify-between bg-white col-span-6 ml-4 mr-4 mt-5 row-span-2">
                                <div className=" flex flex-col w-[30%]">
                                    <p className="text-5xl text-black text-left font-bold pl-3 pt-2">{firstname} </p>
                                    <p className="text-5xl text-black text-left font-bold pl-2">{lastname} </p>
                                </div>
                                <div className=" flex justify-center items-center pb-8 gap-24 w-[70%]">
                                    <p>a</p>
                                    <p>b</p>
                                    <p>c</p>
                                </div>
                            </div>
                            {/* <div className=" bg-white col-span-6 ml-4 mr-4 mt-5 row-span-2">
                            
                            
                            </div> */}
                             {/* detail */}
                            <div className="bg-[#10e917] ml-4 mr-4 col-span-2 row-span-1 ">
                                adwa
                            </div>
                            <div className=" bg-[#10e917] -ml-3 mr-11 col-span-2 row-span-1 ">
                                adwa
                            </div>
                            <div className="bg-[#10e917] -ml-10 mr-16 col-span-2 row-span-1 ">
                                adwa
                            </div>
                            <div className="bg-slate-50 ml-4 mr-10 col-span-3 mb-2 row-span-1">
                                adwa
                            </div>
                            <div className="bg-slate-50 col-span-6 ml-4 mr-4 row-span-3">
                                adwadaw
                            </div>
                            <div className="bg-slate-50 col-span-6 ml-4 mr-4 row-span-3">
                                adwadaw
                            </div>
                            <div className=" bg-[#10e917] col-span-2 col-start-2 row-span-1 mt-9 -mb-6 mr-5">
                                adwa
                            </div>
                            <div className=" bg-[#10e917] col-span-2 col-start-4 row-span-1 mt-9 -mb-6 mr-5">
                                adwa
                            </div>
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