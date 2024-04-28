import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getRental from "@/libs/getRental";

export default function PromotionSelect({
  shops,
  id,
  forPomoDo,
  
}: {
  shops: rentals;
  id: string;
  forPomoDo: Function;
  
}) {
  return (
    <Select onValueChange={(value) => {forPomoDo(value)}}>
      <SelectTrigger className="w-full border-2 border-pink-400">
        <SelectValue placeholder="Select Promotion" />
      </SelectTrigger>
      <SelectContent>
      {shops.data.map((shop:any) => {
         if(shop.id === id){
          console.log(shop);
           return shop.populatedPromotions.map((sho:any)=>{
                    console.log(sho.promoNum + " " + sho.promoType)
                return    <SelectItem key={sho._id} value={sho.promoNum + " " + sho.promoType}>
                          {sho.name}
                          </SelectItem>
         })
          // return 
          
         }else{
          return;
         }
          
          
})}
      </SelectContent>
    </Select>
  );
}
