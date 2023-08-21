"use client";
import { useState,useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({post,reactions, handleEdit, handleDelete,setPageTag, setTags,setSearchTag}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [badge, setBadge] = useState(false)
  const [accessLevel, setAccessLevel] = useState(false)
  const [postTags, setPostTags] = useState([]);
  const [postStates, setPostStates] = useState({});
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
  const promptView = () => {
  //   if (session?.user.subscriptionStatus == "Free") {
  //     router.push(`/view-prompt/${post._id}`)
  //  }
  //  else{
  //   router.push(`/pricing`)
  //  }
  if(post.accessLevel == "Paid")
    {
      if(session?.user)
      {
        if (session?.user.subscriptionStatus == "Free") 
        {
          router.push(`/pricing`)
        }
        else
        {
          router.push(`/view-prompt/${post._id}`)
        }
      }
      else
      {
        alert("Login Please")
      }
  }
  else
  {
    router.push(`/view-prompt/${post._id}`)
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
      if(post.accessLevel == "Paid")
      {
        setAccessLevel(true);
        
      }
      else
      {
      setAccessLevel(false);
      }
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
    setTags(tagName);
    setPageTag(1);
    setSearchTag(true);
  }
  return (
    <div className="container px-5 py-4 md:w-full">
          <div className="flex flex-wrap -m-5 ">
            <div className="cursor-pointer py-2 w-full">
              <div className="h-full rounded-xl border border-gray-200 dark:border-none overflow-hidden shadow-cla-blue bg-gradient-to-r shadow-md dark:from-black dark:to-blue-950  ">
                <div className="w-full text-gray-800  dark:bg-[#2B3A55] group dark:text-white    py-2 px-4 pr-3   flex flex-col justify-start hover:bg-gray-100 dark:hover:bg-gray-600  ">
                  <div className=" ">
                    <div>
                      <div className="  antialiased cursor-pointer css-84zodg" onClick={promptView} >
                        <div className="css-289z9l">
                          <Image alt="prompt image" height={50} width={50} src="https://flow-prompt-covers.s3.us-west-1.amazonaws.com/icon/illustrative/illus_5.png" className="rounded-md opacity-90  group-hover:opacity-100  object-cover css-sm43lu" />
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
                          <span className="relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-gray-600 dark:stroke-gray-400" fill="none"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
                          </span>
                          <span 
                          onClick={likeHandle}
                          className={`${postStates[post._id]?.liked ? 'fill-green-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                            <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.45,432.7H261.8a141.5,141.5,0,0,1-49.52-8.9l-67.5-25.07a15,15,0,0,1,10.45-28.12l67.49,25.07a111.79,111.79,0,0,0,39.08,7h86.65a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30H368.9a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30h20.44a14.21,14.21,0,0,0,10.05-24.26,14.08,14.08,0,0,0-10.05-4.16,15,15,0,0,1,0-30h20.45a14.21,14.21,0,0,0,10-24.26,14.09,14.09,0,0,0-10-4.17H268.15A15,15,0,0,1,255,176.74a100.2,100.2,0,0,0,9.2-29.33c3.39-21.87-.79-41.64-12.42-58.76a12.28,12.28,0,0,0-22.33,7c.49,51.38-23.25,88.72-68.65,108a15,15,0,1,1-11.72-27.61c18.72-8,32.36-19.75,40.55-35.08,6.68-12.51,10-27.65,9.83-45C199.31,77,211,61,229.18,55.34s36.81.78,47.45,16.46c24.71,36.36,20.25,74.1,13.48,97.21H409.79a44.21,44.21,0,0,1,19.59,83.84,44.27,44.27,0,0,1-20.44,58.42,44.27,44.27,0,0,1-20.45,58.43,44.23,44.23,0,0,1-40,63Z"/><path d="M155,410.49H69.13a15,15,0,0,1-15-15V189.86a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V395.49A15,15,0,0,1,155,410.49Zm-70.84-30H140V204.86H84.13Z"/></g></svg>
                          </span>
                          <span 
                          onClick={dislikeHandle} 
                          className={`${postStates[post._id]?.disliked  ? 'fill-red-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                            <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M242.28,427.39a43.85,43.85,0,0,1-13.1-2c-18.22-5.69-29.87-21.64-29.69-40.62.16-17.35-3.15-32.5-9.83-45-8.19-15.33-21.83-27.13-40.55-35.08A15,15,0,1,1,160.83,277c45.4,19.26,69.14,56.6,68.65,108a12.28,12.28,0,0,0,22.33,7c28.34-41.71,3.47-87.63,3.22-88.09a15,15,0,0,1,13.12-22.27H409.79a14.22,14.22,0,0,0,0-28.43H389.34a15,15,0,1,1,0-30,14.2,14.2,0,0,0,14.21-14.21,14.23,14.23,0,0,0-14.21-14.21H368.9a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H348.45a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H261.8a111.69,111.69,0,0,0-39.07,7l-67.5,25.07A15,15,0,0,1,144.78,82l67.5-25.07A141.5,141.5,0,0,1,261.8,48h86.65a44.25,44.25,0,0,1,40,63,44.27,44.27,0,0,1,20.45,58.43,44.27,44.27,0,0,1,20.44,58.42,44.21,44.21,0,0,1-19.59,83.84H290.11c6.77,23.11,11.23,60.85-13.48,97.22A41.21,41.21,0,0,1,242.28,427.39Z"/><path d="M155,305.85H69.13a15,15,0,0,1-15-15V85.21a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V290.85A15,15,0,0,1,155,305.85Zm-70.84-30H140V100.21H84.13Z"/></g></svg>
                          </span>
                          </div>
                          <div className="flex flex-row justify-end mt-[1px] text-[10px] md:text-xs">
                            {postTags.map((value) => (
                              <span className="chakra-text css-0 cursor-pointer mr-1" onClick={() => handleTagClick && handleTagClick(value)}>#{value}</span> 

                            ))}                          
                          </div>
                        </div>
                      </div>
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