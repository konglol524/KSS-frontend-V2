import Image from "next/image";

export default function CarCard({ car }: { car: string }) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-y-4">
      <Image
        src={`/cars/${car}.jpg`}
        alt={car}
        width={0}
        height={0}
        sizes="100vw"
        className="h-72 w-auto rounded-lg"
      />
      <h1 className="text-center font-semibold text-3xl">{car}</h1>
      <button className="text-white text-center text-xl py-4 px-16 bg-[#FA4EAB] bg-opacity-60 rounded-md">
        Select
      </button>
    </div>
  );
}
