import PromptView from "@components/prompt/PromptView";
import { connectToDB } from "@utils/database";
import PromptReaction from "@models/promptreaction";
import Wishlist from "@models/wishlist";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route';


const fetchPosts = async (promptId) => {
  const query = `/api/prompt/${promptId}`;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${promptId}`);
  const data = await response.json();
  return data;
}

const fetchWishList = async (id) => {

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    const wish = await Wishlist.find({ post: id});
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
      const allReaction = await PromptReaction.find({post: id, creator: session?.user.id,});
      const data = JSON.stringify(allReaction) 
      return data?data:true;
      
  } catch (error) {
      return error;
  }
}

const PromptDetail = async ({params}) => {
  // console.log(params.id)
  const data= await fetchPosts(params.id);
  const usrRect = await fetchAllReaction(params.id);
  const wishlist = await fetchWishList(params.id);
  console.log(wishlist)
  return (
    <PromptView
    data = {data}
    reactions = {usrRect}
    wishies={wishlist}
    />
  )
}

export default PromptDetail