
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const PATCH = async (request, {params}) => {
    const {id,role,subscriptionStatus} = await request.json();
    try {
        
        console.log(id,role,subscriptionStatus)
        await connectToDB();

        const userData = await User.findById({
            _id : id
        });
        userData.role = role;
        userData.subscriptionStatus = subscriptionStatus;

        await userData.save();

        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all User", { status: 500 })
    }
} 