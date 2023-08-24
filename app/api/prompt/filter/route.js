
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import querystring from 'querystring';

export const GET = async (request) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);

    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;

    // Access the array of names
    const names = searchParams.get("names").split(',') || [];
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    // console.log('name:', names, 'page:', page);


    try {
        await connectToDB();
        console.log(names.length , typeof sort);
        if(names.length > 0 && sort != "null")
        {
            console.log("first filter")
            const prompts = await Prompt.find({ 
                accessLevel: sort,
                category: { $regex: new RegExp(names.join("|"), 'i') } 
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');
    
            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(names.length > 0 && search != "null")
        {
            console.log("second filter")
            const prompts = await Prompt.find({ 
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ],
                    category: { $regex: new RegExp(names.join("|"), 'i') } 
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(names.length > 0 && search != "null" && sort != "null")
        {
            console.log("third filter")
            const prompts = await Prompt.find({ 
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ],
                    accessLevel: sort,
                    category: { $regex: new RegExp(names.join("|"), 'i') } 
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else
        { 
            console.log("last filter")
            const prompts = await Prompt.find({ 
                category: { $regex: new RegExp(names.join("|"), 'i') } 
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });

        }
       
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};