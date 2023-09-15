import { connectToDB } from "@utils/database";
import AITool from "@models/aitool";
import formidable from "formidable";
//import fs from  'fs-extra';
import path from 'path';
import fs from "fs/promises";
//import { writeFile } from "fs";

//PATCH (update)
export const PATCH = async (req) => {

    const data = await req.formData();
    const id = data.get('id');
    const image = data.get('image');
    const title = data.get('title');
    const url = data.get('url');
    const confirmation = data.get('confirmation');
    const status = data.get('status');
    const likes = data.get('likes');
    const dislikes = data.get('dislikes');
    const views = data.get('views');
    const wishlisted = data.get('wishlisted');
    const youtubeUrl = data.get('youtubeUrl');
    const description = data.get('description');
    const userId = data.get('userId');
    const tag = data.get('tag');
    const timestamp = data.get('timestamp');
    const {name} = image
    //const {title,url, confirmation,status,likes,dislikes,views,wishlisted,youtubeUrl,description,image, userId,tag,timestamp} = await req.json();
    //console.log(title,url, confirmation,status,likes,dislikes,views,wishlisted,youtubeUrl,description,image, userId,tag,timestamp)
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const pathCrt = path.join(process.cwd(), "public/assets/tools",name);
    const dir = path.dirname(pathCrt);
    try {

        await fs.access(dir);
    } catch (error) {
        await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(pathCrt, buffer);
    //console.log(`open ${pathCrt} to see uploaded file`)
    
    //const { title,url, description,verified,status,tag} = await request.json();
    try {
        await connectToDB();
        const existingTool = await AITool.findById(id);
        if(!existingTool) return new Response("Tools not found", {status : 404});
        existingTool.title = title;
        existingTool.url = url;
        existingTool.description = description;
        existingTool.image = name;
        existingTool.confirmation = confirmation;
        existingTool.status = status;
        existingTool.tag = tag;
        existingTool.timestamp = timestamp;
        // existingTool.output2 = output2;
        //existingTool.type = type;
        // existingTool.image = image;
        // existingTool.likes = likes;
        // existingTool.views = views;
        // existingTool.wishlisted = wishlisted;
        
        await existingTool.save();
        return new Response(JSON.stringify(existingTool), { status: 200 })
    } catch (error) {
        return new Response("Failed to Update the Tools", { status: 500 })
    }
}
