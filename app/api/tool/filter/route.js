
import { connectToDB } from "@utils/database";
import querystring from 'querystring';
import AITool from "@models/aitool";

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

    console.log(names)

    try {
        await connectToDB();
        if(names.length > 0 && sort != "null")
        {
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    tag: { $regex: new RegExp(names.join("|"), 'i') } ,
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    tag: { $regex: new RegExp(names.join("|"), 'i') } ,
                    createdAt: { $gte: tenDaysAgo ,$lte: today} })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({tag: { $regex: new RegExp(names.join("|"), 'i') }})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            // const aitool = await AITool.find({ 
            //     tag: { $regex: new RegExp(names.join("|"), 'i') } 
            // })
            // .skip((page - 1) * pageSize)
            // .limit(pageSize)
            // .populate('creator');
    
            //return new Response(JSON.stringify(aitool), { status: 200 });
        }
        else if(names.length > 0 && search != "null")
        {
            const aitool = await AITool.find({ 
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ] ,
                tag: { $regex: new RegExp(names.join("|"), 'i') } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
    
            return new Response(JSON.stringify(aitool), { status: 200 });
        }
        else if(names.length > 0 && sort != "null" && search != "null")
        {
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(names.join("|"), 'i') } ,
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(names.join("|"), 'i') } ,
                    createdAt: { $gte: tenDaysAgo ,$lte: today} })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(names.join("|"), 'i') }})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else
        {
            const aitool = await AITool.find({ tag: { $regex: new RegExp(names.join("|"), 'i') } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
    
            return new Response(JSON.stringify(aitool), { status: 200 });
        }

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};