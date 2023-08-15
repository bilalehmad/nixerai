import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ObjectId from "mongoose";
import AIToolReaction from "@models/aitooltreaction";



export const GET = async (request) => {
    const session = await getServerSession(authOptions);

    // if(!session?.user){
    //     redirect('/')
    // }
    const userId = session?.user.id;
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);


    // Access the array of names
    const names = searchParams.get("names").split(',') || [];
    try {
        await connectToDB();
        const allReaction = await AIToolReaction.find({ creator: session?.user.id,post: { $in: names }});
        console.log(allReaction)
       
        return new Response(JSON.stringify(allReaction), {status : 201})
        
    } catch (error) {
        return new Response("Failed to create a new Reaction!", {status : 500})
    }
}