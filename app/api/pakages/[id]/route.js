

import Pakages from "@models/pakages";
import { connectToDB } from "@utils/database";


export const GET = async (request,{params}) => {
    const {id} = params;
    try {
        await connectToDB()

        const pakages = await Pakages.find({_id:id})

        return new Response(JSON.stringify(pakages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 