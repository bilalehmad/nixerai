import { connectToDB } from "@utils/database";
import Category from "@models/category";


export const POST = async (req) => {
    const name = await req.json();
// console.log(name)
    try {
        await connectToDB();
        const newCategory = new Category(name)

        await newCategory.save();

        return new Response(JSON.stringify(newCategory), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Category!", {status : 500})
    }
}