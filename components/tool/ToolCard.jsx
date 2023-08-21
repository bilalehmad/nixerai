"use client";
import { useState ,useEffect} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import mql from "@microlink/mql";

const cheerio = require('cheerio');

const ToolCard = ({post,key, handleEdit,reactions, handleDelete, setPageTag, setTags,setSearchTag, onModalStateChange,onShareModalStateChane}) => {
  const {data: session} = useSession();
  const [thumbnail, setThumbnail] = useState('');
  const [isNativeShare, setNativeShare] = useState(false);
  const pathName = usePathname();
  const [badge, setBadge] = useState(false)
  const [postTags, setPostTags] = useState([]);
  const [postStates, setPostStates] = useState({});

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
const handleTagClick = (tagName) => {
  setTags(tagName);
  setPageTag(1);
  setSearchTag(true);
}
useEffect(() => {
  // Fetch the HTML of the website
  fetch(post.url)
    .then(response => response.text())
    .then(html => {
      
        const $ = cheerio.load(html);
        const ogImageURL = $('meta[property="og:image"]').attr('content');
        console.log(ogImageURL)
        setThumbnail(ogImageURL)

    })
    .catch(error => console.error('Error fetching or parsing the HTML:', error));

}, [thumbnail])
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

    const date = new Date();
    date.setDate(date.getDate() - 10);
    let number = date.getMonth()+1;
    let stringNumber = number.toString().padStart(2, '0');
    const afterDays = date.getDate()+'/'+ stringNumber +'/'+date.getFullYear();
    
    const getDate = post.timestamp.toString();
    const postDate = getDate.split('T',1);
    const setDate = postDate[0].split('-');
    const day = setDate[0];
    const month = setDate[1];
    const year = setDate[2];
    const todate = year + "/" + month + "/" + day;
    if(todate > afterDays)
    {
      setBadge(true)
    }
    // if (session?.user) {
    //   // (async() => {await fetchAllReaction();})();
    //   fetchAllReaction()
    // }
    // console.log(reactions,"-------------------Card")
    if(reactions.length > 0)
    {
      console.log(reactions)
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
                            {thumbnail ? (
                            <Image width={50} height={50} className="object-cover w-[120px] h-[120px] md:h:36 rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src={thumbnail} alt="" />
                            ): (
                              <Image width={60} height={60} className="object-cover w-[120px] h-[120px] rounded-l-lg md:h-36  md:w-36 md:rounded-none md:rounded-l-lg " src="https://flow-prompt-covers.s3.us-west-1.amazonaws.com/icon/illustrative/illus_5.png" alt="" />
                            )}
                            <div className="w-full flex flex-col h-[120px] md:h-[130px] md:gap-1 pl-3 overflow-hidden css-0">
                                <Link href={post.url} target="_blank" className=" cursor-pointer">
                                    <div className="w-full inline-flex justify-between ">
                                        <p className="text-[13px] md:text-lg mt-1 font-semibold tracking-wide line-clamp-1 break-words css-0 w-[200px]">{post.title}</p>
                                        {!badge && (
                                    
                                          <svg viewBox="0 0 48 48"  height="30" xmlns="http://www.w3.org/2000/svg"  fill="#2B3A55" className='dark:fill-white fill-blue-500'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>new-rectangle</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path> </g> </g> </g></svg>
                                        )}
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
                                        <span className="relative px-0.5 md:px-1 py-0.5 cursor-pointer transition-all ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-gray-600 dark:stroke-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                                        
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
                                          <svg viewBox="0 0 512 512" width="18" height="18"  className="w-3.5 h-3.5 md:w-4 md:h-4"   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.45,432.7H261.8a141.5,141.5,0,0,1-49.52-8.9l-67.5-25.07a15,15,0,0,1,10.45-28.12l67.49,25.07a111.79,111.79,0,0,0,39.08,7h86.65a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30H368.9a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30h20.44a14.21,14.21,0,0,0,10.05-24.26,14.08,14.08,0,0,0-10.05-4.16,15,15,0,0,1,0-30h20.45a14.21,14.21,0,0,0,10-24.26,14.09,14.09,0,0,0-10-4.17H268.15A15,15,0,0,1,255,176.74a100.2,100.2,0,0,0,9.2-29.33c3.39-21.87-.79-41.64-12.42-58.76a12.28,12.28,0,0,0-22.33,7c.49,51.38-23.25,88.72-68.65,108a15,15,0,1,1-11.72-27.61c18.72-8,32.36-19.75,40.55-35.08,6.68-12.51,10-27.65,9.83-45C199.31,77,211,61,229.18,55.34s36.81.78,47.45,16.46c24.71,36.36,20.25,74.1,13.48,97.21H409.79a44.21,44.21,0,0,1,19.59,83.84,44.27,44.27,0,0,1-20.44,58.42,44.27,44.27,0,0,1-20.45,58.43,44.23,44.23,0,0,1-40,63Z"/><path d="M155,410.49H69.13a15,15,0,0,1-15-15V189.86a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V395.49A15,15,0,0,1,155,410.49Zm-70.84-30H140V204.86H84.13Z"/></g></svg>
                                        </span>
                                        <span
                                        onClick={dislikeHandle} 
                                        className={`${postStates[post._id]?.disliked  ? 'fill-red-500' : 'fill-gray-500'}   relative px-0.5 md:px-1 py-0.5 top-[2px] cursor-pointer  ease-in duration-75 bg-none  rounded-md group-hover:bg-opacity-0`}>
                                          <svg viewBox="0 0 512 512" width="18" height="18"  className=" w-3.5 h-3.5 md:w-4 md:h-4 "   xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M242.28,427.39a43.85,43.85,0,0,1-13.1-2c-18.22-5.69-29.87-21.64-29.69-40.62.16-17.35-3.15-32.5-9.83-45-8.19-15.33-21.83-27.13-40.55-35.08A15,15,0,1,1,160.83,277c45.4,19.26,69.14,56.6,68.65,108a12.28,12.28,0,0,0,22.33,7c28.34-41.71,3.47-87.63,3.22-88.09a15,15,0,0,1,13.12-22.27H409.79a14.22,14.22,0,0,0,0-28.43H389.34a15,15,0,1,1,0-30,14.2,14.2,0,0,0,14.21-14.21,14.23,14.23,0,0,0-14.21-14.21H368.9a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H348.45a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H261.8a111.69,111.69,0,0,0-39.07,7l-67.5,25.07A15,15,0,0,1,144.78,82l67.5-25.07A141.5,141.5,0,0,1,261.8,48h86.65a44.25,44.25,0,0,1,40,63,44.27,44.27,0,0,1,20.45,58.43,44.27,44.27,0,0,1,20.44,58.42,44.21,44.21,0,0,1-19.59,83.84H290.11c6.77,23.11,11.23,60.85-13.48,97.22A41.21,41.21,0,0,1,242.28,427.39Z"/><path d="M155,305.85H69.13a15,15,0,0,1-15-15V85.21a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V290.85A15,15,0,0,1,155,305.85Zm-70.84-30H140V100.21H84.13Z"/></g></svg>
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

        
  )
}

export default ToolCard