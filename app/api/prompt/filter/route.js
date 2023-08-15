
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
    // console.log('name:', names, 'page:', page);


    try {
        await connectToDB();

        const prompts = await Prompt.find({ tag: { $in: names } })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        // .populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};