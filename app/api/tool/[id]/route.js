
import { connectToDB } from "@utils/database";
import AITool from "@models/aitool";


//GET (read)
export const GET = async (request, {params}) => {
    // console.log(request)
    try {
        await connectToDB()
        const tools = await AITool.findById(params.id)
        // console.log(prompts)
        if(!tools) return new Response("Prompt not found", {status : 404})
        return new Response(JSON.stringify(tools), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {
         title,
         url,
         description,
         verified,
          status,
          tag
        } = await request.json();
    try {
        await connectToDB();
        const existingTool = await AITool.findById(params.id);
        if(!existingTool) return new Response("Prompt not found", {status : 404});

        existingTool.title = title;
        existingTool.url = url;
        existingTool.description = description;
        existingTool.verified = verified;
        existingTool.status = status;
        existingTool.tag = tag;
        // existingTool.output1 = output1;
        // existingTool.output2 = output2;
        //existingTool.type = type;
        // existingTool.image = image;
        // existingTool.likes = likes;
        // existingTool.views = views;
        // existingTool.wishlisted = wishlisted;
        
        await existingTool.save();
        return new Response(JSON.stringify(existingTool), { status: 200 })
    } catch (error) {
        return new Response("Failed to Update the prompts", { status: 500 })
    }
}

//DELETE (delete)
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await AITool.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to Delete the prompts", { status: 500 })
    }
}