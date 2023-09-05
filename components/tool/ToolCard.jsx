"use client";
import { useState ,useEffect, Suspense} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import mql from "@microlink/mql";

const cheerio = require('cheerio');

const ToolCard = ({post,key, handleEdit,reactions, handleDelete, setPageTag, setTags,setSearchTag, onModalStateChange,onShareModalStateChane,wishing}) => {
  const {data: session} = useSession();
  const [thumbnail, setThumbnail] = useState('');
  const [isNativeShare, setNativeShare] = useState(false);
  const pathName = usePathname();
  const [badge, setBadge] = useState(false)
  const [postTags, setPostTags] = useState([]);
  const [postStates, setPostStates] = useState({});
  const [verification, setVerification] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const defaultImage = '/assets/images/logo.png';
  const [currentImage, setCurrentImage] = useState(`/assets/tools/${post.title}.png`);


  // const router = useRouter();
  // const promptView = () => {
  //   router.push(`/view-prompt?id=${post._id}`)
  // }

 
// useEffect(() => {
//   const tumbnailFun = async (url) => {
//     const { status, data } = await mql(url, {
//       data: {
//         avatar: {
//           selector: 'meta[property="og:image"])',
//           attr: 'content',
//           type: 'image'
//         }
//       }
//     })
    
//     console.log(mql)
//     console.log(data.image.url)
//     if(status === 'success')
//     {
//       setThumbnail(data.image.url)
//     }
//     else
//     {
//       setThumbnail('')
//     }
//   }

//   tumbnailFun(post.url);
// }, [thumbnail])



// const fetchAllReaction = async () => {
//   try {
//     const response = await fetch(`/api/reaction`)
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Reactions Data", data);
//       return data;
//     }
//     else{
//       return false;
//     }
//   } catch (error) {
//     return error;
//   }
// }


const handleImageError = () => {
  setCurrentImage(defaultImage);
};


const likeHandle = () => {
  if (session?.user) {
    const responce = fetchReaction("Like");
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
    const responce = fetchReaction("Dislike");
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
    const response = await fetch(`/api/reaction/tool/new`,{
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
      alert("Login Please")
    }
}

const handleTagClick = (tagName) => {
  if(pathName !== '/profile')
  {
    setTags(tagName);
    setPageTag(1);
    setSearchTag(true);

  }
}
function isDateBetween(targetDate, startDate, endDate) {
  return targetDate >= startDate && targetDate <= endDate;
}
// useEffect(() => {
//   // Fetch the HTML of the website
//   fetch(post.url)
//     .then(response => response.text())
//     .then(html => {
      
//         const $ = cheerio.load(html);
//         const ogImageURL = $('meta[property="og:image"]').attr('content');
//         console.log(ogImageURL)
//         setThumbnail(ogImageURL)

//     })
//     .catch(error => console.error('Error fetching or parsing the HTML:', error));

// }, [thumbnail])
  const openModal = () => {
    onModalStateChange(post.youtubeUrl);
  } 

  const shareModal = () => {
    onShareModalStateChane(post.url)
  }
  useEffect(() => {
    if (window.navigator.share) {
    setNativeShare(true);
    }

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
    else
    {
      if(post.confirmation === "Approved")
      {
        setVerification(true);
      }
    }
    // if (session?.user) {
    //   // (async() => {await fetchAllReaction();})();
    //   fetchAllReaction()
    // }
    // console.log(reactions,"-------------------Card")

    
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
      //console.log(reactions)
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
  }, []);

 
  return (
    <div key={key} className="container px-5 py-4 mx-auto  ">
          <div className="flex flex-wrap -m-5 ">
            <div className=" py-2 w-full">
              <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r overflow-hidden shadow-md  border border-gray-200 dark:border-none">
                <div className="bg-white dark:bg-[#2B3A55] group text-gray-800 dark:text-white w-full relative pr-3   flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                  <div className=" overflow-hidden">
                    <div>
                        <div className="flex items-center rounded-lg shadow md:max-w-xl " >
                        {/* <Image width={60} onError={handleImageError}  height={60} className="object-cover w-[120px] h-[120px] rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src={currentImage} alt={`${post.title}-NixerAI`} /> */}

                          {currentImage ? (
                             <Image width={60} onError={handleImageError}  height={60} className="object-cover w-[120px] h-[120px] rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src={currentImage} alt={`${post.title}-NixerAI`} />
                            ): (
                              <Image width={60} height={60} className="object-cover w-[120px] h-[120px] rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src="/assets/images/logo.png" alt={`${post.title}-NixerAI`} />
                            )}
                            {/* {!imageExists && thumbnail  ?(
                                <Image width={50}   height={50} className="object-cover w-[120px] h-[120px] md:h:36 rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src={thumbnail} alt={`${post.title}-NixerAI`} />
                                ):(
                                  <Image width={60} height={60} className="object-cover w-[120px] h-[120px] rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src="/assets/images/logo.png" alt={`${post.title}-NixerAI`} />
                                )} */}
                            <div className="w-full flex flex-col h-[120px] md:h-[130px] md:gap-1 pl-3 overflow-hidden css-0">
                                <Link href={post.url} target="_blank" className=" cursor-pointer">
                                    <div className="w-full inline-flex justify-between ">
                                        <p className="text-[13px] md:text-lg mt-1 font-semibold tracking-wide line-clamp-1 break-words css-0 w-[200px]">{post.title}</p>
                                        {badge && (
                                    
                                          <svg viewBox="0 0 48 48"  height="30" xmlns="http://www.w3.org/2000/svg"  fill="#2B3A55" className='dark:fill-white fill-blue-500'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>new-rectangle</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path> </g> </g> </g></svg>
                                        )}
                                        {!badge && verification && (
                                    
                                          <svg fill="#2B3A55" height="18" className='dark:fill-white fill-blue-500' viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                              <path clipRule="evenodd" d="M6.26701 3.45496C6.91008 3.40364 7.52057 3.15077 8.01158 2.73234C9.15738 1.75589 10.8426 1.75589 11.9884 2.73234C12.4794 3.15077 13.0899 3.40364 13.733 3.45496C15.2336 3.57471 16.4253 4.76636 16.545 6.26701C16.5964 6.91008 16.8492 7.52057 17.2677 8.01158C18.2441 9.15738 18.2441 10.8426 17.2677 11.9884C16.8492 12.4794 16.5964 13.0899 16.545 13.733C16.4253 15.2336 15.2336 16.4253 13.733 16.545C13.0899 16.5964 12.4794 16.8492 11.9884 17.2677C10.8426 18.2441 9.15738 18.2441 8.01158 17.2677C7.52057 16.8492 6.91008 16.5964 6.26701 16.545C4.76636 16.4253 3.57471 15.2336 3.45496 13.733C3.40364 13.0899 3.15077 12.4794 2.73234 11.9884C1.75589 10.8426 1.75589 9.15738 2.73234 8.01158C3.15077 7.52057 3.40364 6.91008 3.45496 6.26701C3.57471 4.76636 4.76636 3.57471 6.26701 3.45496ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill-rule="evenodd"/>
                                          </svg>                                        )}
                                    </div>
                                    <div className="w-full css-k008qs h-[40px]">
                                        <p className="w-full text-[10px] md:text-[12px] text-gray-500 dark:text-gray-400 2xl:text-md sm:mb-2 line-clamp-2 md:line-clamp-3 font-medium md:break-words css-0">{post.description}</p>
                                    </div>
                                
                                </Link>
                                <div className="w-full flex flex-col md:flex-row md:inline-flex justify-end md:justify-between text-sm h-[40px]  md:h-[80px] ">
                                    <div className="inline-flex w-full items-end justify-start p-0.5 md:mr-2 overflow-hidden text-sm font-medium transition-all rounded-sm  ease-in duration-75  ">
                                        {/* <span onClick={openModal} target="_blank" className="relative px-1 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="fill-gray-600 dark:fill-gray-400" ><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z"/></svg>                      
                                        </span> */}
                                        <span 
                                         onClick={handleWishlist}
                                        className={`${wishlist[post._id]?.wishlisted ? 'fill-red-700 ' : 'fill-gray-700 dark:stroke-gray-400' } relative px-0.5 md:px-1 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
                                        </span>
                                        {isNativeShare && <span onClick={shareModal} className="relative px-0.5 md:px-1 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>                                            
                                        </span>}
                                        <Link href={post.url} target="_blank" className="relative px-0.5 md:px-1 py-0.5 transition-all ease-in duration-75 bg-none text-white  rounded-md group-hover:bg-opacity-0">
                                        <   svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
                                        </Link>
                                        <span 
                                        onClick={likeHandle}
                                        className={`${postStates[post._id]?.liked ? 'fill-green-500' : 'fill-gray-500'} relative px-0.5 md:px-1 py-0.5 top-[2px] cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                                          <svg viewBox="0 0 512 512"  width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/></svg>                          
                                        </span>
                                        <span
                                        onClick={dislikeHandle} 
                                        className={`${postStates[post._id]?.disliked  ? 'fill-red-500' : 'fill-gray-500'}   relative px-0.5 md:px-1 py-0.5 top-[2px] cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                                          <svg viewBox="0 0 512 512" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"/></svg>                          
                                        </span>
                                    </div>
                                    <div className="inline-flex -order-1 md:order-none justify-start  md:justify-end items-end w-full dark:text-gray-400 text-[10px] md:text-xs md:p-0.5 mr-2">
                                    {postTags.map((value,key) => (
                                        <span key={key} className="chakra-text css-0 cursor-pointer mr-1" onClick={() => handleTagClick && handleTagClick(value)}>#{value}</span> 

                                    ))}
                                    </div> 
                                </div>
                            </div>
                        </div>

                        {/* <div className="w-full mt-3 text-gray-400 text-xs flex flex-row justify-between css-k008qs">
                            <div className="flex flex-row gap-2   ">
                            <div className="flex flex-row  mt-[1px]">
                                <p className="chakra-text ml-1 css-0" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p> 
                            </div>
                            </div>
                        </div> */}
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

        
  )
}

export default ToolCard