'use client'
import getCars from "@/libs/getCars";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";
import ShopSelect from "./ShopSelect";
import getUserProfile from "@/libs/getUserProfile";
import addBooking from "@/libs/addBooking";

export default  function ReservationForm({shops, user, bookingsAmount}:{shops:rentals, user:any , bookingsAmount:number,}) {
    const router = useRouter();
    const params = useParams<{cname: string}>();
    
    const cars:{[key:string]: Car} = getCars();
    
    const selectedCar:Car|null = cars[decodeURIComponent(params.cname)] || null;
    const names = selectedCar.model.split(" ");
    const firstname = names[0];
    names.splice(0, 1);
    const lastname = names.join(" ");

    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [daySpend, setDaySpend] = useState<number>(1);
    const [selectedShop, setSelectedShop] = useState<string>("None");
    const [discount, setDiscount] = useState<number>(0);
    const [newUser, setNewUser] = useState<any>(user);
    const [isLoading, setIsLoading] = useState<boolean>(true);  

    const currentCostPerDay =
    shops.data.find((rental: rentalProvider) => rental._id === selectedShop)
      ?.cost || 0;

    useEffect(()=>{
        let redirectTimeout:NodeJS.Timeout;

        if (!selectedCar) {
            redirectTimeout = setTimeout(()=>{
                router.push('/cars');
            }, 2000)
        }

        return () => {
            clearTimeout(redirectTimeout);
        }
    }, [])

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //       try {
    //         const updatedUser = await getUserProfile(user.token); 
    //         setNewUser(updatedUser);
    //         setIsLoading(!isLoading);
    //       } catch (error) {
    //         console.error("Error fetching user profile:", error);
    //       }
    //     };
    
    //     fetchUserProfile();
    //   }, [isLoading]);

      const maxDiscount = Math.ceil(Math.min(
        newUser.data.point, 
        (currentCostPerDay * daySpend) / 10
      )) ;

      const clearData = ()=>{
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
            addedPoint: discount > 0 ? 0 : Math.floor((currentCostPerDay * daySpend) / 100),
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
              text: `You received ${discount > 0 ? "0 point" : Math.floor(
                (currentCostPerDay * daySpend) / 100
              ) + " points"}`,
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
            {
                selectedCar ?
                <div className="grid grid-cols-2">
                    <div className="flex justify-center items-start h-[143vh]">
                        <Image className="object-contain bg-no-repeat mt-[100px]" 
                        src={selectedCar.img} alt={selectedCar.model} width={600} height={600}/>  
                    </div>
                    <div className="flex items-center">
                        <div className="bg-[#FFF2F9] w-[80%] h-[95%] mt-0 rounded-[30px] grid grid-cols-6  grid-rows-6  pl-2 pr-1">
                            {/* name + 3icon */}
                            <div className="  mt-7 mb-4 flex gap-y-2 col-span-6 row-span-1">
                                <div className=" flex flex-col mt-2 items-start w-[30%]">
                                    <p className="font-sans text-5xl text-black text-left font-extrabold pl-3 pt-2 overflow-hidden">{firstname} </p>
                                    <p className="font-sans text-3xl text-black text-left font-medium pl-3 overflow-hidden">{lastname} </p>
                                </div>
                                <div className=" flex pb-4 gap-y-2 justify-between  w-[70%]  ml-16 mr-10 mt-0 mb-4 pl-2 pr-2">
                                    <div className="flex flex-col items-center mt-2  w-[30%] h-full pt-5">
                                        <div className="w-auto">
                                            <Image src={'/bookingIcon/miter.png'} alt={'miter'} width={25} height={25}/>
                                        </div>
                                        <p className="font-sans text-sm font-semibold ">
                                            {selectedCar.TopSpeed}
                                        </p>
                                        <p className="font-sans text-xs font-medium">
                                            Top Speed
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2 w-[30%] h-full pt-4">
                                        <div className="w-auto">
                                            <Image src={'/bookingIcon/housepower.png'} alt={'housepower'} width={24} height={24}/>
                                        </div>
                                        <p className="font-sans text-sm font-semibold">
                                            {selectedCar.Horsepower}
                                        </p>
                                        <p className="font-sans text-xs font-medium">
                                            Horsepower
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2  w-[30%] h-full pt-5">
                                        <div className="w-auto">
                                            <Image src={'/bookingIcon/road.png'} alt={'road'} width={25} height={25}/>
                                        </div>
                                        <p className="font-sans text-sm font-semibold">
                                            {selectedCar.MPH}
                                        </p>
                                        <p className="font-sans text-xs font-medium">
                                            0-60MPH
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className=" bg-white col-span-6 ml-4 mr-4 mt-5 row-span-2">
                            
                            
                            </div> */}
                             {/* detail */}
                             <div className="flex flex-row flex-wrap w-full justify-start gap-2 col-span-6  pl-2 row-span-1">
                                <div className=" w-[30%] h-[50%] rounded-md bg-white pl-2 ">
                                    <div className="flex mt-5 flex-row">
                                        <Image src={'/bookingIcon/user.png'} alt={'road'} width={20} height={16}/>
                                        <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">Passengers</label>
                                    </div>
                                    <p className="flex font-sans font-semibold text-xs mt-1">
                                        {selectedCar.Passengers}
                                    </p>
                                </div>
                                <div className=" bg-white w-[30%] rounded-md h-[50%] pl-2 ">
                                        <div className="flex mt-5 flex-row bg-white">
                                            <Image src={'/bookingIcon/caricon.png'} alt={'road'} width={20} height={16}/>
                                            <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">Type</label>
                                        </div>
                                        <p className="flex font-sans font-semibold text-xs mt-1">
                                            {selectedCar.Type}
                                        </p>
                                    </div>
                                <div className="bg-white w-[30%] rounded-md h-[50%] pl-2 ">
                                        <div className="flex mt-5 flex-row bg-white">
                                            <Image src={'/bookingIcon/gas.png'} alt={'road'} width={20} height={16}/>
                                            <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">Fuel</label>
                                        </div>
                                        <p className="flex font-sans font-semibold text-xs mt-1">
                                            {selectedCar.Fuel}
                                        </p>
                                </div>
                                <div className=" bg-white w-[30%] rounded-md h-[50%] pl-2 ">
                                        <div className="flex mt-5 flex-row bg-white">
                                            <Image src={'/bookingIcon/gear.png'} alt={'road'} width={21} height={17}/>
                                            <label className="font-sans  text-xs mt-1 ml-2" htmlFor="m1">Type</label>
                                        </div>
                                        <p className="flex font-sans font-semibold text-xs mt-1">
                                            {selectedCar.Transmission}
                                        </p>
                                </div>
                                
                            </div>
                                    
                                
                                {/* -mb-6 */}
                                <div className="flex flex-col  ml-2 mr-10 p-3 pb-4 rounded-md bg-[#fdfdfb] mt-6  col-span-6  gap-y-2  row-span-2">
                                    <div className=" flex flex-col items items-center h-[20%] gap-y-1 mb-3">
                                        <label className="font-semibold text-xs font-sans text-[#FA4EAB] pt-1 h-4 text-left w-full" htmlFor="input1">Date</label>
                                        <div className="w-full h-full border-[#FA4EAB] rounded border-2">
                                            <DateReserve day={bookDate} onDateChange={(value: Dayjs) => setBookDate(value)}/>
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col pl-0 h-[25%]">
                                        <label className="font-semibold text-xs font-sans text-[#FA4EAB] pt-1 h-4 text-left" htmlFor="input1">Duration</label>
                                        <input
                                            min={1}
                                            value={daySpend}
                                            type="number"
                                            className="border-[#FA4EAB] border-2 w-[100%]  text-center bg-white  rounded h-[3.5em] mt-2  text-black"
                                            onChange={(e) => setDaySpend(parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="flex flex-col pl-0 gap-1  h-[25%]">
                                        <label className="font-semibold text-xs font-sans text-[#FA4EAB] pt-1 h-4 text-left" htmlFor="input1">Rental Provider</label>
                                        <div className="w-full h-full border-[#FA4EAB] rounded border-2">
                                            <ShopSelect value={selectedShop} shops={shops} onShopChange={(value: string) => setSelectedShop(value)} />
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col pl-0  h-[25%]">
                                        <label className="font-semibold text-xs font-sans text-[#FA4EAB] pt-1 h-4 text-left" htmlFor="input1">Point Usage</label>
                                        <input
                                            value={discount}
                                            min={0}
                                             max={maxDiscount}
                                            type="number"
                                            id="discount"
                                            className="border-[#FA4EAB] border-2 w-[100%] text-center bg-white rounded  h-[3em] mt-2 text-black "
                                            onChange={(e) => {
                                                if (+e.target.value < 0 || +e.target.value > maxDiscount)
                                                    // if (+e.target.value < 0 || +e.target.value > 10)
                                                return;
                                                setDiscount(parseInt(e.target.value));
                                            }}
                                        />
                                    </div>
                                
                                
                            </div>
                            <div className=" col-span-6 mt-3 row-span-2">
                                <div className=" h-14 mt-5 ml-1 text-center w-full relative items-start flex justify-start border-transparent border-b-[#FA4EAB] border-2 flex-wrap">
                                       
                                        <p className="font-sans text-3xl text-[#FA4EAB]">{`$${currentCostPerDay}`}</p>
                                     
                                        <p className="font-sans text-3xl">/day</p>
                                        <div className=" flex flex-row absolute right-20">
                                            <p className="pt-2  pr-2">{daySpend}</p>
                                            <p className="pt-2  pr-2">&nbsp;day</p>
                                        </div>
                                               
                                </div>
                                <div className=" mt-5 h-28 relative">
                                        <div className="flex flex-row justify-between">
                                            <p className="font-sans text-2xl pl-0 mt- text-[#060606]">Total</p>
                                                    <div className="text-xl text-center w-full items-center flex justify-end mr-20 rounded-md h-[1.75em]">
                                                            <span
                                                                className={`${
                                                                discount > 0 ? "line-through" : ""
                                                                } text-gray-500 mr-2`}
                                                            >
                                                               $ {(currentCostPerDay * daySpend).toLocaleString()}
                                                            </span>
                                                            {discount > 0 && (
                                                                <span className="text-[#FA4EAB] font-bold">
                                                                {Math.max(0,(
                                                                    currentCostPerDay * daySpend -
                                                                    discount * 10
                                                                )).toLocaleString() + " "}
                                                                Baht
                                                                </span>
                                                            )}
                                                    </div>
                                        </div>
                                            <div className="flex flex-col absolute mt-5 left-3">
                                               
                                                <li className="font-sans text-left text-sm text-[#FA4EAB]">using 10 points discount</li>
                                                <li className="font-sans text-left text-sm text-[#FA4EAB]">Promotion discount</li>
                                                
                                            </div>
                                                
                                </div>
                                    <div className=" relative mt-0 h-28 ">
                                        <div className="flex flex-row justify-between">
                                            <span className="font-sans text-xl justify-self-auto pl-0  text-[#060606]">Point&nbsp;Earn</span>
                                                    <div className="text-xl text-center w-full items-start flex justify-end mr-20 rounded-md h-[1.75em]">
                                                        
                                                        <span className="text-[#FA4EAB] font-bold">
                                                        {` ${discount > 0 ? 0 : Math.floor((currentCostPerDay * daySpend) / 100)} `}
                                                        {discount > 0 ? "point":"points"}
                                                        </span>
                                                        
                                                    </div>
                                        </div>
                                            <div className="flex flex-col absolute mt-5  left-3">
                                                <p className="font-sans text-sm text-left text-[#FA4EAB]">*Points are calculated based on the original cost divided by 100.</p>
                                                <p className=" font-sans text-left text-sm text-[#FA4EAB]">*You cannot earn any points when you use points to discount.</p>
                                            </div>
                                               
                                    </div>
                                
                            </div>
                            
                            <div className="flex flex-row justify-around   col-span-6 mt-0 pt-0 h-28">
                                <button onClick={clearData} className=" bg-white text-black rounded-lg shadow-xl w-[25%] h-[50%] font-sans text-3xl">Cancel</button>
                                <button onClick={submitReservation} className="bg-[#FA4EAB] rounded-lg shadow-xl w-[25%] h-[50%] font-sans text-3xl text-white" >Rent</button>
                            </div>
                            {/* <div className=" bg-[#10e917] col-span-2 col-start-2 ">
                                <button className="font-sans text-xl">Cancel</button>
                            </div>
                            <div className=" bg-[#10e917] col-span-2 col-start-4 ">
                                <button className="font-sans text-xl" >Rent</button>
                            </div> */}
                        </div>
                    </div>
                </div>
                :
                <div className="w-[100vw] h-[100vh] fixed text-3xl top-1/2 font-bold">
                    Error: Car Not Found (Redirecting...)
                </div>
            }
        </>
    )
}