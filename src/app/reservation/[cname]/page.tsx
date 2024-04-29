import ReservationForm from "@/components/ReservationForm";
import getCars from "@/libs/getCars";
import getRentals from "@/libs/getRentals";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function CarReservationPage() {
  const session = await getServerSession(authOptions);
    
  if (!session) redirect("/");

  const shops: rentals = await getRentals();

  const bookings: Bookings = await getBookings(session.user.token);

  const user = await getUserProfile(session.user.token);
  user.token = session.user.token;

  return (
    <div className="max-h-[90vh] overflow-y-hidden">
      <ReservationForm
        shops={shops}
        user={user}
        bookingsAmount={bookings.count}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const cars: { [key: string]: Car } = getCars();

  const staticParamsArray: Array<{ [cname: string]: string }> = [];

  for (let cname in cars) {
    staticParamsArray.push({ cname: cname });
  }

  return staticParamsArray;
}
