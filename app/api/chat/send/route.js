import { connectToDB } from "@utils/database";
import Chat from "@models/chat";
import User from "@models/user";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import { ObjectId } from "mongodb";



export const POST = async (req) => {
    const {chatID,role,content,userId} = await req.json();
    const session = await getServerSession(authOptions);
    console.log(chatID,"-------------------- Send Requerst Chat ID");
    // if(!session?.user){
    //     redirect('/')
    // }
    // const userId = session?.user.id;
    let data = {
        content,
        role
    }
    console.log(data,"------------------------------ User ID")
    try {
        await connectToDB();
        
        const chats = await Chat.findOneAndUpdate({
            _id: chatID,
            creator: userId
        },{
            $push: {
                messages: data
            }
        },{ new: true } )
        
        console.log(chats);
        return new Response(JSON.stringify(chats), {status : 201})
    
    } catch (error) {
        return new Response("Failed to create a new Prompt!", {status : 500})
    }
}