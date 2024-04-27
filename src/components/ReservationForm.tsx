"use client";
import getCars from "@/libs/getCars";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";
import ShopSelect from "./ShopSelect";
import getUserProfile from "@/libs/getUserProfile";
import addBooking from "@/libs/addBooking";

export default function ReservationForm({
  shops,
  user,
  bookingsAmount,
}: {
  shops: rentals;
  user: any;
  bookingsAmount: number;
}) {
  const router = useRouter();
  const params = useParams<{ cname: string }>();

  const cars: { [key: string]: Car } = getCars();

  const selectedCar: Car | null =
    cars[decodeURIComponent(params.cname)] || null;
  const names = selectedCar.model.split(" ");
  const firstname = names[0];
  names.splice(0, 1);
  const lastname = names.join(" ");

  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [daySpend, setDaySpend] = useState<number>(1);
  const [selectedShop, setSelectedShop] = useState<string>("None");
  const [discount, setDiscount] = useState<number>(0);
  const [newUser, setNewUser] = useState<any>(user);

  const currentCostPerDay =
    shops.data.find((rental: rentalProvider) => rental._id === selectedShop)
      ?.cost || 0;

  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;

    if (!selectedCar) {
      redirectTimeout = setTimeout(() => {
        router.push("/cars");
      }, 2000);
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  const maxDiscount = Math.ceil(
    Math.min(newUser.data.point, (currentCostPerDay * daySpend) / 10)
  );

  const clearData = () => {
    setBookDate(null);
    setDaySpend(1);
    setSelectedShop("None");
    setDiscount(0);
  };

  const submitReservation = async () => {
    if (newUser.data.role !== "admin" && bookingsAmount >= 3) {
      handleSubmitResponse({
        success: false,
        text: "Maximum 3 bookings per user",
      });
      console.log("Maximum 3 bookings per user");
    } else if (
      bookDate != null &&
      selectedCar.model != "" &&
      selectedShop != "" &&
      selectedCar.model != "None" &&
      selectedShop != "None" &&
      daySpend > 0
    ) {
      const estimatedCost = currentCostPerDay * daySpend - discount * 10;

      console.log(`${bookDate} ${selectedCar} ${selectedShop} ${daySpend}`);

      console.log("ADDING BOOKING");

      const responseData = await addBooking(selectedShop, user.token, {
        bookingDate: bookDate,
        user: user.data._id,
        car: selectedCar.model,
        daySpend: daySpend,
        rentalProvider: selectedShop,
        discountPoint: discount,
        addedPoint:
          discount > 0 ? 0 : Math.floor((currentCostPerDay * daySpend) / 100),
        cost: estimatedCost,
      });

      handleSubmitResponse({
        ...responseData,
        text: "Created reservation successfully",
      });

      try {
        const updatedUser = await getUserProfile(user.token);
        setNewUser(updatedUser);
        console.log(updatedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }

      setTimeout(() => {
        handleSubmitResponse({
          success: true,
          text: `You received ${
            discount > 0
              ? "0 point"
              : Math.floor((currentCostPerDay * daySpend) / 100) + " points"
          }`,
        });
      }, 3000);
    } else {
      handleSubmitResponse({
        success: false,
        text: "Failed to create reservation",
      });
    }
  };

  const [responseChildren, setResponseChildren] = useState<
    Array<{
      key: number;
      isVisible: boolean;
      props: { valid: boolean; text: string };
    }>
  >([]);

  const handleSubmitResponse = (responseData: any) => {
    let result,
      key = responseChildren.length;

    if (responseData.success == true) {
      result = {
        key: key,
        isVisible: false,
        props: { valid: true, text: responseData.text },
      };
    } else {
      result = {
        key: key,
        isVisible: false,
        props: { valid: false, text: responseData.text },
      };
    }

    setResponseChildren([...responseChildren, result]);

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.map((obj) => {
          if (obj.key == key) {
            return { ...obj, isVisible: true };
          } else return obj;
        });
      });
    }, 500);

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.map((obj) => {
          if (obj.key == key) {
            return { ...obj, isVisible: false };
          } else return obj;
        });
      });
    }, 2000);

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.filter((obj) => obj.key !== key);
      });

      router.refresh();
    }, 3000);
  };

  return (
    <>
      {selectedCar ? (
        <div className="grid grid-cols-2 gap-x-4 p-4">
          <div className="flex justify-center items-center">
            <Image
              className="w-full rounded-xl"
              src={selectedCar.img}
              alt={selectedCar.model}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col bg-[#FFF2F9] overflow-y-scroll max-h-[90vh] w-full rounded-2xl p-4 px-6 gap-y-6">
            {/* name + 3icon */}
            <div className="flex gap-x-2">
              <div className=" flex flex-col mt-2 items-start w-[30%]">
                <p className="font-sans text-5xl text-black text-left font-extrabold pt-2">
                  {firstname}{" "}
                </p>
                <p className="font-sans text-3xl text-black text-left font-medium pl-1">
                  {lastname}{" "}
                </p>
              </div>
              <div className="flex justify-between w-[70%] mx-16">
                <div className="flex flex-col items-center mt-2  w-[30%] h-full pt-5">
                  <div className="w-auto">
                    <Image
                      src={"/bookingIcon/miter.png"}
                      alt={"miter"}
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="font-sans text-sm font-semibold ">
                    {selectedCar.TopSpeed}
                  </p>
                  <p className="font-sans text-xs font-medium">Top Speed</p>
                </div>
                <div className="flex flex-col items-center mt-2 w-[30%] h-full pt-4">
                  <div className="w-auto">
                    <Image
                      src={"/bookingIcon/housepower.png"}
                      alt={"housepower"}
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="font-sans text-sm font-semibold">
                    {selectedCar.Horsepower}
                  </p>
                  <p className="font-sans text-xs font-medium">Horsepower</p>
                </div>
                <div className="flex flex-col items-center mt-2  w-[30%] h-full pt-5">
                  <div className="w-auto">
                    <Image
                      src={"/bookingIcon/road.png"}
                      alt={"road"}
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="font-sans text-sm font-semibold">
                    {selectedCar.MPH}
                  </p>
                  <p className="font-sans text-xs font-medium">0-60MPH</p>
                </div>
              </div>
            </div>
            {/* detail */}
            <div className="grid grid-cols-3 w-full justify-start gap-2">
              <div className="rounded-md bg-white pl-2 flex flex-col justify-center py-3">
                <div className="flex">
                  <Image
                    src={"/bookingIcon/user.png"}
                    alt={"road"}
                    width={20}
                    height={16}
                  />
                  <label className="font-sans text-xs mt-1 ml-2" htmlFor="m1">
                    Passengers
                  </label>
                </div>
                <p className="flex font-sans font-semibold text-xs mt-1">
                  {selectedCar.Passengers}
                </p>
              </div>
              <div className="rounded-md bg-white pl-2 flex flex-col justify-center py-3">
                <div className="flex">
                  <Image
                    src={"/bookingIcon/caricon.png"}
                    alt={"road"}
                    width={20}
                    height={16}
                  />
                  <label className="font-sans text-xs mt-1 ml-2" htmlFor="m1">
                    Type
                  </label>
                </div>
                <p className="flex font-sans font-semibold text-xs mt-1">
                  {selectedCar.Type}
                </p>
              </div>
              <div className="rounded-md bg-white pl-2 flex flex-col justify-center py-3">
                <div className="flex">
                  <Image
                    src={"/bookingIcon/gas.png"}
                    alt={"road"}
                    width={20}
                    height={16}
                  />
                  <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">
                    Fuel
                  </label>
                </div>
                <p className="flex font-sans font-semibold text-xs mt-1">
                  {selectedCar.Fuel}
                </p>
              </div>
              <div className="rounded-md bg-white pl-2 flex flex-col justify-center py-3">
                <div className="flex">
                  <Image
                    src={"/bookingIcon/gear.png"}
                    alt={"road"}
                    width={21}
                    height={17}
                  />
                  <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">
                    Type
                  </label>
                </div>
                <p className="flex font-sans font-semibold text-xs mt-1">
                  {selectedCar.Transmission}
                </p>
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-md bg-[#fdfdfb] gap-y-2 ">
              <div className="flex flex-col gap-y-2">
                <label
                  className="font-semibold text-xs font-sans text-[#FA4EAB] text-left w-full"
                  htmlFor="input1"
                >
                  Date
                </label>
                <div className="border-[#FA4EAB] rounded border-2">
                  <DateReserve
                    day={bookDate}
                    onDateChange={(value: Dayjs) => setBookDate(value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  className="font-semibold text-xs font-sans text-[#FA4EAB] text-left"
                  htmlFor="input1"
                >
                  Duration
                </label>
                <input
                  min={1}
                  value={daySpend}
                  type="number"
                  className="border-[#FA4EAB] border-2 text-center bg-white rounded text-black py-4"
                  onChange={(e) => setDaySpend(parseInt(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  className="font-semibold text-xs font-sans text-[#FA4EAB] text-left"
                  htmlFor="input1"
                >
                  Rental Provider
                </label>
                <div className="border-[#FA4EAB] rounded border-2">
                  <ShopSelect
                    value={selectedShop}
                    shops={shops}
                    onShopChange={(value: string) => setSelectedShop(value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  className="font-semibold text-xs font-sans text-[#FA4EAB] text-left"
                  htmlFor="input1"
                >
                  Point Usage
                </label>
                <input
                  value={discount}
                  min={0}
                  max={maxDiscount}
                  type="number"
                  id="discount"
                  className="border-[#FA4EAB] border-2 text-center bg-white rounded text-black py-4"
                  onChange={(e) => {
                    if (+e.target.value < 0 || +e.target.value > maxDiscount)
                      // if (+e.target.value < 0 || +e.target.value > 10)
                      return;
                    setDiscount(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="font-sans text-3xl text-[#FA4EAB]">{`$${currentCostPerDay}`}</p>
                  <p className="font-sans text-3xl">/day</p>
                </div>
                <p>{daySpend} Days</p>
              </div>
              <div className="border-2 border-pink-400 w-full rounded-xl"></div>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                  <p className="font-sans text-2xl text-[#060606]">Total</p>
                  <div className="flex items-center gap-x-2">
                    <span
                      className={`text-xl ${
                        discount > 0 ? "line-through" : ""
                      } text-gray-500`}
                    >
                      $ {(currentCostPerDay * daySpend).toLocaleString()}
                    </span>
                    {discount > 0 && (
                      <span className="text-[#FA4EAB] text-xl font-bold">
                        $
                        {Math.max(
                          0,
                          currentCostPerDay * daySpend - discount * 10
                        ).toLocaleString() + " "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-2">
                <li className="font-sans text-left text-sm text-[#FA4EAB]">
                  using {discount} points discount
                </li>
                <li className="font-sans text-left text-sm text-[#FA4EAB]">
                  Promotion discount
                </li>
              </div>
              <div className="flex flex-row w-full justify-between">
                <span className="font-sans text-xl justify-self-auto pl-0  text-[#060606]">
                  Point&nbsp;Earn
                </span>
                <span className="text-[#FA4EAB] font-bold text-xl">
                  {` ${
                    discount > 0
                      ? 0
                      : Math.floor((currentCostPerDay * daySpend) / 100)
                  } `}
                  {discount > 0 ? "point" : "points"}
                </span>
              </div>
              <div className="flex flex-col px-2">
                <p className="font-sans text-sm text-left text-[#FA4EAB]">
                  <span className="font-bold text-pink-500 text-xl">*</span>
                  Points are calculated based on the original cost divided by
                  100.
                </p>
                <p className=" font-sans text-left text-sm text-[#FA4EAB]">
                  <span className="font-bold text-pink-500 text-xl">*</span>You
                  cannot earn any points when you use points to discount.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-around mb-4">
              <button
                onClick={clearData}
                className=" bg-white text-black rounded-lg shadow-xl py-2 px-4 font-sans text-3xl"
              >
                Cancel
              </button>
              <button
                onClick={submitReservation}
                className="bg-[#FA4EAB] rounded-lg shadow-xl py-2 px-4 font-sans text-3xl text-white"
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100vw] h-[100vh] fixed text-3xl top-1/2 font-bold">
          Error: Car Not Found (Redirecting...)
        </div>
      )}
    </>
  );
}
