import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopSelect({
  shops,
  onShopChange,
}: {
  shops: rentals;
  onShopChange: Function;
}) {
  return (
    <Select onValueChange={(value) => onShopChange(value)}>
      <SelectTrigger className="w-full border-2 border-pink-400">
        <SelectValue placeholder="Select Provider" />
      </SelectTrigger>
      <SelectContent>
        {shops.data.map((shop: rentalProvider) => (
          <SelectItem key={shop._id} value={shop._id}>
            {shop.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
