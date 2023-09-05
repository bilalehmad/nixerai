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
    const status = searchParams.get("status")||"";
    const filter = searchParams.get("filter").split(',') || [];
    const search = searchParams.get("search") || "";
    // console.log(page)

    try {
        await connectToDB()
        if(status != "null" && filter.length > 0)
        {
            //console.log("first sort")
            const prompts = await Prompt.find({
                accessLevel: status,
                category: { $regex: new RegExp(filter.join("|"), 'i') } 
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
            
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            //console.log(prompts)
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if(status != "null" && search != "null")
        {
            //console.log("second sort")
            const prompts = await Prompt.find({
                accessLevel: status,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
            
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            //console.log(prompts)
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if(status != "null" && search != "null" && filter.length > 0)
        {
            //console.log("third sort")
            const prompts = await Prompt.find({
                accessLevel: status,
                category: { $regex: new RegExp(filter.join("|"), 'i') } ,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
            
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            //console.log(prompts)
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else
        {
            //console.log("last sort")
            const prompts = await Prompt.find({accessLevel: status,})
            .skip((page - 1) * pageSize)
            .limit(pageSize);
            
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            //console.log(prompts)
            return new Response(JSON.stringify(prompts), { status: 200 })
    }
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 