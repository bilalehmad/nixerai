
import Blogs from "@models/blogs";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request,{params}) => {
    const {id} = params;
    try {
        await connectToDB()
        console.log(id)
        const blogs = await Blogs.findById(id).populate({ path: 'auther', model: User })

        return new Response(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Pakages", { status: 500 })
    }
} 