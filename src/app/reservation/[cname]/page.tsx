import ReservationForm from "@/components/ReservationForm"
import getCars from "@/libs/getCars";
import getRentals from "@/libs/getRentals";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";

export default async function CarReservationPage () {
    const shops:rentals = await getRentals();
    
    const session = await getServerSession(authOptions);

    if(!session) return;
    const bookings:Bookings = await getBookings(session?.user.token);
    
    return (
        <div>
            <ReservationForm shops={shops} user={session?.user} bookingsAmount={bookings.count}/>
        </div>
    );
}

export async function generateStaticParams() {
    const cars:{[key:string]: Car} = getCars(); 

    const staticParamsArray:Array<{[cname:string]:string}> = [];

    for(let cname in cars){
        staticParamsArray.push({cname: cname});
    }

    return staticParamsArray;
}