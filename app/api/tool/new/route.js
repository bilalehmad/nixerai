import { connectToDB } from "@utils/database";
import AITool from "@models/aitool";
import formidable from "formidable";
import fs from  'fs-extra';
import path from 'path';

// const upload = multer({
//     storage: multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), "public", "uploads","ai-tool"));
//       },
//       filename: function (req, file, cb) {
//         cb(null, new Date().getTime() + "-" + file.originalname);
//       },
//     }),
//   });

export const POST = async (req) => {
    const {title,url, accessibility,star,youtubeUrl,description,image, userId,tag} = await req.json();
    
    try {

        await connectToDB();

        // fs.pathExists(file, (err, exists) => {
        //     //console.log(err) // => null
        //     //console.log(exists) // => false
        //         if(exists == false)
        //         {
        //             fs.mkdir(file, { recursive: true }, (err) => {
        //                 if (err) {
        //                 console.error('Error creating directory:', err);
        //                 } else {
        //                 console.log('Directory created successfully');
        //                 }
        //             });
        //         }
        //         else
        //         {
        //             console.log('Directory already created');

        //         }
        //   })


        const newAITool = new AITool({
            creator : userId,
            title,
            url,
            accessibility,
            star,
            youtubeUrl,
            description,
            image,
            tag
        })

        await newAITool.save();

        return new Response(JSON.stringify(newAITool), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new AI Tool!", {status : 500})
    }
}