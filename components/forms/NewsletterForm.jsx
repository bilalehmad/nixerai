"use client";

import Image from 'next/image';
import {useState,useEffect} from 'react';

const NewsletterForm = () => {
    const [email, setEmail] = useState('')
    const [submitting, setsubmitting] = useState(false);
    
    function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        alert("You have entered an invalid email address!")
        return (false)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // alert(email)
        const validInput = ValidateEmail(email);

        if (!validInput) {
            return null;
        }
        
        try {
            const respose = await fetch('/api/newsletter',{
                method :'POST',
                body : JSON.stringify({
                    email: email
                })
            })
            if (respose.ok) {

              setsubmitting(true);
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            // setsubmitting(false)
        }
    }
  return (
    <>
     <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label for="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input onChange={(e) => setEmail(e.target.value)}
                       className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500" 
                       placeholder="Enter your email" type="email" id="email" required />
                  </div>
                  <div>
                      <button disabled={submitting} type="submit" onClick={handleClick} className="transition ease-in py-3 px-3 w-full fill-white text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-blue-700 border-blue-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800  dark:bg-blue-600 dark:hover:bg-blue-700 ">
                        {submitting ? (
                           <span className='inline-flex'>
                            <svg  viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>                            Subcribed
                            </span>
                        ) :  ('Subscribe')}
                        </button>
                  </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>

          <div className='flex justify-center py-14'>
             <a href="https://www.producthunt.com/posts/nixer-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nixer&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=414827&theme=light" alt="Nixer - A&#0032;Hub&#0032;of&#0032;GPT&#0032;Prompts | Product Hunt" css={"width: 250px; height: 54px;" } width="250" height="54" /></a>
         </div>
    </>
  )
}

export default NewsletterForm