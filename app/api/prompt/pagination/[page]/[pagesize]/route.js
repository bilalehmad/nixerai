
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request,{params}) => {
    const {page,pagesize} = params
//    console.log(params)
   try {
    await connectToDB()

    //const totalPrompts = await Prompt.countDocuments();
    //const totalPages = Math.ceil(totalPrompts / pageSize);

    const prompts = await Prompt.find({})
    .skip((page - 1) * pagesize)
    .limit(pagesize)
    // .populate('creator')
    
    // console.log(prompts)
    return new Response(JSON.stringify(prompts), { status: 200 })
} catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
}
} 