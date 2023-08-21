import ToolDetail from '@components/dashboard/ToolDetail';
import { connectToDB } from "@utils/database";
import AITool from '@models/aitool';


const fetchTotal = async () => {
  try {
    await connectToDB();
    const tool = await AITool.countDocuments({})
    return JSON.stringify(tool)
} catch (error) {
    return error
}
}
const fetchFirstPosts = async () => {
    const queryParam = `page=1&pageSize=10`;
  
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool/admin?${queryParam}`);
      const data = await response.json();
    return data;
  }
const ToolList = async () => {
    
  const total = await fetchTotal();
  const data = await fetchFirstPosts();
  return (
    <div className='p-4 sm:ml-64 w-full'>
        <div className='mt-20'>
            <ToolDetail data={data} total={total}  />
        </div>
    </div>
  )
}

export default ToolList