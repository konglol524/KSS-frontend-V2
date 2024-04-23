import Image from "next/image";
import getPromotion from "@/libs/getPromotion";
import getFeedback from "@/libs/getFeedback";
import { feedback } from "interface";
import Star from "@/components/Star"

export default async function PromotionDetailPage({ params }: { params: { pid: string } }) {
    const mockPromotionRepo = [
        { name: "Tanza Hot Sale", description: "Tanza Hot Sale description aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsfssdfdsfsdfsfdsfdsfdsfdsfdsgfdrfsfgodfgoidrjgoaerdjgergjodgjedrkgjfdriogjiodfjgiodrfjg", picture:`/promotions/0.jpg` },
        { name: "One Hit Sale", description: "One Hit Sale description", picture:`/promotions/1.jpg` },
        { name: "Guadalupe Special Sale", description: "Guadalupe Special Sale description", picture:`/promotions/2.jpg` }
    ];

    const promotionDetail = await getPromotion(params.pid);

    // Find the promotion with the same name as the fetched promotion
    const matchedPromotion = mockPromotionRepo.find(promotion => promotion.name === promotionDetail.data.name);
    

    const feedbackData = matchedPromotion ? await getFeedback(promotionDetail.data._id) : [];

    return (
        <div className="flex flex-col items-center h-screen bg-[#FFF2F9]">
                <div className="mt-16 w-[60vw] bg-pink-200 bg-flower rounded-lg flex flex-row justify-center p-[49px] gap-10 shadow-[0_4px_4px_-0px_rgba(250,78,171,1)]">
                    <div className="w-8/12 relative rounded-[15px] items-center">   
                        <img className="" src={matchedPromotion ? matchedPromotion.picture : '/cars/fortuner.jpg'} alt="Promotion Image" />
                    </div>  
                    <div className="w-4/12 relative items-start text-left text-pretty break-words">
                        <span className="text-black text-4xl font-bold font-['Lato']">{promotionDetail.data.name}<br/></span>
                        <div className="text-black text-2xl font-normal font-['Lato']">{matchedPromotion ? matchedPromotion.description : "No description available"} </div>
                    <div className="mt-24 text-black text-2xl font-normal font-['Lato']">Rating: {promotionDetail.data.ratingSum}</div>
                    <Star stars={promotionDetail.data.ratingSum}/>
                    </div>
                </div>
                <div className="mt-12">
                    <div className="text-left text-black text-4xl font-normal font-['Lato']">Comments</div>
                    <div className="mt-12 w-[60vw] bg-pink-200 bg-flower rounded-lg flex flex-row justify-center p-[49px] gap-10 shadow-[0_4px_4px_-0px_rgba(250,78,171,1)]"></div>
                </div>
        </div>
    );
}
