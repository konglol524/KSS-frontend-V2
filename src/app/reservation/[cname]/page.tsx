import ReservationForm from "@/components/ReservationForm"

export default function CarReservationPage () {
    return (
        <div>
            <ReservationForm/>
        </div>
    )
}

export async function generateStaticParams() {
    return [{cname: '001'}, {cname:'002'}, {cname:'003'}, {cname:'004'}]
}