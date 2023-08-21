import Tool from "@components/tool/Tool";
import { connectToDB } from "@utils/database";
import AIToolReaction from "@models/aitooltreaction";
import ChatButton from "@components/chat/ChatButton";
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route';

export const revalidate = 0

const fetchFirstPosts = async () => {
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool?${queryParam}`);
    const data = await response.json();
  return data;
}

const fetchCategory = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/aicategory`);
  const data = await response.json();
  return data;
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
const AITool =  async() => {

  const data = await fetchFirstPosts();
  const category = await fetchCategory();
  const usrRect = await fetchAllReaction();
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

    <Tool data={data} category={category} reactions={usrRect} />
</section>
  )
}

export default AITool