
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()
        
        const userData = await User.findById({
            _id : params.id
        })
        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all User", { status: 500 })
    }
} 