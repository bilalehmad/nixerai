import Emails from "@models/emails";
import { connectToDB } from "@utils/database";



export const POST = async (req) => {
    const email = await req.json();
    // console.log(email)
    try {
        await connectToDB();
        const newCategory = new Emails(email)

        await newCategory.save();

        return new Response(JSON.stringify(newCategory), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Category!", {status : 500})
    }
}