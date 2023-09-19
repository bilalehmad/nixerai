"use client";
import { useState,useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter ,asPath } from "next/navigation";

const PromptCard = ({post,reactions,setLoginModal, handleEdit, handleDelete,setPageTag, setTags,setSearchTag,wishing}) => {
  const {data: session, status } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const [badge, setBadge] = useState(false)
  const [accessLevel, setAccessLevel] = useState(false)
  const [postTags, setPostTags] = useState([]);
  const [postStates, setPostStates] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [copied, setcopied] = useState("");
  const handleCopy = () => {
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
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
      setLoginModal(true)
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
      setLoginModal(true)
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
        setLoginModal(true)
      }
  }
  

  const promptView = () => {
    if(session?.user)
    {
      const title = post.title.replace(/ /g, '-');
      router.push(`/prompt/${title}`)
      
    }
    else
    {
      setLoginModal(true)
    }
  // if(post.accessLevel == "Paid")
  //   {
  //     if(session?.user)
  //     {
  //       if (session?.user.subscriptionStatus == "Free") 
  //       {
  //         router.push(`/pricing`)
  //       }
        
  //     }
  //     else
  //     {
  //       router.push(`/view-prompt/${post._id}`)
  //     }
  // }
  // else
  // {
  //   router.push(`/view-prompt/${post._id}`)
  // }
}
function isDateBetween(targetDate, startDate, endDate) {
  return targetDate >= startDate && targetDate <= endDate;
}
  useEffect(() => {
    setPostTags(() => {
      const res = post.tag.trim().split(" ")
      return res;
    })

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const targetDate = new Date().toLocaleDateString('en-US', options);
    const date = new Date();
    const startDate = new Date(date.setDate(date.getDate() - 10)).toLocaleDateString('en-US', options);
    //console.log(targetDate)
    const getDate = post.timestamp.toString();
    const endDate = new Date(getDate).toLocaleDateString('en-US', options);
    //console.log(todate)
    // console.log(afterDays,todate);
    if(isDateBetween(targetDate, startDate, endDate))
    {
      setBadge(true)
    }

    // if(post.accessLevel == "Paid")
    //   {
    //     if(session?.user) {
    //       if(session?.user.subscriptionStatus == "Free")
    //       {
    //         setAccessLevel(true);
    //       }
    //       else{
    //         setAccessLevel(false);
    //       }
    //     }
    //     else
    //     {
    //       setAccessLevel(true);
    //     }
        
    //   }
    //   else
    //   {
    //   setAccessLevel(false);
    //   }
    
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
            })
      }
    
    if(reactions.length > 0)
    {
      reactions.map(element => {
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
  
  const handleTagClick = (tagName) => {
    if(pathName !== '/profile' && !pathName.startsWith("/category"))
    {
      setTags(tagName);
      setPageTag(1);
      router.push(`/?tag=${tagName}`)
    }
  }
  return (
    <div key={post._id} className="container px-5 py-4 md:w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="cursor-pointer py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                <div className="w-full text-gray-800  dark:bg-[#2B3A55] group dark:text-white    py-2 px-4 pr-3   flex flex-col justify-start hover:bg-gray-100 dark:hover:bg-gray-600  ">
                  <div className=" ">
                    <div>
                      <div className="  antialiased cursor-pointer css-84zodg" onClick={promptView} >
                        <div className="css-289z9l">
                          <Image alt="prompt image" height={50} width={50} src={`/assets/prompts/80x80/${post.category}.png`} className="rounded-md opacity-90  group-hover:opacity-100  object-cover css-sm43lu" />
                        </div>
                        <div className=" flex flex-col h-[80px] gap-1 pl-1  css-0">
                          <div className="inline-flex justify-start css-k008qs">
                            
                            <p className="text-[13px] md:text-[15px] md:w-[250px] font-semibold tracking-wide line-clamp-2 break-words css-0">{post.title}</p>
                              {/* {post.status == "Verified" && (
                                  <svg fill="#2B3A55" height="20" className='dark:fill-white fill-blue-500' viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M6.26701 3.45496C6.91008 3.40364 7.52057 3.15077 8.01158 2.73234C9.15738 1.75589 10.8426 1.75589 11.9884 2.73234C12.4794 3.15077 13.0899 3.40364 13.733 3.45496C15.2336 3.57471 16.4253 4.76636 16.545 6.26701C16.5964 6.91008 16.8492 7.52057 17.2677 8.01158C18.2441 9.15738 18.2441 10.8426 17.2677 11.9884C16.8492 12.4794 16.5964 13.0899 16.545 13.733C16.4253 15.2336 15.2336 16.4253 13.733 16.545C13.0899 16.5964 12.4794 16.8492 11.9884 17.2677C10.8426 18.2441 9.15738 18.2441 8.01158 17.2677C7.52057 16.8492 6.91008 16.5964 6.26701 16.545C4.76636 16.4253 3.57471 15.2336 3.45496 13.733C3.40364 13.0899 3.15077 12.4794 2.73234 11.9884C1.75589 10.8426 1.75589 9.15738 2.73234 8.01158C3.15077 7.52057 3.40364 6.91008 3.45496 6.26701C3.57471 4.76636 4.76636 3.57471 6.26701 3.45496ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fillRule="evenodd"/>
                                </svg>
                              )} */}
                              {/* {!badge && (
                                 <span className="relative bottom-[5px] p-0.5 dark:fill-white fill-blue-500 ">
                                 <svg viewBox="0 0 48 48" width="30" height="30" xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 md:w-7 md:h-7 '><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>new-rectangle</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path> </g> </g> </g></svg>
                               </span>
                              )} */}
                              {accessLevel && (
                                 <span className="relative bottom-[5px] p-0.5 dark:fill-white fill-blue-500 ">
                                  <svg  viewBox="0 0 48 48" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M36 16h-2v-4c0-5.52-4.48-10-10-10S14 6.48 14 12v4h-2c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V20c0-2.21-1.79-4-4-4zM24 34c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.2-18H17.8v-4c0-3.42 2.78-6.2 6.2-6.2 3.42 0 6.2 2.78 6.2 6.2v4z"/></svg>                                  
                                  </span>
                              )}
                          </div>
                          <div className="css-k008qs">
                            <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 2xl:text-md sm:mb-2 line-clamp-3 font-medium break-words css-0">{post.teasor}</p>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-5 text-gray-500 dark:text-gray-400 text-xs  css-k008qs">
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
                            <svg viewBox="0 0 512 512"  width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/></svg>                          
                            </span>
                          <span 
                          onClick={dislikeHandle} 
                          className={`${postStates[post._id]?.disliked  ? 'fill-red-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                            <svg viewBox="0 0 512 512" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"/></svg>                          
                            </span>
                          </div>
                          <div className="flex flex-row justify-end mt-[1px] text-[10px] md:text-xs">
                            {postTags.map((value) => (
                              <span className="chakra-text css-0 cursor-pointer mr-1" onClick={() => handleTagClick && handleTagClick(value)}>#{value}</span> 

                            ))}                          
                          </div>
                        </div>
                      </div>
                        {/* {session?.user.id === post.creator._id && pathName === '/profile' && (
                          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                            <p
                            className="font-inter text-sm green_gradient cursor-pointer"
                            onClick={handleEdit}
                            >
                              Edit
                            </p>
                            <p
                            className="font-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                            >
                              Delete
                            </p>
                          </div>
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    /* <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gary-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt="tick"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gary-700">
        {post.prompt}
      </p>
      <p 
      className="font-inter text-sm blue_gradient cusror-pointer"
      onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>*/
  )
}

export default PromptCard