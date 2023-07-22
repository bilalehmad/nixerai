// "use client";

//import { useEffect, useState } from "react";
//import { useSearchParams } from "next/navigation";
import PromptView from "@components/PromptView";

const fetchPosts = async (promptId) => {
  const query = `/api/prompt/${promptId}`;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${promptId}`);
  const data = await response.json();
  return data;
}

async function PromptDetail(context) {
  
  //const [isPageLoading, setPageIsLoading] = useState(false);
  //const searchParams = useSearchParams();
  //const promptId = searchParams.get('id')
  console.log(context)
  const data= await fetchPosts(context.searchParams.id);
//   const [post, setPost] = useState({
//     title: '',
//     teasor: '',
//     sample: '',
//     example: '',
//     tag : ''
// });

  // useEffect(() => {
  //   setPageIsLoading(true);
  //   const fetchPosts = async () => {
  //     const response = await fetch(`/api/prompt/${promptId}`);
  //     const data = await response.json();

  //    setPost({
  //           title: data.title,
  //           teasor: data.teasor,
  //           sample: data.sample,
  //           example: data.example,
  //           tag: data.tag
  //       })

        
  //       setPageIsLoading(false);

  //   };

  //   if(promptId) fetchPosts();

  // }, [promptId])

  return (
    <PromptView
    post = {data}
    />
  )
}

export default PromptDetail