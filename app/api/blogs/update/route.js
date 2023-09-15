
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
import Blogs from "@models/blogs";

export const PATCH = async (request, {params}) => {
    const {id,userId,subject,title,article,tags} = await request.json();
    try {
        
        await connectToDB();

        const userData = await Blogs.findById({
            _id : id
        });
        userData.subject = subject;
        userData.title = title;
        userData.article = article;
        userData.tags = tags;

        await userData.save();

        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Blogs", { status: 500 })
    }
} 