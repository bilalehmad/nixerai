
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { AiFillAlipaySquare } from "react-icons/ai";
import Category from "@models/category";

export const GET = async (request) => {
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const sort = searchParams.get('sort') || "undefined";
    const search = searchParams.get('search') || "undefined";
    const tag = searchParams.get('tag') || "undefined";

    const checkFilter = searchParams.get("filter").split(',') || [];
    
    const checkValidFilter = checkFilter.includes('undefined') || checkFilter.includes('') ? false : true ;
    

    // const filter = searchParams.get("include").includes('undefined') ? undefined : searchParams.get("include").split(',');
    //console.log(filter)
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;

    // Fetch and Shuffle Categories
   
    try {
        await connectToDB();
        if(tag != 'undefined' && search == 'undefined' && sort == 'undefined' && checkValidFilter == false )
        { 
            console.log("tag");
            const prompts = await Prompt.find({ tag: tag })
                            .skip((page - 1) * pageSize)
                            .limit(pageSize)
                            // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(search != 'undefined' && sort == 'undefined' && checkValidFilter == false )
        { 
            console.log("search prompt")
            const prompts = await Prompt.find(
                { $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
    
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if(sort != 'undefined' && search == 'undefined' && checkValidFilter == false)
        { 
            console.log("sort prompt")
            const prompts = await Prompt.find({accessLevel: sort})
            .skip((page - 1) * pageSize)
            .limit(pageSize);
            
            // .populate('creator');
            if(!prompts) return new Response("Prompt not found", {status : 404})
            //console.log(prompts)
            return new Response(JSON.stringify(prompts), { status: 200 })
        }
        else if(checkValidFilter == true && search == 'undefined' && sort == 'undefined' )
        { 
            console.log("filter")
            const filter = searchParams.get("filter").split(',') || [];
            console.log(filter)
            const prompts = await Prompt.find({ 
                category: { $regex: new RegExp(filter.join("|"), 'i') } 
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(checkValidFilter == false && search !== 'undefined' && sort !== 'undefined' )
        { 
            console.log("Search and Sort")
            const prompts = await Prompt.find({ 
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ],
                  accessLevel: sort
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(checkValidFilter == true && search === 'undefined' && sort !== 'undefined' )
        { 
            console.log("filter and sort")
            const filter = searchParams.get("filter").split(',') || [];
            console.log(filter)
            const prompts = await Prompt.find({ 
                  category: { $regex: new RegExp(filter.join("|"), 'i') } ,
                  accessLevel: sort
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(checkValidFilter == true && search !== 'undefined' && sort === 'undefined' )
        { 
            console.log("filter and search")
            const filter = searchParams.get("filter").split(',') || [];
            console.log(filter)
            const prompts = await Prompt.find({ 
                  category: { $regex: new RegExp(filter.join("|"), 'i') } ,
                  $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else if(checkValidFilter == true && search !== 'undefined' && sort !== 'undefined' )
        { 
            console.log("filter, sort and search")
            const filter = searchParams.get("filter").split(',') || [];
            console.log(filter)
            const prompts = await Prompt.find({ 
                  category: { $regex: new RegExp(filter.join("|"), 'i') } ,
                  accessLevel: sort,
                  $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { teasor: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                // .populate('creator');

            return new Response(JSON.stringify(prompts), { status: 200 });
        }
        else
        {
            
            
            console.log("last")

            // Step 1: Get a random sample of prompts from the collection
            const samplePrompts = await Prompt.aggregate([
                { $sample: { size: pageSize } }
            ]);

            // Step 2: Get distinct categories from the sample
            const sampledCategories = [...new Set(samplePrompts.map(prompt => prompt.category))];

            // Step 3: Use aggregation to get a few prompts from each sampled category and then shuffle the sequence
            const prompts = await Prompt.aggregate([
                {
                    $match: { category: { $in: sampledCategories } }
                },
                {
                    $group: {
                        _id: "$category",
                        docs: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        docs: { $slice: ["$docs", Math.ceil(pageSize / sampledCategories.length)] }
                    }
                },
                { $unwind: "$docs" },
                // Assign a random number to each document and sort by it for shuffling
                {
                    $addFields: {
                        "randomOrder": { $rand: {} }
                    }
                },
                { $sort: { "randomOrder": 1 } },
                { $replaceRoot: { newRoot: "$docs" } }
            ]);


            //const prompts = await Prompt.find({})
            //.skip((page - 1) * pageSize)
            //.limit(pageSize);
            // .populate('creator')
    
            return new Response(JSON.stringify(prompts), { status: 200 })

        }
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 