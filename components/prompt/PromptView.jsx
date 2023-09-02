"use client";
import { useState,useEffect } from "react";
import ChatGPT from "@components/chatGPT/ChatGPT";
import Image from 'next/image';
import { useSession } from "next-auth/react";

const PromptView = ({data,reactions,wishies}) => {
const {data: session} = useSession();
// const post = props.data;
const [post, setPost] = useState(data);
const [reaction, setReaction] = useState(()=> {
    const result = reactions == true ? []: JSON.parse(reactions);
    return result;
  });
const [wishing, setWishing] = useState(()=> {
    const result = wishies == true ? []: JSON.parse(wishies);
    return result;
  });
const [postStates, setPostStates] = useState({});
const [postTags, setPostTags] = useState([]);
const [copied, setcopied] = useState("");
const [badge, setBadge] = useState(false)
const [accessLevel, setAccessLevel] = useState(false);
const [wishlist, setWishlist] = useState({});
const handleCopy = () => {
    setcopied(post.sample)
    navigator.clipboard.writeText(post.sample);
    setTimeout(() => {
      setcopied("")
    }, 3000);
  }

  const likeHandle =  () => {
    if (session?.user) {
      const responce =  fetchReaction("Like");
      if(responce)
      {
        setPostStates((prevStates) => {
          const isCurrentlyLiked = prevStates[post._id]?.liked;
          
          return {
            ...prevStates,
            [post._id]: { 
              liked: !isCurrentlyLiked, 
              disliked: false 
            }
          };
        });
    
      }
     
    }
    else
    {
      alert("Login Please")
    }
  }
  
  const dislikeHandle = () => {
    if (session?.user) { 
      const responce =  fetchReaction("Dislike");
      if(responce)
      {
        setPostStates((prevStates) => {
          const isCurrentlyDisliked = prevStates[post._id]?.disliked;
          
          return {
            ...prevStates,
            [post._id]: { 
              liked: false,
              disliked: !isCurrentlyDisliked 
            }
          };
        });
    
      }
    }
    else
    {
      alert("Login Please")
    }
  }
  const fetchReaction = async (react) => {
    const postID = post._id;
    try {
      const response = await fetch(`/api/reaction/prompt`,{
        method :'POST',
        body : JSON.stringify({
            post: postID,
            reaction: react
        })
      })
  
      if (response.ok) {
        return true;
      }
      else{
        return false;
      }
    } catch (error) {
      return error;
    }
  }

  const fetchWishlist = async (id) => {
    const postID = post._id;
    try {
      const response = await fetch(`/api/prompt/wishlist`,{
        method :'POST',
        body : JSON.stringify({
            post: postID,
            user: id
        })
      })
      const data= await response.json();
      const {whishlisted} = data;
      if (whishlisted) {
        return true;
      }
      else{
        return false;
      }
    } catch (error) {
      return error;
    }
  }
  const handleWishlist = async () => {
    if (session?.user) { 
        const responce = await fetchWishlist(post._id);
        if(responce)
        {
            setWishlist((prevStates) => ({
                ...prevStates,
                [post._id]: { 
                  ...prevStates[post._id], 
                  wishlisted: true,
                }
            }));
        }
        else{
            setWishlist((prevStates) => ({
                ...prevStates,
                [post._id]: { 
                  ...prevStates[post._id], 
                  wishlisted: false,
                }
            }));
        }
      }
      else
      {
        alert("Login Please")
      }
  }
  
useEffect(() => {

    setPostTags(() => {
      const res = post.tag.trim().split(" ")
      return res;
    })

    const date = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const today = new Date(date).toLocaleDateString('en-US', options);
    
    const getDate = post.timestamp.toString();
    const todate = new Date(getDate).toLocaleDateString('en-US', options);
    // console.log(afterDays,todate);
    if(todate < today)
    {
      setBadge(true)
    }

    if(post.accessLevel == "Paid")
      {
        if(session?.user) {
          if(session?.user.subscriptionStatus == "Free")
          {
            setAccessLevel(true);
          }
          else{
            setAccessLevel(false);
          }
        }
        else
        {
          setAccessLevel(true);
        }
        
      }
      else
      {
      setAccessLevel(false);
      }
    
    if(wishing.length > 0)
    {
        wishing.map(element => {
            if(element.post == post._id)
            {
                setWishlist((prevStates) => ({
                ...prevStates,
                [post._id]: { 
                  ...prevStates[post._id], 
                  wishlisted: true
                }
              }));
            }
            else{
                setWishlist((prevStates) => ({
                ...prevStates,
                [post._id]: { 
                  ...prevStates[post._id], 
                  wishlisted: false
                }
              }));
            }
          })
    }
    if(reaction.length > 0)
    {
      reaction.map(element => {
        if(element.reaction == 'Like')
        {
          setPostStates((prevStates) => ({
            ...prevStates,
            [post._id]: { 
              ...prevStates[post._id], 
              liked: true, 
              disliked: false 
            }
          }));
        }
        else{
          setPostStates((prevStates) => ({
            ...prevStates,
            [post._id]: { 
              ...prevStates[post._id], 
              liked: false, 
              disliked: true 
            }
          }));
        }
      })
    }
  }, [])
  
  return (
        <div className="container px-5 py-4 mx-auto h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='col-span-1 p-5'>
                    <div className='flex flex-wrap'>
                        <Image alt="prompt image" height={200} width={100} src="/assets/images/nixerai.png" className="rounded-md opacity-90 transition-all h-60 w-full group-hover:opacity-100  object-cover" />
                    </div>
                    <h1 className='font-staoshi font-semibold text-xl md:text-2xl mt-2'>
                        <span className='text-gray-900 dark:text-white  text-left'>{post.title}</span>
                    </h1>
                    <hr className='my-4'/>
                    
                    <div className=" my-3 text-gray-500 dark:text-gray-400 text-xs  css-k008qs">
                        <div className="flex flex-row justify-between gap-2   ">
                          <div className="flex flex-row  mt-[1px]">
                          <span 
                          onClick={handleWishlist} 
                          className={`${wishlist[post._id]?.wishlisted ? 'fill-red-700 ' : 'fill-gray-700 dark:stroke-gray-400' } relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5 "  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
                          </span>
                          <span 
                          onClick={likeHandle}
                          className={`${postStates[post._id]?.liked ? 'fill-green-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                            <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.45,432.7H261.8a141.5,141.5,0,0,1-49.52-8.9l-67.5-25.07a15,15,0,0,1,10.45-28.12l67.49,25.07a111.79,111.79,0,0,0,39.08,7h86.65a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30H368.9a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30h20.44a14.21,14.21,0,0,0,10.05-24.26,14.08,14.08,0,0,0-10.05-4.16,15,15,0,0,1,0-30h20.45a14.21,14.21,0,0,0,10-24.26,14.09,14.09,0,0,0-10-4.17H268.15A15,15,0,0,1,255,176.74a100.2,100.2,0,0,0,9.2-29.33c3.39-21.87-.79-41.64-12.42-58.76a12.28,12.28,0,0,0-22.33,7c.49,51.38-23.25,88.72-68.65,108a15,15,0,1,1-11.72-27.61c18.72-8,32.36-19.75,40.55-35.08,6.68-12.51,10-27.65,9.83-45C199.31,77,211,61,229.18,55.34s36.81.78,47.45,16.46c24.71,36.36,20.25,74.1,13.48,97.21H409.79a44.21,44.21,0,0,1,19.59,83.84,44.27,44.27,0,0,1-20.44,58.42,44.27,44.27,0,0,1-20.45,58.43,44.23,44.23,0,0,1-40,63Z"/><path d="M155,410.49H69.13a15,15,0,0,1-15-15V189.86a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V395.49A15,15,0,0,1,155,410.49Zm-70.84-30H140V204.86H84.13Z"/></g></svg>
                          </span>
                          <span 
                          onClick={dislikeHandle} 
                          className={`${postStates[post._id]?.disliked  ? 'fill-red-700' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                            <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M242.28,427.39a43.85,43.85,0,0,1-13.1-2c-18.22-5.69-29.87-21.64-29.69-40.62.16-17.35-3.15-32.5-9.83-45-8.19-15.33-21.83-27.13-40.55-35.08A15,15,0,1,1,160.83,277c45.4,19.26,69.14,56.6,68.65,108a12.28,12.28,0,0,0,22.33,7c28.34-41.71,3.47-87.63,3.22-88.09a15,15,0,0,1,13.12-22.27H409.79a14.22,14.22,0,0,0,0-28.43H389.34a15,15,0,1,1,0-30,14.2,14.2,0,0,0,14.21-14.21,14.23,14.23,0,0,0-14.21-14.21H368.9a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H348.45a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H261.8a111.69,111.69,0,0,0-39.07,7l-67.5,25.07A15,15,0,0,1,144.78,82l67.5-25.07A141.5,141.5,0,0,1,261.8,48h86.65a44.25,44.25,0,0,1,40,63,44.27,44.27,0,0,1,20.45,58.43,44.27,44.27,0,0,1,20.44,58.42,44.21,44.21,0,0,1-19.59,83.84H290.11c6.77,23.11,11.23,60.85-13.48,97.22A41.21,41.21,0,0,1,242.28,427.39Z"/><path d="M155,305.85H69.13a15,15,0,0,1-15-15V85.21a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V290.85A15,15,0,0,1,155,305.85Zm-70.84-30H140V100.21H84.13Z"/></g></svg>
                          </span>
                          </div>
                          <div className="flex flex-row justify-end mt-[1px] text-[10px] md:text-xs">
                            {postTags.map((value) => (
                              <span className="chakra-text css-0 cursor-pointer mr-1">#{value}</span> 

                            ))}                          
                          </div>
                        </div>
                      </div>
                    <p className='text-gray-900 dark:text-white font-semibold text-xs md:text-sm'>{post.teasor}</p>
                        {/* <div className='py-5'>
                            <h5 className='font-staoshi font-bold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Example</span>
                            </h5>
                            <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{example}</p>
                        </div> */}
                 </div>
                 <div className='col-span-1 py-5  w-full '>
                    <div className=' text-gray-900 dark:text-white border-2 w-full rounded-md'>
                        <div className='flex justify-between px-5 pt-5'>
                            <h1 className='font-staoshi font-semibold md:text-xl text-lg'>
                                <span className=' text-gray-900 dark:text-white text-left'>Prompt</span>
                            </h1>
                            <div className="copy_btn fill-gray-50 stroke-gray-900 dark:fill-gray-600 dark:stroke-gray-50" onClick={handleCopy}>
                            {/* <Image
                                src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                                width={12}
                                height={12}
                                alt="tick"
                            /> */}
                            {copied === post.sample ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

                            ):(
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                            </div>
                        </div>
                        <div className=' px-5 py-5 scroll-m-2 '>
                            {/* <h5 className='font-staoshi font-semibold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Sample</span>
                            </h5> */}
                            <div className='h-[250px] overflow-x-auto'>
                                <p className='text-gray-900 dark:text-white font-semibold text-xs md:text-sm pb-5'>{post.sample}</p>
                            </div>
                        </div>
                        {/* <ChatGPT title={post.title} sample={post.sample}/> */}
                    </div>
                 </div>
            </div>
        </div>
  )
}

export default PromptView