import PromptDetail from '@components/dashboard/PromptDetail'
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const revalidate = 0;

const fetchFirstPosts = async () => {
    const queryParam = `page=1&pageSize=10`;
  
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt?${queryParam}`);
    const posts = await response.json();
    return posts;
  }

  const fetchTotal = async () => {
    try {
      await connectToDB();
      const prompts = await Prompt.countDocuments({})
      return JSON.stringify(prompts)
  } catch (error) {
      return error
  }
  }
const PromptList = async () => {
    const data =  await fetchFirstPosts();
    const total = await fetchTotal();
  return (
    <div className='p-4 sm:ml-64 w-full'>
        <div className='mt-20'>
            
        <PromptDetail data= {data} total={total} />

        </div>
    </div>
  )
}

export default PromptList