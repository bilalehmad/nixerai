

import Pakage from "@models/pakage";
import { connectToDB } from "@utils/database";
import Bundle from "@models/bundle";

export const GET = async (request,{params}) => {
    const {id} = params;
    try {
        await connectToDB()

        const pakages = await Bundle.find({_id:id})

        return new Response(JSON.stringify(pakages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 