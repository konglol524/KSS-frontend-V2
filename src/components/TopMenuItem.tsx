
import Link from 'next/link';

export default function TopMenuItem({item, pageRef, title}: {item:any, pageRef:string, title:string}) {
    return (
        <Link className="w-[12vw] sm:w-[10vw] h-full flex items-center justify-center my-auto text-center font-sans 
        rounded-lg origin-top bg-[#ff9fd4] z-0 hover:z-10 hover:bg-[#ffb0db] hover:scale-110 hover:shadow-xl 
        transition-all duration-[100ms] font-bold text-white text-md sm:text-2xl" href={pageRef} title={title}>
            {item}
        </Link>
    );
}