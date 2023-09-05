"use client";

import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import Form from '@components/forms/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const {data : session} = useSession({
        required: true
    });

    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        teasor: '',
        sample: '',
        example: '',
        output1: '',
        output2: '',
        status: '',
        type: '',
        image: '',
        likes: 0,
        views: 0,
        wishlisted: 0,
        tag : ''
    })

    const createPrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        //console.log(post)
        try {
            const respose = await fetch('/api/prompt/new',{
                method :'POST',
                body : JSON.stringify({
                    title: post.title,
                    teasor: post.teasor,
                    sample: post.sample,
                    example: post.example,
                    output1: post.output1,
                    output2: post.output2,
                    status: post.status,
                    type: "Free",
                    image: post.image,
                    likes: 1,
                    views: 1,
                    wishlisted: 1,
                    userId: session?.user.id,
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
        type="Create"
        data = {JSON.stringify(post)}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit  = {createPrompt}
    > </Form>
  )
}

export default CreatePrompt