import UserInfo from "@/components/UserInfo";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getBookings from "@/libs/getBookings";
import BookingList from "@/components/BookingList";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  var bookings: Bookings;
  if (!session) return;
  bookings = await getBookings(session.user.token);
  console.log(bookings);

  return (
    <main className="bg-white">
      <div className="w-full h-[70vh] relative">
        <Image
          src="/img/sakuraMoutain.jpeg"
          alt="background Image"
          sizes="100vw"
          layout="fill"
          objectFit="cover"
          draggable={false}
        ></Image>
        <UserInfo session={session} />
      </div>
      <div className="bg-[url('/img/bookingsbg.png')]">
        <BookingList bookings={bookings} token={session?.user.token} />
      </div>
    </main>
  );
}
