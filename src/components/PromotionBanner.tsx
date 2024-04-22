import Image from "next/image";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Link from "next/link";

export default function PromotionBanner({ promotion }: { promotion: string }) {

  const mockId = [
    { picture:`/promotions/0.jpg`,id:"66251f14c9c59cdaa789d8d8" },
    { picture:`/promotions/1.jpg`,id:"66251faac9c59cdaa789d8df" },
    { picture:`/promotions/2.jpg`,id:"66252030c9c59cdaa789d8e4" }
  ];

  const foundPromotion = mockId.find(item => item.picture === `/promotions/${promotion}.jpg`);
  const promotionId = foundPromotion?.id || ''; 

  return (
    <div className="flex items-center justify-center">
      <Image
        src={`/promotions/${promotion}.jpg`}
        alt={promotion}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[400px] w-auto p-12"
      />
      <div className="bg-[#fb7dc0] text-white text-nowrap py-2 px-8 rounded-lg absolute mt-[200px]">
        <SavedSearchIcon />
        <Link href={`/promotion/${promotionId}`} prefetch={true} className="ml-2">
          Check Out
        </Link>
      </div>
    </div>
  );
}

