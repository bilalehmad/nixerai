import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ObjectId from "mongoose";
import Wishlist from "@models/wishlist";

export const POST = async (req) => {

    const {post} = await req.json();
    const session = await getServerSession(authOptions);

    // if(!session?.user){
    //     redirect('/')
    // }
    const userId = session?.user.id;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    try {
        await connectToDB();
        const wish = await Wishlist.findOne({ user: userId,post:post });
        if (wish) {
            //console.log('Found user:', wish);
            const delt = await Wishlist.findOneAndDelete({ _id: wish._id});
                //console.log('Delete user:', delt);
                return new Response(JSON.stringify({whishlisted: false}), {status : 201})
        } else {
            //console.log('wishlist not found.');
            //console.log(post)
            const newWish = new Wishlist({
                user: userId,
                post,
            });

            await newWish.save();
            return new Response(JSON.stringify({whishlisted: true}), {status : 201})
        }
        
    } catch (error) {
        return new Response("Failed to create a new Reaction!", {status : 500})
    }
}