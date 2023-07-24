
import { connectToDB } from "@utils/database";
import Category from "@models/category";

export const GET = async (request) => {
    try {
        await connectToDB()

        const category = await Category.find({})
        return new Response(JSON.stringify(category), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Category", { status: 500 })
    }
} 