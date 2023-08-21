'use client';

import { useSession} from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";

const ChatButton = () => {
  const {data: session} = useSession();
  const router = useRouter();
const MoveToChat = () => {
  if (session?.user) {
    router.replace('/chat');
  }
  else
  {
    alert("Login Please")
  }
}
  
  return (
    <div  className="relative top-24 md:top-28 left-44 md:left-64">
          <button onClick={MoveToChat} href='/chat' className="flex w-[120px] justify-center items-center rounded-xl border-2 border-gray-600 p-1 text-xs font-bold hover:bg-[#2B3A55] hover:text-white dark:fill-white hover:fill-white" >
            
            <span className="relative px-1 py-0.5 cursor-pointer ">
           <svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M40 4H8C5.79 4 4.02 5.79 4.02 8L4 44l8-8h28c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM12 18h24v4H12v-4zm16 10H12v-4h16v4zm8-12H12v-4h24v4z"/><path d="M0 0h48v48H0z" fill="none"/></svg>            
           </span>
           <span>Start Chat!</span>
           </button>
      </div>
  )
}

export default ChatButton