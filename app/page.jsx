import ChatButton from "@components/chat/ChatButton";
import Feed from "@components/prompt/Feed";
import { connectToDB } from "@utils/database";
import PromptReaction from "@models/promptreaction";
import Wishlist from "@models/wishlist";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from './api/auth/[...nextauth]/route';

export const revalidate = 0

const fetchFirstPosts = async () => {
  
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt?${queryParam}`);
  const posts = await response.json();
  return posts;
}

const fetchCategory = async () => {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/category`);
      const category = await response.json();
      return category;
  }

  const fetchWishList = async () => {

    const session = await getServerSession(authOptions);
    if (!session) return true;
    try {
      await connectToDB();
      const wish = await Wishlist.find({ user: session?.user.id});
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
const Home = async () => {
  const data =  await fetchFirstPosts();
  const category = await fetchCategory();
  const usrRect = await fetchAllReaction();
  const wishlist = await fetchWishList();
  return (
    <section className="w-full h-auto flex-center flex-col max-w-7xl sm:px-6 px-6">
      {/* <ChatButton /> */}
        <h1 className="head_text text-center">
        Uncover & Share
            <br/>
            <span className="orange_gradient text-[#F05454]"> AI-Powered Prompts</span>
        </h1>
        <p className="desc md:text-center">
        Explore  and Use the most Extensive Collection of Prompt
        </p>
        <Feed data= {data} category={category} reactions={usrRect} wishies={wishlist} />
    </section>

  )
}

export default Home;  