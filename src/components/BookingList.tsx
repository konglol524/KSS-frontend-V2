"use client";
import { MdDeleteOutline } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import { useRouter } from "next/navigation";
import BookingEditor from "./BookingEditor";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { Item } from "@radix-ui/react-select";
import getCars from "@/libs/getCars";

export default function BookingList({
  bookings,
  token,
}: {
  bookings: Bookings;
  token: string;
}) {
  const [form, setForm] = useState<Booking>({
    _id: "",
    bookingDate: "",
    user: "",
    car: "",
    daySpend: 1,
    rentalProvider: {
      _id: "",
      picture: "",
      name: "",
      address: "",
      cost: 0,
      tel: "",
    },
    createdAt: "",
    discountPoint: 0,
    cost: 0,
    addedPoint: 0,
  });

  const [editID, setEditID] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleDel(id: string) {
    try {
      await deleteBooking(token, id);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setEditID("");
    setForm({
      _id: "",
      bookingDate: "",
      user: "",
      car: "",
      daySpend: 1,
      rentalProvider: {
        _id: "",
        picture: "",
        name: "",
        address: "",
        cost: 0,
        tel: "",
      },
      createdAt: "",
      discountPoint: 0,
      cost: 0,
      addedPoint: 0,
    });
  }

  async function handleSave(id: string) {
    try {
      // console.log(form);

      await updateBooking(token, id, form);
      router.refresh();
      setEditID("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (editID !== "") {
      const b = bookings.data.find(
        (booking: Booking) => booking._id === editID
      );
      setForm(b || form);
    }
  }, [editID]);

  const Carfilename = [
    { model: "Honda Civic", img: "/cars/civic.png" },
    { model: "Honda Accord", img: "/cars/accord.png" },
    { model: "Toyota Fortuner", img: "/cars/fortuner.png" },
    { model: "Lambo Blue", img: "/cars/lambo.png" },
    { model: "Tesla Model 3", img: "/cars/tesla.png" },
  ];

  return (
    <>
      {bookings && (
        <>
          <div className="w-full flex items-start justify-start" />
          <p className="text-5xl font-[600] mt-8 mb-7 w-[79%] text-left ml-[20%] text-pink-400 underline underline-offset-8 ">
            Your Reservations
          </p>

          <div className="w-full flex flex-col items-center justify-center gap-y-5">
            {bookings.data.map((item: Booking, idx) => {
              const [imgcar] = Carfilename.filter((n) => n.model === item.car);
              return (
                <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-y-4 w-[60%] gap-x-2 py-5 border-b-4 border-b-pink-400">
                  <div className="flex items-start justify-center gap-x-5 pl-2">
                    <div>
                      <Image
                        src={imgcar.img}
                        alt="car im"
                        width={0}
                        height={0}
                        sizes="10vw"
                        className="h-[100px] w-[150px] rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-3xl font-[700]">{item.car}</div>
                      <div className="text-xl font-[300]">
                        Booking date:{" "}
                        {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                      </div>
                      <div className="flex items-center justify-center gap-x-16">
                        <div className="text-xl font-[300]">
                          Rental: {item.rentalProvider.name}
                        </div>
                        <div className="text-xl font-[300]">
                          Cost: {item.cost}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-[5vw] flex flex-col gap-y-2 pr-2">
                    {editID === item._id ? (
                      <>
                        <button
                          onClick={() => handleCancel()}
                          className="btn btn-error hover:opacity-75"
                        >
                          <TiCancel />
                        </button>
                        <button
                          onClick={() => handleSave(item._id)}
                          className="btn btn-success"
                        >
                          <FaRegSave />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDel(item._id)}
                          className="btn btn-error hover:opacity-75"
                        >
                          <MdDeleteOutline />
                        </button>
                        <button
                          onClick={() => setEditID(item._id)}
                          className="btn btn-info"
                        >
                          <FaRegEdit />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
