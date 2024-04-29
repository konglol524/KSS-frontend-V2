import Image from "next/image";
import Profile from "./Profile";
import getProfilePicture from "@/libs/getProfilePicture";
import getUserProfile from "@/libs/getUserProfile";
import dayjs from "dayjs";

export default async function UserInfo({ session }: { session: any }) {
  let pfp = await getProfilePicture(session.user.token);
  let profile = await getUserProfile(session.user.token);

  return (
    <div
      className="absolute top-[50%] left-[50%] bg-white bg-opacity-80
     text-black h-[50vh] w-[60vw] rounded-2xl transform:[translate(-50%, -50%)]
      shadow-lg backdrop-blur-sm flex flex-row justify-between p-4"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="w-[49%] h-full flex flex-col justify-center items-center">
        <Profile
          session={session}
          pfp={pfp.data.profilePic}
          point={profile.data.point}
        />
      </div>
      <Image
        src="/img/Line.png"
        alt="line"
        sizes="2vw"
        width={5}
        height={0}
        draggable={false}
      />
      <div className="w-[49%] h-full text-start px-[1.5%] py-[2%]">
        <h1 className="text-5xl mb-1.5">{profile.data.name}</h1>
        <h1 className="text-base mb-1 ml-0.5">{profile.data.email}</h1>
        <h1 className="text-xl mb-1">Tel: {profile.data.telephone}</h1>
        <div className=" w-full border-[1px] border-zinc-400 rounded-lg mb-1"></div>
        <h1 className="text-xl mb-1">
          Points: <span data-cy="profilePoint">{profile.data.point}</span>
        </h1>
        <div className=" w-full border-[1px] border-zinc-400 rounded-lg mb-1"></div>
        <h1 className="text-xl mb-1">
          Member Since:{" "}
          {dayjs(profile.data.createdAt?.toString()).format("DD/MM/YYYY")}
        </h1>
        <div className=" w-full border-[1px] border-zinc-400 rounded-lg mb-1"></div>
      </div>
    </div>
  );
}
