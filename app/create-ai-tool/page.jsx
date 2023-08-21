"use client";


import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AIForm from '@components/forms/AIForm';

const AddAITool = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const [image, setImage] = useState(null)
    const [imageInput, setImageInput] = useState(null)
    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        url: '',
        accessibility: '',
        star: 0,
        youtubeUrl: '',
        description: '',
        image: '',
        tag : ''
    });

    
    const handleImage = (e) => {
        const file = e.target.files[0];
        setPost({
            ...post,
            image: e.target.value
          })
          const reader = new FileReader();
          const base64Data = reader.readAsDataURL(file);
          console.log(base64Data)
        setImageInput(base64Data);
        setImage(URL.createObjectURL(file));
        // const filereader = new FileReader();
        // filereader.onload = function(e){
        //     setImage(e.target.result)
        // }
        // filereader.readAsDataURL(file);
        //console.log(file)
    }


    const createAITool = async (e) => {
        e.preventDefault();

        setsubmitting(true);
        
        try {
            const respose = await fetch('/api/tool/new',{
                method :'POST',
                body : JSON.stringify({
                    title: post.title,
                    url: post.url,
                    accessibility: post.accessibility,
                    star: post.star,
                    youtubeUrl: post.youtubeUrl,
                    description: post.description,
                    image: 'image',
                    userId: session?.user.id,
                    tag : post.tag
                })
            })

            if (respose.ok) {
                router.push('/ai-tool');
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setsubmitting(false)
        }
    }

  return (
    <AIForm 
    type="Create"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit  = {createAITool}
    handleImage = {handleImage}
    image = {image}
> </AIForm>
  )
}

export default AddAITool