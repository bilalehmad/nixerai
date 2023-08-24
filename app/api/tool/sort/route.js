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
    const status = searchParams.get("status")|| "";
    const filter = searchParams.get("filter").split(',') || [];
    const search = searchParams.get("search") || "";
    console.log(status)

    try {
        await connectToDB()
        if(status !== "null" && filter.length > 0)
        {
            if(status === "Verified")
            {   
                const aitool = await AITool.find({
                    tag: { $regex: new RegExp(filter.join("|"), 'i') } ,
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(status === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    tag: { $regex: new RegExp(filter.join("|"), 'i') } ,
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
                const aitool = await AITool.find({ tag: { $regex: new RegExp(filter.join("|"), 'i') }})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else if(status != "null" && search != "null")
        {
            if(status === "Verified")
            {   
                const aitool = await AITool.find({
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ] ,
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(status === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ] ,
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
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ]
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else if(status !== "null" && filter.length > 0 && search != "null")
        {
            if(status === "Verified")
            {   
                const aitool = await AITool.find({
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(filter.join("|"), 'i') } ,
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(status === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(filter.join("|"), 'i') } ,
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
                        { title: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                        { tag: { $regex: q, $options: 'i' } }
                      ] ,
                    tag: { $regex: new RegExp(filter.join("|"), 'i') }
                })
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
            else if(status === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                console.log(tenDaysAgo)
                const aitool = await AITool.find({ createdAt: { $gte: tenDaysAgo ,$lte: today} })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Prompt not found", {status : 404})
                console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }

        }
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 