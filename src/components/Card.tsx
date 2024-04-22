import Promotion from "@/app/(promotioninfo)/promotion/page"
import Image from "next/image"
import Link from "next/link"

export default function Card({ PromotionName,imgSrc,rating}:{PromotionName:string,imgSrc:string,rating:string}){
    

    return (
        <div className="w-[500px] sm:w-[300px] m-2 h-[350px] rounded-lg shadow-lg text-white bg-black bg-opacity-40">
            <div className="w-full h-[60%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt='Promotion Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className="w-full h-[10%] p-[5px] text-lg font-bold">{PromotionName}</div>  
            <div className="w-full h-[10%] p-[5px] text-lg font-bold">{`Rating = ${rating}`}</div>         
        </div>
    )
}