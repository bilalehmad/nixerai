"use client";
import {useState} from 'react'

function PriceCard({data,short,highlight}) {
    const [price, setPrice] = useState(data)
  return (
    <>
        <div className="css-1vzolaf py-4">
            <h2 className={`chakra-heading font-medium ${highlight === "TRUE" ? ("text-gray-50") : ("text-gray-800")}   dark:text-white`}>{short}</h2>
            <p className={`chakra-text ${highlight === "TRUE" ? ("text-gray-300") : ("text-gray-700")}  text-xs dark:text-[#9094a6]`}>Joined through any of these ways:</p>
            <hr aria-orientation="horizontal" className="chakra-divider css-1ko8k8q py-2 dark:border-gray-400" />
            
            {price.map((item,index) => (
                    <div className="chakra-stack css-ywqc9 py-2 px-2">
                        <div className="css-1bf7e4w">
                            <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                        </div>
                        <p className={`chakra-text css-763daw ${highlight === "TRUE" ? ("text-gray-50") : ("text-gray-800")} dark:text-gray-50 text-sm `}>{item}</p>
                        {/* <svg color="#777777" width="calc(1rem * 1.0000)" height="calc(1rem * 1.0000)" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8Z"></path><path d="M7.25928 9.75V9.70313C7.26449 9.20573 7.31657 8.8099 7.41553 8.51563C7.51449 8.22135 7.65511 7.98307 7.8374 7.80078C8.01969 7.61849 8.23844 7.45052 8.49365 7.29688C8.6473 7.20313 8.78532 7.09245 8.90771 6.96484C9.03011 6.83464 9.12646 6.6849 9.19678 6.51563C9.26969 6.34635 9.30615 6.15885 9.30615 5.95312C9.30615 5.69792 9.24626 5.47656 9.12646 5.28906C9.00667 5.10156 8.84652 4.95703 8.646 4.85547C8.44548 4.75391 8.22282 4.70312 7.97803 4.70312C7.76449 4.70312 7.55876 4.7474 7.36084 4.83594C7.16292 4.92448 6.99756 5.0638 6.86475 5.25391C6.73193 5.44401 6.65511 5.69271 6.63428 6H5.6499C5.67074 5.55729 5.78532 5.17839 5.99365 4.86328C6.20459 4.54818 6.48193 4.30729 6.82568 4.14062C7.17204 3.97396 7.55615 3.89062 7.97803 3.89062C8.43636 3.89062 8.8348 3.98177 9.17334 4.16406C9.51449 4.34635 9.77751 4.59635 9.9624 4.91406C10.1499 5.23177 10.2437 5.59375 10.2437 6C10.2437 6.28646 10.1994 6.54557 10.1108 6.77734C10.0249 7.00911 9.8999 7.21615 9.73584 7.39844C9.57438 7.58073 9.37907 7.74219 9.1499 7.88281C8.92074 8.02604 8.73714 8.17708 8.59912 8.33594C8.4611 8.49219 8.36084 8.67839 8.29834 8.89453C8.23584 9.11068 8.20199 9.38021 8.19678 9.70313V9.75H7.25928ZM7.75928 12.0625C7.56657 12.0625 7.4012 11.9935 7.26318 11.8555C7.12516 11.7174 7.05615 11.5521 7.05615 11.3594C7.05615 11.1667 7.12516 11.0013 7.26318 10.8633C7.4012 10.7253 7.56657 10.6563 7.75928 10.6563C7.95199 10.6563 8.11735 10.7253 8.25537 10.8633C8.39339 11.0013 8.4624 11.1667 8.4624 11.3594C8.4624 11.487 8.42985 11.6042 8.36475 11.7109C8.30225 11.8177 8.21761 11.9036 8.11084 11.9688C8.00667 12.0312 7.88949 12.0625 7.75928 12.0625Z"></path></svg> */}
                    </div>
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Up to 1,700 upscales or unzooms per month</p>
                    // </div>
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Up to 4,250 background removals per month</p>
                    // </div>
                    // <hr aria-orientation="horizontal" className="chakra-divider css-fx6kne" />
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Up to 5 pending jobs</p>
                    // </div>
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Private generations</p>
                    // </div>
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Priority infrastructure</p>
                    // </div>
                    // <div className="chakra-stack css-ywqc9">
                    //     <div className="css-1bf7e4w">
                    //         <svg width="calc(1rem * 1.3750)" height="calc(1rem * 1.4375)" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9856 16.5148C17.2542 16.7834 17.2542 17.2189 16.9856 17.4874C16.8518 17.6213 16.6758 17.6891 16.4998 17.6891C16.3238 17.6891 16.1478 17.6222 16.0139 17.4874L10.9998 12.4733L5.9856 17.4874C5.85177 17.6213 5.67577 17.6891 5.49977 17.6891C5.32377 17.6891 5.14777 17.6222 5.01394 17.4874C4.74535 17.2189 4.74535 16.7834 5.01394 16.5148L10.0281 11.5007L5.01394 6.48655C4.74535 6.21797 4.74535 5.78252 5.01394 5.51394C5.28252 5.24535 5.71794 5.24535 5.98653 5.51394L11.0007 10.5281L16.0148 5.51394C16.2834 5.24535 16.7189 5.24535 16.9874 5.51394C17.256 5.78252 17.256 6.21797 16.9874 6.48655L11.9733 11.5007L16.9856 16.5148Z" fill="#E45F35"></path></svg>
                    //     </div>
                    //     <p className="chakra-text css-763daw">Relaxed generation queue</p>
                    // </div>
                    
            ))}
        </div>

 {/* 

        <div key={index} className="py-2 px-4 flex items-center h-[50px]">
         <svg  className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>            
         <span className="px-2 text-sm h-[20px] text-gray-700 dark:text-gray-300">{item}</span>
      

       <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>

            <span className="mx-4 text-gray-700 dark:text-gray-300">Own analytics platform</span>
        </div>

        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>

            <span className="mx-4 text-gray-700 dark:text-gray-300">Chat support</span>
        </div>

        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>

            <span className="mx-4 text-gray-700 dark:text-gray-300">Optimize hashtags</span>
        </div>

        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>

            <span className="mx-4 text-gray-700 dark:text-gray-300">Unlimited users</span>
        </div> 
    </div>*/}
    </>
    

  )
}

export default PriceCard