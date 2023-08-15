
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
    // console.log('name:', names, 'page:', page);


    try {
        await connectToDB();

        const aitool = await AITool.find({ tag: { $in: names } })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        // .populate('creator');

        return new Response(JSON.stringify(aitool), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};