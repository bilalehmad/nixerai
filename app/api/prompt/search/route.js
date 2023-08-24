import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import querystring from 'querystring';

//GET (read)
export const GET = async (request) => {
    
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const q = searchParams.get('q') || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    const sort = searchParams.get("sort") || "";
    const filter = searchParams.get("filter").split(',') || [];
    console.log(q, sort, filter)
    try {
        await connectToDB();

        if(sort != "null" && q != "null")
        {
            console.log("first search")
            const prompts = await Prompt.find(
                { $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { teasor: { $regex: q, $options: 'i' } },
                    { tag: { $regex: q, $options: 'i' } }
                  ],
                  accessLevel: sort,
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if(filter.length > 0 && q != "null")
        {
            console.log("second search")
            const prompts = await Prompt.find(
                { $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { teasor: { $regex: q, $options: 'i' } },
                    { tag: { $regex: q, $options: 'i' } }
                  ],
                  category: { $regex: new RegExp(filter.join("|"), 'i') } 
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if (filter.length > 0 && sort != "null" && q != "null")
        {
            console.log("third search")
            const prompts = await Prompt.find(
                { $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { teasor: { $regex: q, $options: 'i' } },
                    { tag: { $regex: q, $options: 'i' } }
                  ],
                  accessLevel: sort,
                  category: { $regex: new RegExp(filter.join("|"), 'i') } 
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else
        {
            console.log("last search")
            const prompts = await Prompt.find(
                { $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { teasor: { $regex: q, $options: 'i' } },
                    { tag: { $regex: q, $options: 'i' } }
                  ]
    
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 