import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import querystring from 'querystring';

//GET (read)
export const GET = async (request) => {
    
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const q = searchParams.get('q');
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    console.log(q)
    try {
        await connectToDB()

        const prompts = await Prompt.find(
            { $or: [
                { title: { $regex: q, $options: 'i' } },
                { teasor: { $regex: q, $options: 'i' } },
                { tag: { $regex: q, $options: 'i' } }
              ] }
        )
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('creator');
        if(!prompts) return new Response("Prompt not found", {status : 404})
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 