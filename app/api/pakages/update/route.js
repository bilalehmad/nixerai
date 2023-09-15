import { connectToDB } from "@utils/database";
import Bundle from "@models/bundle";

export const PATCH = async (req) => {
    const {
        id,
        title,
        detail,
        discription,
        duration,
        highlight,
        amount} = await req.json();

    try {
        const arr = discription.split('.').map(item => item.trim())
        console.log(arr, id)
        await connectToDB()
        
        const pakages = await Bundle.findById({_id:id})
        pakages.title = title;
        pakages.detail = detail
        pakages.discription = arr,
        pakages.amount = amount;
        pakages.duration = duration;
        pakages.highlight = highlight;
        await pakages.save();

        return new Response(JSON.stringify(pakages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 