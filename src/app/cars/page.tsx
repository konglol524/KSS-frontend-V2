import CarChooser from "@/components/CarChooser";
import PromotionSlider from "@/components/PromotionSlider";

export default function Cars() {
  return (
    <div className="bg-flower bg-cover bg-center w-full h-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold py-8">Available Cars</h1>
        <CarChooser />
      </div>
    </div>
  );
}
