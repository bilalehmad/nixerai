import PromptView from "@components/prompt/PromptView";


const fetchPosts = async (promptId) => {
  const query = `/api/prompt/${promptId}`;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${promptId}`);
  const data = await response.json();
  return data;
}

const PromptDetail = async ({params}) => {
  // console.log(params.id)
  const data= await fetchPosts(params.id);

  return (
    <PromptView
    data = {data}
    />
  )
}

export default PromptDetail