import Image from "next/image";
import getPromotion from "@/libs/getPromotion";
import getFeedback from "@/libs/getFeedback";
import { feedback } from "interface";

export default async function PromotionDetailPage({ params }: { params: { pid: string } }) {
    const mockPromotionRepo = [
        { name: "Tanza Hot Sale", description: "Tanza Hot Sale description", picture:`/promotions/0.jpg` },
        { name: "One Hit Sale", description: "One Hit Sale description", picture:`/promotions/1.jpg` },
        { name: "Guadalupe Special Sale", description: "Guadalupe Special Sale description", picture:`/promotions/2.jpg` }
    ];

    const promotionDetail = await getPromotion(params.pid);

    // Find the promotion with the same name as the fetched promotion
    const matchedPromotion = mockPromotionRepo.find(promotion => promotion.name === promotionDetail.data.name);
    

    const feedbackData = matchedPromotion ? await getFeedback(promotionDetail.data._id) : [];

    return (
        <div className="flex flex-row justify-center h-screen bg-[#FFF2F9] ">
            <div className="relative mt-14">
                <div className="w-[1268px] h-[578px] bg-pink-200 rounded-lg bg-flower ">
                    <div className="w-[742px] h-[480px] left-[35px] top-[49px] absolute rounded-[15px] justify-center items-center inline-flex">
                        <img className="w-[742px] h-[480px]" src={matchedPromotion ? matchedPromotion.picture : '/cars/fortuner.jpg'} alt="Promotion Image" />
                    </div>
                    <div className="w-[373px] h-[73.19px] left-[818px] top-[39.41px] absolute"><span className="text-black text-4xl font-bold font-['Lato']">{promotionDetail.data.name}<br/></span><span className="text-black text-5xl font-normal font-['Lato']"><br/></span></div>
                    <div className="w-[279px] h-[104.15px] left-[818px] top-[425px] absolute">
                        <div className="w-[279px] h-[104.15px] px-4 left-0 top-0 absolute bg-pink-500 bg-opacity-60 rounded-md shadow justify-center items-center gap-1 inline-flex">
                            <div className="text-white text-[32px] font-medium font-['Inter']">  Rent Now</div>
                        </div>
                    </div>
                    <div className="w-[424px] h-[301px] left-[818px] top-[106px] absolute text-black text-[20px] font-normal font-['Lato']">Description: {matchedPromotion ? matchedPromotion.description : "No description available"} </div>
                    <div className="w-[424px] h-[301px] left-[818px] top-[140px] absolute text-black text-[20px] font-normal font-['Lato']">Rating: {promotionDetail.data.ratingSum}</div>
                </div>
            </div>
        </div>
    );
}
