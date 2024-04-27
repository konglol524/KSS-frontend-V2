interface Car {
  model: string;
  img: string;
  description:string;
  TopSpeed:string;
  Horsepower:string;
  MPH:string;
  Passengers:string;
  Type:string;
  Fuel:string
  Transmission:string;
}

interface Bookings {
  count: number;
  totalCost: number;
  data: Booking[];
}
interface Booking {
  _id: string;
  bookingDate: string;
  user: string;
  car: string;
  daySpend: number;
  rentalProvider: rentalProvider;
  discountPoint: number;
  cost: number;
  addedPoint: number;
  createdAt: string;
}
interface rentals {
  count: number,
  page: number,
  data: rentalProvider[]
}
interface rentalProvider {
  _id: string;
  picture: string;
  name: string;
  address: string;
  cost: number;
  tel: string;
}
interface PromotionItem {
  _id: string,
  name: string,
  picture: string,
  description:string,
  ratingSum:string
}

interface PromotionJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: PromotionItem[]
}

interface feedback {
  _id: string;
  user: string;
  username: string;
  promotion: string;
  comment: string;
  rating: number;
}

interface Promotion {
  name: string;
  img: string;
  description:string;
  ratingSum:number;
}

interface OperationResult {
  key: number;
  isVisible: boolean;
  props: { valid: boolean; text: string };
}

interface PromoForBooking {
  name: string;
  rentals: string;
  promoType: string;
  promoNum: number;
  ratingCount: number;
  ratingSum: number;
}

interface Promo {
  id: string;
  name: string;
  populatedPromotions: PromoForBooking[];
}