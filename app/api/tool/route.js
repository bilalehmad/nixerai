
import { connectToDB } from "@utils/database";
import Prompt from "@models/aitool";

export const GET = async (request) => {
    try {
        await connectToDB()

        const aitool = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(aitool), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Tool", { status: 500 })
    }
} 