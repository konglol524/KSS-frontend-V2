import UserInfo from '@/components/UserInfo';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';


export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) return;


  return (
    <main className="bg-white">
          <div className="w-[100vw] h-[70vh] relative">
          <Image src="/img/sakuraMoutain.jpeg" 
              alt="background Image" 
              sizes="100vw" 
              layout="fill" 
              objectFit="cover"
              draggable={false}
              ></Image>   
         <UserInfo session={session}/>

      </div>


            
    </main>
  );
}
