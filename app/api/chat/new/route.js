import { connectToDB } from "@utils/database";
import Chat from "@models/chat";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

export const POST = async (req) => {
    const {messages,userId} = await req.json();
    const title = messages[0].content;
    const session = await getServerSession(authOptions);
    const data = {
        content: messages[0].content,
        role: messages[0].role
    };
    // console.log(messages[0],"--------------------------------------new Request")
    // console.log(messages[0].content,"--------------------------------------new Request")
    // if(!session?.user){
    //     redirect('/')
    // }
    // const userId = session?.user.id;
    console.log(session,"-------------------------User ID in New")
    try {
        await connectToDB();
        const newChat = await Chat({
            creator : userId,
            title,
            messages : data
        })

        await newChat.save();
        console.log(newChat,"-------------------------------------------Responce New Chat");
        return new Response(JSON.stringify(newChat), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Prompt!", {status : 500})
    }
}