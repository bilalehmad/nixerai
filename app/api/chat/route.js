import { connectToDB } from "@utils/database";
import Chat from "@models/chat";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';


export const GET = async (req) => {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect('/')
    }
    const userId = session?.user.id;
    //console.log(userId)
    try {
        await connectToDB();

        const chats = await Chat.find({ creator: userId},{
            projection : {
                creator: 0,
                messages: 0
            }
            }).sort({
                _id: -1
            });
            //console.log(chats)
        return new Response(JSON.stringify(chats), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Prompt!", {status : 500})
    }
}