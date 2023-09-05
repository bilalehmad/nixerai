"use client";


import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CategoryForm from '@components/forms/CategoryForm';

const AddAITool = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState(null);



    const createAITool = async (e) => {
        e.preventDefault();

        setsubmitting(true);
        
        try {
            const respose = await fetch('/api/category/new',{
                method :'POST',
                body : JSON.stringify({
                    name: post
                })
            })

            if (respose.ok) {
                router.push('/');
            }
        } catch (error) {
            //console.log(error)
        }
        finally{
            setsubmitting(false)
        }
    }

  return (
    <CategoryForm 
    type="Create"
    data = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit  = {createAITool}
> </CategoryForm>
  )
}

export default AddAITool