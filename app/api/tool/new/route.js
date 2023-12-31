import { connectToDB } from "@utils/database";
import AITool from "@models/aitool";
import formidable from "formidable";
//import fs from  'fs-extra';
import path from 'path';
import fs from "fs/promises";
//import { writeFile } from "fs";


export const POST = async (req) => {
    const data = await req.formData();
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
    
    
    try {

        await connectToDB();

        console.log("Post Tool")
        
        const newAITool = new AITool({
            creator : userId,
            title,
            url,
            youtubeUrl,
            description,
            image : name,
            status,
            confirmation,
            likes,
            dislikes,
            views,
            wishlisted,
            tag,
            timestamp
        })

        await newAITool.save();
        return new Response(JSON.stringify(newAITool), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new AI Tool!", {status : 500})
    }
}