import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import querystring from 'querystring';
import AITool from "@models/aitool";

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

        const aitool = await AITool.find({status: status})
        .skip((page - 1) * pageSize)
        .limit(pageSize);
        // .populate('creator');
        if(!aitool) return new Response("Prompt not found", {status : 404})
        //console.log(prompts)
        return new Response(JSON.stringify(aitool), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 