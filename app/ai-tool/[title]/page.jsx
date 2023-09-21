import AIToolView from '@components/tool/AIToolView';
import { connectToDB } from "@utils/database";
import AIToolReaction from "@models/aitooltreaction";
import ChatButton from "@components/chat/ChatButton";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route';
import AIWishlist from "@models/aiwishlist";
import React from 'react';
import AITool from '@models/aitool';
import { redirect } from 'next/navigation'


const fetchId = async (name) => {
    try {
      await connectToDB()
      const tool = await AITool.findOne({ title: name });
  
      if (tool.length === 0) {
            redirect(`/`)
            console.log("No prompts found with the given title.");
      } else {
        return tool._id;
      }
      
    } catch (error) {
      console.log(`Error ${error}`)
    }
    
  }  

const fetchPosts = async (toolId) => {
    await connectToDB()
    const tools = await AITool.findById(toolId)
      return tools;
    }
  
  const fetchWishList = async (id) => {
  
    const session = await getServerSession(authOptions);
    if (!session) return true;
    try {
      await connectToDB();
      const wish = await AIWishlist.find({ post: id});
      if (wish) {
        const data = JSON.stringify(wish) 
        return data?data:true;
      }
      else
      {
        return {wishlisted: false}
      }
      
  } catch (error) {
      return error;
  }
  }
  const fetchAllReaction = async (id) =>{
  
    const session = await getServerSession(authOptions);
    if (!session) return true;
    try {
      await connectToDB();
      const allReaction = await AIToolReaction.find({post: id, creator: session?.user.id,});
      const data = JSON.stringify(allReaction) 
      return data?data:true;
      
  } catch (error) {
      return error;
  }
  }
const AIToolDetail = async ({params}) => {

    const para = params.title;
    const title = para.replace(/-/g, ' ');
    const getId = await fetchId(title);
    const data= await fetchPosts(getId);
    const usrRect = await fetchAllReaction(getId);
    const wishlist = await fetchWishList(getId);
  return (
      <AIToolView 
      data = {data}
      reactions = {usrRect}
      wishies={wishlist}
       />
  )
}

export default AIToolDetail