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
    //console.log(reaction)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
        await connectToDB();
        const user = await PromptReaction.findOne({ creator: userId,post:post });
        if (user) {
            //console.log('Found user:', user);
            if(user.reaction == reaction)
            {
                const delt = await PromptReaction.findOneAndDelete({ _id: user._id, reaction: reaction });
                //console.log('Delete user:', delt);
                return new Response(JSON.stringify(user), {status : 201})

            }
            else
            {
                //console.log('User updated.');
                const newReaction = await PromptReaction.findOneAndUpdate({
                    _id: user._id
                },{
                    $set: {
                        reaction: reaction
                    }
                },{ new: true } )
                return new Response(JSON.stringify(newReaction), {status : 201})
            }
            
        } else {
            //console.log('User not found.');
            const newReaction = new PromptReaction({
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