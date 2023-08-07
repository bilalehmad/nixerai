import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ObjectId from "mongoose";
import PromptReaction from "@models/promptreaction";




export const POST = async (req) => {

    const {post,reaction} = await req.json();
    const session = await getServerSession(authOptions);

    // if(!session?.user){
    //     redirect('/')
    // }
    const userId = session?.user.id;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today)
    try {
        await connectToDB();
        const newReaction = new PromptReaction({
            creator: userId,
            post,
            reaction,
            timestamps: today
        })

        await newReaction.save();
        console.log(newReaction)
        return new Response(JSON.stringify(newReaction), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Reaction!", {status : 500})
    }
}