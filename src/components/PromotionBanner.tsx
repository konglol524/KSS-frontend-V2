import Image from "next/image";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Link from "next/link";

export default function PromotionBanner({ promotion }: { promotion: string }) {
  const mockId = [
    { picture: `/promotions/0.jpg`, id: "66251f14c9c59cdaa789d8d8" },
    { picture: `/promotions/1.jpg`, id: "66251faac9c59cdaa789d8df" },
    { picture: `/promotions/2.jpg`, id: "66252030c9c59cdaa789d8e4" },
  ];

  const foundPromotion = mockId.find(
    (item) => item.picture === `/promotions/${promotion}.jpg`
  );
  const promotionId = foundPromotion?.id || "";

  return (
    <div className="flex items-center justify-center">
      <Image
        src={`/promotions/${promotion}.jpg`}
        alt={promotion}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] w-auto p-12"
      />
      <Link
        href={`/promotion/${promotionId}`}
        prefetch={true}
        className="ml-2 bg-[#fb7dc0] text-white font-bold text-nowrap py-2 px-4 rounded-lg absolute mt-[50px] sm:mt-[100px] md:mt-[180px] lg:mt-[220px] md:py-4 md:px-8 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-150"
      >
        <SavedSearchIcon />
        Check Out
      </Link>
    </div>
  );
}
