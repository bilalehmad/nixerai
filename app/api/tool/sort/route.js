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
    console.log(status)

    try {
        await connectToDB()

        if(status === "Verified")
        {   
            const aitool = await AITool.find({confirmation: "Approved"})
            .skip((page - 1) * pageSize)
            .limit(pageSize);

            // .populate('creator');
            if(!aitool) return new Response("Prompt not found", {status : 404})
            console.log(aitool)
            return new Response(JSON.stringify(aitool), { status: 200 })
        }
        if(status === "New")
        {
            const today = new Date();
            today.setHours(23, 59, 59, 999); // Setting to the end of the day

            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            tenDaysAgo.setHours(0, 0, 0, 0);

            console.log(tenDaysAgo)
            const aitool = await AITool.find({ timestamps: { $gte: tenDaysAgo ,$lte: today} })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

            // .populate('creator');
            if(!aitool) return new Response("Prompt not found", {status : 404})
            console.log(aitool)
            return new Response(JSON.stringify(aitool), { status: 200 })
        }
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 