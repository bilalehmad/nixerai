import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ObjectId from "mongoose";
import AIToolReaction from "@models/aitooltreaction";



export const POST = async (req) => {

    const {post,reaction} = await req.json();
    const session = await getServerSession(authOptions);

    // if(!session?.user){
    //     redirect('/')
    // }
    const userId = session?.user.id;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
        await connectToDB();
        console.log(today)
        const user = await AIToolReaction.findOne({ creator: userId,post:post,reaction: reaction });
        if (user) {
            console.log('Found user:', user);
            if(user.reaction == reaction)
            {
                const delt = await AIToolReaction.findOneAndDelete({ _id: user._id, reaction: reaction });
                console.log('Delete user:', delt);
                return new Response(JSON.stringify(user), {status : 201})

            }
            else
            {
                const newReaction = AIToolReaction.findOneAndUpdate({
                    _id: user._id,
                    creator: user._id,
                    post : user.post
                },{
                    $set: {
                        reaction: reaction
                    }
                },{ new: true } )
                return new Response(JSON.stringify(newReaction), {status : 201})
            }
            
        } else {
            console.log('User not found.');
            const newReaction = new AIToolReaction({
            creator: userId,
            post,
            reaction,
            timestamps: today
        })

        await newReaction.save();
        return new Response(JSON.stringify(newReaction), {status : 201})
        }
        
    } catch (error) {
        return new Response("Failed to create a new Reaction!", {status : 500})
    }
}