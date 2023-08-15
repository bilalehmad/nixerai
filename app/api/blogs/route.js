


import Blogs from "@models/blogs";
import { connectToDB } from "@utils/database";


export const GET = async (request) => {
    try {
        await connectToDB()

        const blogs = await Blogs.find({}).populate('auther')

        return new Response(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 