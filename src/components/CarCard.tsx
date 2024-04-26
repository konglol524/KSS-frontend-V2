import getCars from "@/libs/getCars";
import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car, carkey }: { car: Car, carkey: string }) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-y-4">
      <Image
        src={car.img}
        alt={car.model}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[200px] sm:h-[250px] md:h-[300px] w-auto rounded-lg"
      />
      <h1 className="text-center font-semibold text-3xl">{car.model}</h1>
      <Link href={`/reservation/${carkey}`}>
        <button className="text-white text-center text-xl py-4 px-16 bg-[#FA4EAB] bg-opacity-60 rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-80 duration-150">
          Select
        </button>
      </Link>
    </div>
  );
}
