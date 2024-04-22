// import Link from "next/link";
// import Card from "./Card";
// import { PromotionItem } from "../../interface";
// import { PromotionJson } from "../../interface";

// export default async function PromotionCatalog({ PromotionJson }: { PromotionJson: PromotionJson }) {
//     const PromotionJsonReady = await PromotionJson;

// const mockPromotionRepo = [
//     { pid: "001", image: '/cars/accord.jpg', name: "Tanza Hot Sale",description:"i like BBC" },
//     { pid: "002", image: '/cars/accord.jpg', name: "One Hit Sale",description:"i like BBC" },
//     { pid: "003", image: '/cars/accord.jpg', name: "Guadalupe Special Sale",description:"i like BBC" }
// ];

// return (
//     <div style={{
//         margin: "20px", display: "flex",
//         flexDirection: "row", alignContent: "space-around",
//         justifyContent: "space-around", flexWrap: "wrap"
//     }}>
//         {mockPromotionRepo.map((cardItem, index) => {
//             const promotionIndex = PromotionJsonReady.data.findIndex(promotionItem => promotionItem.name === cardItem.name);
            
//             if (promotionIndex !== -1) {
//                 return (
//                     <Link  href={`/hospital/${cardItem.pid}`} className="w-1/5">
//                         <Card
//                             PromotionName={PromotionJsonReady.data[promotionIndex].name}
//                             imgSrc={cardItem.image}
//                             rating={PromotionJsonReady.data[promotionIndex].ratingSum}
//                         />
//                     </Link>
//                 );
//             }
//             return null;
//         })}
//     </div>
// );

// }
