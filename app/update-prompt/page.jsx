"use client";

import {useState, useEffect} from 'react';
import { useRouter,  useSearchParams } from 'next/navigation';
import Form from '@components/forms/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        teasor: '',
        prompt1: '',
        prompt2: '',
        prompt3: '',
        prompt4: '',
        prompt5: '',
        tag : ''
    });

    useEffect(() => {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
            title: data.title,
            teasor: data.teasor,
            prompt1: data.prompt1,
            prompt2: data.prompt2,
            prompt3: data.prompt3,
            prompt4: data.prompt4,
            prompt5: data.prompt5,
            tag: data.tag
        })

      }
      if(promptId) getPromptDetails();

    }, [promptId])
    

    const updatePrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);

        if(!promptId) return alert('Prompt ID Not Found');
        try {
            const respose = await fetch(`/api/prompt/${promptId}`,{
                method :'PATCH',
                body : JSON.stringify({
                    title: post.title,
                    teasor: post.teasor,
                    prompt1: post.prompt1,
                    prompt2: post.prompt2,
                    prompt3: post.prompt3,
                    prompt4: post.prompt4,
                    prompt5: post.prompt5,
                    tag : post.tag
                })
            })

            if (respose.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setsubmitting(false)
        }
    }

  return (
    <Form 
        type="Edit"
        data = {JSON.stringify(post)}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit  = {updatePrompt}
    > </Form>
  )
}

export default EditPrompt

