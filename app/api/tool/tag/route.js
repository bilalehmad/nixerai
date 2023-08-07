import { connectToDB } from "@utils/database";
import querystring from 'querystring';
import AITool from "@models/aitool";

//GET (read)
export const GET = async (request) => {
    
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const q = searchParams.get('q');
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    console.log(q);
    try {
        await connectToDB()

        const aitool = await AITool.find(
            { $or: [
                { tag: { $regex: q, $options: 'i' } }
              ] }
        )
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('creator');
        if(!aitool) return new Response("Prompt not found", {status : 404})
        return new Response(JSON.stringify(aitool), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 