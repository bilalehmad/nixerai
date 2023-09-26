"use client";
import { useState,useEffect } from "react";
import ChatGPT from "@components/chatGPT/ChatGPT";
import Image from 'next/image';
import Timestamp from "@components/others/Timestamp";
import { useSession } from "next-auth/react";
import LoginModal from '@components/LoginModal';

const AIToolView = ({data,reactions,wishies}) => {
    const {data: session} = useSession();
// const post = props.data;
const [post, setPost] = useState(data);
const [currentImage, setCurrentImage] = useState(`/assets/tools/${post.title}_NixerAI.PNG`);
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
const [loginModal, setLoginModal] = useState(false)
const handleCopy = () => {
    setcopied(post.sample)
    navigator.clipboard.writeText(post.sample);
    setTimeout(() => {
      setcopied("")
    }, 3000);
  }

  const defaultImage = '/assets/images/logo.PNG';
  const handleImageError = () => {
    setCurrentImage(defaultImage);
  };
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
      const response = await fetch(`/api/reaction/tool`,{
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
      const response = await fetch(`/api/tool/wishlist`,{
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
        setLoginModal(true)
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
    <div className="max-w-8xl mx-auto px-4 sm:px-3 md:px-4 h-screen">    
        <div class="lg:px-[15.5rem]">
            <main class="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
                <header class="mb-10 max-w-lg">
                    {/* <p class="mb-4 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">{post.status}</p> */}
                    <div className="flex justify-between items-center ">
                        <h1 class="mb-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">{post.title}</h1>

                        <a class="group inline-flex items-center h-9 rounded-lg text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-700 text-white hover:bg-slate-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-slate-400 dark:focus:ring-offset-0 dark:bg-slate-700 dark:text-slate-100  dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500" target="_blank" href={post.url}>
                            Explore
                            <svg  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="overflow-visible ml-3  stroke-slate-300 group-hover:stroke-slate-200 dark:stroke-slate-500 dark:group-hover:stroke-slate-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
                        </a>
                    </div>
                    <div className="flex justify-end items-center ">
                        
                        {/* <div class="flex items-center space-x-1 ">
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div> */}
                        <span class="flex ml-3 pl-3 py-2">
                            <span
                                 onClick={handleWishlist}
                                 class={` cursor-pointer ${wishlist[post._id]?.wishlisted ? 'text-red-700 ' : 'text-gray-500 dark:text-gray-400' }`}>
                                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
                            </span>
                            <span 
                                onClick={likeHandle}
                                class={`ml-2 cursor-pointer ${postStates[post._id]?.liked ? 'text-green-500' : 'text-gray-500'}`}>
                                <svg fill="currentColor" viewBox="0 0 512 512"  width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/></svg>                          
                            </span>
                            <span 
                                onClick={dislikeHandle} 
                                class={`ml-2  cursor-pointer ${postStates[post._id]?.disliked  ? 'text-red-500' : 'text-gray-500'}`}>
                                <svg fill="currentColor" viewBox="0 0 512 512" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"/></svg>                          
                            </span>
                        </span>
                    </div>
                    <p class="text-lg text-slate-700 dark:text-slate-400">{post.description}</p>
                    

                </header>
                <section>
                    {/* <h2 class="mb-2 text-2xl leading-7 tracking-tight text-slate-900 font-bold dark:text-slate-200">{post.title}</h2>
                    <div class="mb-10 prose prose-slate text-slate-600 max-w-3xl dark:prose-dark">
                        <p>{post.description}</p>
                    </div> */}
                        <div class=" pb-10 flex flex-col-reverse items-start sm:mx-0  sm:rounded-2xl xl:flex-row ">
                            
                            <div class="w-full flex-none mb-10 xl:w-[29rem]">
                                <div class="aspect-w-[1216] aspect-h-[606] sm:aspect-w-[1376] sm:aspect-h-[664] shadow-lg rounded-lg  overflow-hidden ">
                                <picture>
                                    <source type="image/jpeg" onError={handleImageError}  src={currentImage} media="(min-width: 640px)"/>
                                    <img src={currentImage} onError={handleImageError}  alt={`${post.title}-NixerAI`} decoding="async"/>
                                </picture>
                                    
                                </div>
                            </div>
                            <div class="flex-auto  xl:mb-0 xl:ml-8">
                                {/* <h3 class="mb-4 text-sm leading-6 font-semibold text-blue-500">{post.status}</h3> */}
                                {/* <p class="mb-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-200">{post.title}</p> */}
                                {/* <div class="mb-6 text-sm leading-6 text-slate-600 space-y-4 dark:text-slate-400">
                                    <p>{post.description}</p>
                                </div> */}
                                {post.confirmation == "Approved" && (
                                    <div class="flex  mt-4">
                                        <div className="pr-2">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#0ea5e9" height="20" width="20" xmlns="http://www.w3.org/2000/svg" ><path fill="none" d="M0 0h24v24H0z"></path><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path></svg>
                                        </div>
                                        <p class="text-sm text-slate-700 dark:text-slate-400">This tool is verified by its reputation or social media presence.</p>
                                    </div>
                                )}
                               
                                <div class="flex  mt-4">
                                    <div className="pr-2" >
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" color="gray" height="18" width="18" xmlns="http://www.w3.org/2000/svg" ><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"></path></svg>
                                    </div>
                                    <p class="text-sm text-slate-700 dark:text-slate-400">Added on <Timestamp date={post.createdAt} /></p>
                                </div>
                                {/* <div class="flex items-center  mt-4">
                                    <div class="pr-2">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" color="#6b7280" class="MuiChip-icon MuiChip-iconMedium MuiChip-iconColor#6b7280" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path></svg>
                                    </div>
                                    <span class="text-sm text-slate-700 dark:text-slate-400">Free</span>
                                </div> */}
                                
                            </div>
                        </div>
                </section>
            </main>
        </div>
        {loginModal && (
        <LoginModal setLoginModal={setLoginModal} />
      )}
    </div>

//     <div className="container px-5 py-4 mx-auto">
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className='col-span-1 p-5'>
//             <div className='flex flex-wrap'>
//                 <Image alt="prompt image" height={200} width={100} src="/assets/images/nixerai.png" className="rounded-md opacity-90 transition-all h-60 w-full group-hover:opacity-100  object-cover" />
//             </div>
//             <h1 className='font-staoshi font-semibold text-xl md:text-2xl mt-2'>
//                 <span className='text-gray-900 dark:text-white  text-left'>{post.title}</span>
//             </h1>
//             <hr className='my-4'/>
            
//             <div className=" my-3 text-gray-500 dark:text-gray-400 text-xs  css-k008qs">
//                 <div className="flex flex-row justify-between gap-2   ">
//                   <div className="flex flex-row  mt-[1px]">
//                   <span 
//                   onClick={handleWishlist} 
//                   className={`${wishlist[post._id]?.wishlisted ? 'fill-red-700 ' : 'fill-gray-700 dark:stroke-gray-400' } relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
//                       <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5 "  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
//                   </span>
//                   <span 
//                   onClick={likeHandle}
//                   className={`${postStates[post._id]?.liked ? 'fill-green-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
//                     <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.45,432.7H261.8a141.5,141.5,0,0,1-49.52-8.9l-67.5-25.07a15,15,0,0,1,10.45-28.12l67.49,25.07a111.79,111.79,0,0,0,39.08,7h86.65a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30H368.9a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30h20.44a14.21,14.21,0,0,0,10.05-24.26,14.08,14.08,0,0,0-10.05-4.16,15,15,0,0,1,0-30h20.45a14.21,14.21,0,0,0,10-24.26,14.09,14.09,0,0,0-10-4.17H268.15A15,15,0,0,1,255,176.74a100.2,100.2,0,0,0,9.2-29.33c3.39-21.87-.79-41.64-12.42-58.76a12.28,12.28,0,0,0-22.33,7c.49,51.38-23.25,88.72-68.65,108a15,15,0,1,1-11.72-27.61c18.72-8,32.36-19.75,40.55-35.08,6.68-12.51,10-27.65,9.83-45C199.31,77,211,61,229.18,55.34s36.81.78,47.45,16.46c24.71,36.36,20.25,74.1,13.48,97.21H409.79a44.21,44.21,0,0,1,19.59,83.84,44.27,44.27,0,0,1-20.44,58.42,44.27,44.27,0,0,1-20.45,58.43,44.23,44.23,0,0,1-40,63Z"/><path d="M155,410.49H69.13a15,15,0,0,1-15-15V189.86a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V395.49A15,15,0,0,1,155,410.49Zm-70.84-30H140V204.86H84.13Z"/></g></svg>
//                   </span>
//                   <span 
//                   onClick={dislikeHandle} 
//                   className={`${postStates[post._id]?.disliked  ? 'fill-red-700' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
//                     <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M242.28,427.39a43.85,43.85,0,0,1-13.1-2c-18.22-5.69-29.87-21.64-29.69-40.62.16-17.35-3.15-32.5-9.83-45-8.19-15.33-21.83-27.13-40.55-35.08A15,15,0,1,1,160.83,277c45.4,19.26,69.14,56.6,68.65,108a12.28,12.28,0,0,0,22.33,7c28.34-41.71,3.47-87.63,3.22-88.09a15,15,0,0,1,13.12-22.27H409.79a14.22,14.22,0,0,0,0-28.43H389.34a15,15,0,1,1,0-30,14.2,14.2,0,0,0,14.21-14.21,14.23,14.23,0,0,0-14.21-14.21H368.9a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H348.45a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H261.8a111.69,111.69,0,0,0-39.07,7l-67.5,25.07A15,15,0,0,1,144.78,82l67.5-25.07A141.5,141.5,0,0,1,261.8,48h86.65a44.25,44.25,0,0,1,40,63,44.27,44.27,0,0,1,20.45,58.43,44.27,44.27,0,0,1,20.44,58.42,44.21,44.21,0,0,1-19.59,83.84H290.11c6.77,23.11,11.23,60.85-13.48,97.22A41.21,41.21,0,0,1,242.28,427.39Z"/><path d="M155,305.85H69.13a15,15,0,0,1-15-15V85.21a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V290.85A15,15,0,0,1,155,305.85Zm-70.84-30H140V100.21H84.13Z"/></g></svg>
//                   </span>
//                   </div>
//                   <div className="flex flex-row justify-end mt-[1px] text-[10px] md:text-xs">
//                     {postTags.map((value) => (
//                       <span className="chakra-text css-0 cursor-pointer mr-1">#{value}</span> 

//                     ))}                          
//                   </div>
//                 </div>
//               </div>
//             <p className='text-gray-900 dark:text-white font-semibold text-xs md:text-sm'>{post.description}</p>
//                 {/* <div className='py-5'>
//                     <h5 className='font-staoshi font-bold text-sm py-5'>
//                         <span className=' text-gray-900 dark:text-white  text-left'>Example</span>
//                     </h5>
//                     <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{example}</p>
//                 </div> */}
//          </div>
//          <div className='col-span-1 py-5  w-full '>
//             <div className=' text-gray-900 dark:text-white border-2 w-full rounded-md'>
//                 <div className='flex justify-between px-5 pt-5'>
//                     <h1 className='font-staoshi font-semibold md:text-xl text-lg'>
//                         <span className=' text-gray-900 dark:text-white text-left'>Prompt</span>
//                     </h1>
//                     <div className="copy_btn fill-gray-50 stroke-gray-900 dark:fill-gray-600 dark:stroke-gray-50" onClick={handleCopy}>
//                     {/* <Image
//                         src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
//                         width={12}
//                         height={12}
//                         alt="tick"
//                     /> */}
//                     {copied === post.sample ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>

//                     ):(
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
//                     )}
//                     </div>
//                 </div>
//                 <div className=' px-5 py-5 scroll-m-2 '>
//                     {/* <h5 className='font-staoshi font-semibold text-sm py-5'>
//                         <span className=' text-gray-900 dark:text-white  text-left'>Sample</span>
//                     </h5> */}
//                     <div className='h-[250px] overflow-x-auto'>
//                         <p className='text-gray-900 dark:text-white font-semibold text-xs md:text-sm pb-5'>{post.sample}</p>
//                     </div>
//                 </div>
//                 {/* <ChatGPT title={post.title} sample={post.sample}/> */}
//             </div>
//          </div>
//     </div>
// </div>
  )
}

export default AIToolView