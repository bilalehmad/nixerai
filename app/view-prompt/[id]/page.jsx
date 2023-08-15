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

const PromptDetail = async ({params}) => {
  
  //const [isPageLoading, setPageIsLoading] = useState(false);
  //const searchParams = useSearchParams();
  //const promptId = searchParams.get('id')
  console.log(params.id)
  const data= await fetchPosts(params.id);
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
    data = {data}
    />
  )
}

export default PromptDetail