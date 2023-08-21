
import Bundle from "@models/bundle";
import Subscription from "@models/subscription";

import { connectToDB } from "@utils/database";


export const GET = async (request, {params}) => {
    try {
        await connectToDB()
        // const bundle = await Bundle.find({})
        // console.log(bundle)
        const subscription = await Subscription.find({}).populate("package").populate("user")
        console.log(subscription)
        return new Response(JSON.stringify(subscription), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Subscription", { status: 500 })
    }
}