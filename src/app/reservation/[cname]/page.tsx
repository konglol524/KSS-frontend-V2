import ReservationForm from "@/components/ReservationForm"
import getCars from "@/libs/getCars";

export default function CarReservationPage () {
    return (
        <div>
            <ReservationForm/>
        </div>
    )
}

export async function generateStaticParams() {
    const cars:{[key:string]: Car} = getCars(); 

    const staticParamsArray:Array<{[cname:string]:string}> = [];

    for(let cname in cars){
        staticParamsArray.push({cname: cname});
    }

    return staticParamsArray;
}