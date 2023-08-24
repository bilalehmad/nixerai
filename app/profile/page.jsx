import Profile from '@components/profile/Profile';
import PromptReaction from "@models/promptreaction";
import AIWishlist from "@models/aiwishlist";
import AIToolReaction from "@models/aitooltreaction";
import Wishlist from "@models/wishlist";
import { connectToDB } from "@utils/database";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route';
import AITool from '@models/aitool';

export const revalidate = 0


const fetchAllReaction = async () =>{

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    const allReaction = await PromptReaction.find({ creator: session?.user.id});
    const data = JSON.stringify(allReaction) 
    return data?data:true;
    
} catch (error) {
    return error;
}
}
const fetchWishList = async () => {

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    const wish = await Wishlist.find({ user: session?.user.id}).populate("post");
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

const fetchToolWishList = async () => {

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    console.log(session?.user.id)
    const wish = await AIWishlist.find({ user: session?.user.id}).populate({ path: 'post', model: AITool });
    if (wish) {
      const data = JSON.stringify(wish) ;
      return data?data:true;
    }
    
} catch (error) {
    return error;
}
}
const fetchToolReaction = async () =>{

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    const allReaction = await AIToolReaction.find({ creator: session?.user.id,});
    const data = JSON.stringify(allReaction) 
    return data?data:true;
    
} catch (error) {
    return error;
}
}
const MyProfile = async () => {

  const wishlist = await fetchWishList();
  const usrRect = await fetchAllReaction();
  const wishtoollist = await fetchToolWishList();
  const usrtoolRect = await fetchToolReaction();
  // const handleEdit = (post) => {
  //   router.push(`/update-prompt?id=${post._id}`)
  // }

  // const handleDelete = async (post) => {
  //   const hasConfirmed = confirm("Are you sure you want to Delete this prompt?")
  //   if(hasConfirmed)
  //   {
  //     try {
  //       await fetch(`/api/prompt/${post._id.toString()}`,{
  //         method: 'DELETE'
  //       });

  //       const filteredPosts = posts.filter((p) => p._id !== post._id);
  //       setPosts(filteredPosts);
        
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }
  return (
    <Profile
    name="My"
    desc="Here is a list of Prompts and Tools you have saved. Click the heart icon again to remove the Prompt or Tool."
    data={wishlist}
    reactions={usrRect}
    tool={wishtoollist}
    toolReaction={usrtoolRect}
    // handleEdit={handleEdit}
    // handleDelete={handleDelete}
    />
  )
}

export default MyProfile;