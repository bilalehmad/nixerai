import { connectToDB } from "@utils/database";
import Bundle from "@models/bundle";

export const POST = async (req) => {
    const {
        title,
        detail,
        discription,
        duration,
        highlight,
        amount} = await req.json();

        console.log(
            title,
            detail,
            duration,
            discription,
            highlight,
            amount)
    try {
        const arr = discription.split('.').map(item => item.trim());
        console.log(arr)
        await connectToDB()

        const pakages = await Bundle({
            title,
            detail,
            duration,
            highlight,
            discription: arr,
            amount
        })
        await pakages.save();

        return new Response(JSON.stringify(pakages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 