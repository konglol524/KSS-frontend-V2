import Image from "next/image";
import getPromotion from "@/libs/getPromotion";
import getFeedback from "@/libs/getFeedback";
import Star from "@/components/Star"
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import getProfilePicturebyId from "@/libs/getProfilePicturebyId";
import FeedbackForm from "@/components/FeedbackForm";

export default async function PromotionDetailPage({ params }: { params: { pid: string } }) {
    const mockPromotionRepo = [
        { name: "Tanza Hot Sale", description: "Tanza Hot Sale description aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsfssdfdsfsdfsfdsfdsfdsfdsfdsgfdrfsfgodfgoidrjgoaerdjgergjodgjedrkgjfdriogjiodfjgiodrfjg", picture:`/promotions/0.jpg` },
        { name: "One Hit Sale", description: "One Hit Sale description", picture:`/promotions/1.jpg` },
        { name: "Guadalupe Special Sale", description: "Guadalupe Special Sale description", picture:`/promotions/2.jpg` }
    ];
    
    const promotionDetail = await getPromotion(params.pid);
    const session = await getServerSession(authOptions);
    if(!session) return;
    const userProfilePicData = await getProfilePicturebyId(session?.user.data._id);
    const userProfilePic = userProfilePicData.data.profilePic || userProfilePicData.data;
    
    const matchedPromotion = mockPromotionRepo.find(promotion => promotion.name === promotionDetail.data.name);
    const feedbackData = matchedPromotion ? await getFeedback(promotionDetail.data._id) : [];
    
    // Reverse the order of feedbackData array
    feedbackData.data.reverse();

    const ratingCount = promotionDetail.data.ratingCount;
const ratingSum = promotionDetail.data.ratingSum;
const rating = ratingCount !== 0 ? Math.round((ratingSum / ratingCount) * 2) / 2 : 0;

    
    return (
        <div className="flex flex-col items-center h-auto bg-[#FFF2F9]">
            <div className="mt-16 w-[60vw] bg-pink-200 bg-flower rounded-lg flex flex-row justify-center p-[49px] gap-10 shadow-[0_4px_4px_-0px_rgba(250,78,171,1)]">
                <div className="w-8/12 relative items-center">   
                    <img className="rounded-lg" src={matchedPromotion ? matchedPromotion.picture : '/cars/fortuner.jpg'} alt="Promotion Image" draggable={false} />
                </div>  
                <div className="w-4/12 relative items-start text-left text-pretty break-words">
                    <span className="text-black text-4xl font-bold font-['Lato']">{promotionDetail.data.name}<br/></span>
                    <div className="text-black text-2xl font-normal font-['Lato']">{matchedPromotion ? matchedPromotion.description : "No description available"} </div>
                    <div className="mt-24 text-black text-2xl font-normal font-['Lato']">Rating: {rating}</div>
                        <Star stars={rating} fontsize="xxx-large"/>
                </div>
            </div>
            <div className="w-[60vw] mt-12 text-left pl-[49px]">
                <span className="text-black text-4xl font-normal font-['Lato']">Comments</span>
            </div>
            <div className="mt-8 bg-pink-200 items-center bg-flower w-[60vw] rounded-lg flex flex-col p-[49px] gap-10 shadow-[0_4px_4px_-0px_rgba(250,78,171,1)] ">
                <div className="bg-white w-[55vw] rounded-lg flex flex-grow p-[25px]">
                    <Image src={userProfilePic} alt="Profile" className="w-12 h-12 justify-center rounded-full" width={0} height={0} draggable={false} />
                    <FeedbackForm
                    promoID={params.pid}
                    token={session?.user.token}
                    />
                </div>
                {feedbackData && (
                    <div>
                        {feedbackData.data.map(async (feedback: feedback) => {
                            const profilePicData = await getProfilePicturebyId(feedback.user);
                            const profilePic = profilePicData.data.profilePic || profilePicData.data ;
                            return (
                                <div className="bg-white w-[55vw] rounded-lg mt-4 flex flex-row p-[25px] items-center" key={feedback._id}>
                                    <Image src={profilePic} alt="Profile" className="w-12 h-12 rounded-full" width={0} height={0} draggable={false} />
                                    <div className="text-left ml-6">
                                        <div className="text-lg text-black font-semibold">{feedback.username}</div>
                                        <Star stars={feedback.rating} fontsize="sm"/>
                                        <div className="text-bas text-wrap break-all">
                                            {feedback.comment}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
