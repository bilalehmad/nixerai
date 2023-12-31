import PromptView from "@components/prompt/PromptView";
import { connectToDB } from "@utils/database";
import PromptReaction from "@models/promptreaction";
import Wishlist from "@models/wishlist";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../../api/auth/[...nextauth]/route';
import Subscription from "@models/subscription";
import Prompt from "@models/prompt";
import { redirect } from 'next/navigation'

export const revalidate = 0;

const fetchId = async (name) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findOne({ title: name });

    if (prompt.length === 0) {
      redirect(`/`)
      console.log("No prompts found with the given title.");
    } else {
      return prompt._id;
    }
    
  } catch (error) {
    redirect(`/`)
    console.log(`Error ${error}`)
  }
  
}  

const fetchPosts = async (promptId) => {
  try {
    await connectToDB()
    const prompts = await Prompt.findById(promptId)
    return prompts
} catch (error) {
    return error;
}
  try {
      //await connectToDB()
      // const prompts = await Prompt.find({_id : promptId,accessLevel : "Paid"})
      // if(prompts.length > 0)
      // {
      //   const session = await getServerSession(authOptions);
      //   if(session?.user)
      //     {
      //       if (session?.user.subscriptionStatus == "Free") {
      //         redirect(`/pricing`)

      //       }
      //       else
      //       {
      //         if (session?.user.subscriptionStatus !== "Premium") {
      //           const subscription = await Subscription.find({user: session?.user.id})
      //           //console.log(subscription)
      //           if(subscription.length === 0)
      //           {
      //             redirect('/pricing')
      //           }
      //           else
      //           {
      //             console.log("subscription is valid")
      //             const date = new Date();
      //             const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      //             const today = new Date(date).toLocaleDateString('en-US', options);
                  
      //             const expireAt = subscription[0].expireAt.toString();
      //             const expireDate = new Date(expireAt).toLocaleDateString('en-US', options);

      //             if( today >= expireDate)
      //             {
      //               redirect('/pricing')
      //             }
                  
      //           }
      //         }
      //       }
      //     }
          
      // }

      
     
      
  } catch (error) {
    
  }
  
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
  const para = params.title;
  const title = para.replace(/-/g, ' ');
  const getId = await fetchId(title)
  const data= await fetchPosts(getId);
  const usrRect = await fetchAllReaction(getId);
  const wishlist = await fetchWishList(getId);
  //console.log(wishlist)
  return (
    <PromptView
    data = {data}
    reactions = {usrRect}
    wishies={wishlist}
    />
  )
}

export default PromptDetail