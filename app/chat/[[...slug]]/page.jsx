import React from 'react'
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ChatSidebar from '@components/chat/ChatSidebar';
import ChatBody from '@components/chat/ChatBody';

const Chat = async () => {
  const session = await getServerSession(authOptions);
  if(!session?.user){
    redirect('/')
  }

  return (
    <div className="overflow-hidden h-screen w-full relative flex">
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
          <div className="flex h-full min-h-0 flex-col ">
            <ChatSidebar />
          </div>
      </div>
      <ChatBody />
    </div>
  )}

export default Chat