import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import querystring from 'querystring';

//GET (read)
export const GET = async (request) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);

    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    const status = searchParams.get("status")||[];
    // console.log(page)

    try {
        await connectToDB()

        const prompts = await Prompt.find({accessLevel: status})
        .skip((page - 1) * pageSize)
        .limit(pageSize);
        
        // .populate('creator');
        if(!prompts) return new Response("Prompt not found", {status : 404})
        //console.log(prompts)
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 