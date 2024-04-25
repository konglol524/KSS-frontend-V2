interface Car {
  model: string;
  img: string;
  description:string;
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
export interface PromotionItem {
  _id: string,
  name: string,
  picture: string,
  description:string,
  ratingSum:string
}

export interface PromotionJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: PromotionItem[]
}

export interface feedback {
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

