import { connectToDB } from "@utils/database";
import Subscription from "@models/subscription";
import Bundle from "@models/bundle";


//GET (read)
export const GET = async (request) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const id = searchParams.get('id') || "";
    console.log(id)
    try {
        await connectToDB()
        const subscription = await Subscription.findById(id).populate({ path: 'package', model: Bundle }).populate("user");
        
        //console.log(subscription)
        if(!subscription) return new Response("Subscription not found", {status : 404})
        return new Response(JSON.stringify(subscription), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Subscription", { status: 500 })
    }
} 