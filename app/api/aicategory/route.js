
import AICategory from "@models/aicategory";
import { connectToDB } from "@utils/database";


export const GET = async (request) => {
    try {
        await connectToDB()

        const category = await AICategory.find({}).sort({tag:1})
        return new Response(JSON.stringify(category), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Category", { status: 500 })
    }
} 