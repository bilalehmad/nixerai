import Tool from "@components/tool/Tool";
import { connectToDB } from "@utils/database";
import AIToolReaction from "@models/aitooltreaction";
import ChatButton from "@components/chat/ChatButton";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route';
import AIWishlist from "@models/aiwishlist";

export const revalidate = 0

const fetchFirstPosts = async (search,sort,include,tag) => {
  const queryParam = `search=${search}&tag=${tag}&sort=${sort}&filter=${include}&page=1&pageSize=10` ;
  console.log(queryParam)

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool?${queryParam}`);
    const data = await response.json();
  return data;
}

const fetchCategory = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/aicategory`);
  const data = await response.json();
  return data;
}
const fetchWishList = async () => {

  const session = await getServerSession(authOptions);
  if (!session) return true;
  try {
    await connectToDB();
    const wish = await AIWishlist.find({ user: session?.user.id});
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
    const allReaction = await AIToolReaction.find({ creator: session?.user.id,});
    const data = JSON.stringify(allReaction) 
    return data?data:true;
    
} catch (error) {
    return error;
}
}
const AITool =  async({searchParams}) => {
  const param = searchParams;
  const search = param.search;
  const sort = param.sort;
  const include = param.include;
  const tag = param.tag;

  const data = await fetchFirstPosts(search,sort,include,tag);
  const category = await fetchCategory();
  const usrRect = await fetchAllReaction();
  const wishlist = await fetchWishList();
  // console.log(usrRect)
  return (
    <section className="w-full flex-center flex-col max-w-7xl sm:px-6 px-6">
    {/* <ChatButton /> */}
    <h1 className="head_text text-center">
    Uncover & Share
        <br />
        <span className="orange_gradient">AI-Driven Tools</span>
    </h1>
    <p className="desc text-center">
      Explore and Use the most Extensive Collection of  AI Tools
    </p>

    <Tool data={data} category={category} reactions={usrRect} tag={tag} wishies={wishlist}search={search} sort={sort} filters={include} />
</section>
  )
}

export default AITool