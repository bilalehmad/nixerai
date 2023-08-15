
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async (request, {params}) => {
    // console.log(request)
    try {
        await connectToDB()
        const prompts = await Prompt.findById(params.id).populate('creator');
        // console.log(prompts)
        if(!prompts) return new Response("Prompt not found", {status : 404})
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {title,
         teasor,
          sample,
          example,
          output1,
          output2,
          status,
          type,
          image,
          likes,
          views,
          wishlisted,
          tag} = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found", {status : 404});

        existingPrompt.title = title;
        existingPrompt.teasor = teasor;
        existingPrompt.sample = sample;
        existingPrompt.example = example;
        existingPrompt.output1 = output1;
        existingPrompt.output2 = output2;
        existingPrompt.status = status;
        //existingPrompt.type = type;
        existingPrompt.image = image;
        // existingPrompt.likes = likes;
        // existingPrompt.views = views;
        // existingPrompt.wishlisted = wishlisted;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to Update the prompts", { status: 500 })
    }
}

//DELETE (delete)
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to Delete the prompts", { status: 500 })
    }
}