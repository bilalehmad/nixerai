import PromptView from "@components/prompt/PromptView";
import { connectToDB } from "@utils/database";
import PromptReaction from "@models/promptreaction";
import Wishlist from "@models/wishlist";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route';
import Subscription from "@models/subscription";
import Prompt from "@models/prompt";

export const revalidate = 0

const fetchPosts = async (promptId) => {
  try {
      await connectToDB()
      const prompts = await Prompt.find({_id : promptId,accessLevel : "Paid"})
      if(prompts.length > 0)
      {
        const session = await getServerSession(authOptions);
        if(session?.user)
          {
            if (session?.user.subscriptionStatus == "Free") {
              redirect(`/pricing`)

            }
            else
            {
              if (session?.user.subscriptionStatus !== "Premium") {
                const subscription = await Subscription.find({user: session?.user.id})
                //console.log(subscription)
                if(subscription.length === 0)
                {
                  redirect('/pricing')
                }
                else
                {
                  console.log("subscription is valid")
                  const date = new Date();
                  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                  const today = new Date(date).toLocaleDateString('en-US', options);
                  
                  const expireAt = subscription[0].expireAt.toString();
                  const expireDate = new Date(expireAt).toLocaleDateString('en-US', options);

                  if( today >= expireDate)
                  {
                    redirect('/pricing')
                  }
                  
                }
              }
            }
          }
          
      }

      
      const query = `/api/prompt/${promptId}`;
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${promptId}`);
      const data = await response.json();
      
  } catch (error) {
    
  }
  
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