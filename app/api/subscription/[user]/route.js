import { connectToDB } from "@utils/database";
import Subscription from "@models/subscription";

//GET (read)
export const GET = async (request, {params}) => {
    const {user} = params;
    try {
        await connectToDB()
        const subscription = await Subscription.find({user: user});
        if(!subscription) return new Response("Subscription not found", {status : 404})
        return new Response(JSON.stringify(subscription), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Subscription", { status: 500 })
    }
} 
