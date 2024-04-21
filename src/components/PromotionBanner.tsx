import Image from "next/image";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Link from "next/link";

export default function PromotionBanner({ promotion }: { promotion: string }) {
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
        <Link href={"#promotions"} prefetch={true} className="ml-2">
          Check Out
        </Link>
      </div>
    </div>
  );
}
