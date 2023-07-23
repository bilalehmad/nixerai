"use client";

import ChatGPT from "@components/ChatGPT";
import Image from 'next/image';

function PromptView(props) {
const post = props.data;
const {title,teasor,example,sample} = post;
  return (
    <section className='w-full max-w-full flex justify-between mt-20'>
        <div className="container px-5 py-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='col-span-1 p-5'>
                    <div className='flex flex-wrap'>
                        <Image alt="prompt image" height={200} width={100} src="https://flow-prompt-covers.s3.us-west-1.amazonaws.com/icon/illustrative/illus_5.png" className="rounded-md opacity-90 transition-all h-60 w-full group-hover:opacity-100  object-cover" />
                    </div>
                    <h1 className='font-staoshi font-semibold text-2xl mt-2'>
                        <span className='text-gray-900 dark:text-white  text-left'>{title}</span>
                    </h1>
                    <hr className='my-4'/>
                    <p className='text-gray-900 dark:text-white font-semibold text-sm'>{teasor}</p>
                    <div className='py-5'>
                            <h5 className='font-staoshi font-bold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Example</span>
                            </h5>
                            <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{example}</p>
                        </div>
                 </div>
                 <div className='col-span-1 py-5 w-full '>
                    <div className=' text-gray-900 dark:text-white border-2 w-full rounded-md'>
                        <div className='px-5 pt-5'>
                            <h1 className='font-staoshi font-semibold text-xl '>
                                <span className=' text-gray-900 dark:text-white text-left'>Prompt Detail</span>
                            </h1>
                        </div>
                        <div className=' px-5 py-2 scroll-m-2 '>
                            <h5 className='font-staoshi font-semibold text-sm py-5'>
                                <span className=' text-gray-900 dark:text-white  text-left'>Sample</span>
                            </h5>
                            <div className='h-250px] overflow-x-auto'>
                                <p className='text-gray-900 dark:text-white font-semibold text-sm pb-5'>{sample}</p>
                            </div>
                        </div>
                        <ChatGPT title={title} sample={sample}/>
                    </div>
                 </div>
            </div>
        </div>
    </section>
  )
}

export default PromptView