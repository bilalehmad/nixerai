"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


import PromptView from "@components/PromptView";

function PromptDetail({ params }) {
  
  const [isPageLoading, setPageIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')

  const [post, setPost] = useState({
    title: '',
    teasor: '',
    sample: '',
    example: '',
    tag : ''
});

  useEffect(() => {
    setPageIsLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

     setPost({
            title: data.title,
            teasor: data.teasor,
            sample: data.sample,
            example: data.example,
            tag: data.tag
        })

        
        setPageIsLoading(false);

    };

    if(promptId) fetchPosts();

  }, [promptId])

  return (
    <PromptView
    setPageIsLoading = {setPageIsLoading}
    isPageLoading = {isPageLoading}
    post = {post}
    />
  )
}

export default PromptDetail