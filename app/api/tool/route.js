
import { connectToDB } from "@utils/database";
import AITool from "@models/aitool";

export const GET = async (request) => {
      
    const url = new URL(request.url);
    const query = url.searchParams;
    const searchParams = new URLSearchParams(query);
    const sort = searchParams.get('sort') || "";
    const search = searchParams.get('search') || "";
    const tag = searchParams.get('tag') || "";
    console.log(searchParams.get("filter"),sort,search,tag  )
    const checkFilter = searchParams.get("filter") == null ? false: searchParams.get("filter").split(',') || [];
    const checkValidFilter = checkFilter.includes('undefined') || checkFilter.includes('') ? false : true;
    console.log(searchParams.get("filter").split(','),checkValidFilter,sort,search,tag  )


    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    try {
        await connectToDB()

        //const totalPrompts = await Prompt.countDocuments();
        //const totalPages = Math.ceil(totalPrompts / pageSize);
        if(tag != 'undefined' && search == 'undefined' && sort == 'undefined' && checkValidFilter == false )
        {
            console.log("tag"); 
            const aitool = await AITool.find(
                { $or: [
                    { tag: { $regex: tag, $options: 'i' } }
                  ] }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator')
    
            if(!aitool) return new Response("Tools not found", {status : 404})
            return new Response(JSON.stringify(aitool), { status: 200 })


        }
        else if(search != 'undefined' && sort == 'undefined' && checkValidFilter == false )
        { 
            console.log("search prompt")
            const aitool = await AITool.find(
                { $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
    
                }
            )
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');
            if(!aitool) return new Response("Tools not found", {status : 404})
            return new Response(JSON.stringify(aitool), { status: 200 })
        }
        else if(sort != 'undefined' && search == 'undefined' && checkValidFilter == false)
        {
            console.log("sort prompt")
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    confirmation: "Approved"})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                //console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    createdAt: { $gte: tenDaysAgo ,$lte: today} })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else if(checkValidFilter == true && search == 'undefined' && sort == 'undefined' )
        {
            console.log("filter")
            const filter = searchParams.get("filter").split(',') || [];
            console.log(filter)
            const aitool = await AITool.find({ tag: { $regex: new RegExp(filter.join("|"), 'i') } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator');

            if(!aitool) return new Response("Tools not found", {status : 404})
            return new Response(JSON.stringify(aitool), { status: 200 });
        }
        else if(checkValidFilter == false && search !== 'undefined' && sort !== 'undefined' )
        { 
            console.log("Search and Sort")
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    confirmation: "Approved",
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ]
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                //console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    createdAt: { $gte: tenDaysAgo ,$lte: today},
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ]
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({ 
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                    ]
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }

        }
        else if(checkValidFilter == true && search === 'undefined' && sort !== 'undefined' )
        { 
            console.log("filter and sort")
            const filter = searchParams.get("filter").split(',') || [];
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    confirmation: "Approved",
                    tag: { $regex: new RegExp(filter.join("|"), 'i') }
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                //console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    createdAt: { $gte: tenDaysAgo ,$lte: today},
                    tag: { $regex: new RegExp(filter.join("|"), 'i') }
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({ 
                    tag: { $regex: new RegExp(filter.join("|"), 'i') }
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else if(checkValidFilter == true && search !== 'undefined' && sort === 'undefined' )
        { 
            console.log("filter and search")
            const filter = searchParams.get("filter").split(',') || [];
            const aitool = await AITool.find({ 
                tag: { $regex: new RegExp(filter.join("|"), 'i') },
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } }
                  ]
    
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

            // .populate('creator');
            if(!aitool) return new Response("Tools not found", {status : 404})
            //console.log(aitool)
            return new Response(JSON.stringify(aitool), { status: 200 })

        }
        else if(checkValidFilter == true && search !== 'undefined' && sort !== 'undefined' )
        { 
            console.log("filter, sort and search")
            const filter = searchParams.get("filter").split(',') || [];
            if(sort === "Verified")
            {   
                const aitool = await AITool.find({
                    confirmation: "Approved",
                    tag: { $regex: new RegExp(filter.join("|"), 'i') },
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ]
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else if(sort === "New")
            {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Setting to the end of the day
    
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                tenDaysAgo.setHours(0, 0, 0, 0);
    
                //console.log(tenDaysAgo)
                const aitool = await AITool.find({ 
                    createdAt: { $gte: tenDaysAgo ,$lte: today},
                    tag: { $regex: new RegExp(filter.join("|"), 'i') },
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ]
                    })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
            else
            {
                const aitool = await AITool.find({ 
                    tag: { $regex: new RegExp(filter.join("|"), 'i') },
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tag: { $regex: search, $options: 'i' } }
                      ]
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
                // .populate('creator');
                if(!aitool) return new Response("Tools not found", {status : 404})
                //console.log(aitool)
                return new Response(JSON.stringify(aitool), { status: 200 })
            }
        }
        else
        {
            
            const aitool = await AITool.find({})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            // .populate('creator')
    
            if(!aitool) return new Response("Tools not found", {status : 404})
            return new Response(JSON.stringify(aitool), { status: 200 })

        }
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 