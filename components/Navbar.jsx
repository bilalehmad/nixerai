"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import { useTheme } from "next-themes";

const Navbar = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    //const isuserLoggedIn = true;
    const {data: session} = useSession();
    //Need to be Learn
    const [providers , setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
  
    const [enabled, setEnabled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [alert, setAlert] = useState(true)
    const [hoverState, setHoverState] = useState(false);
  
    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(isDarkMode ? 'light-mode' : 'dark-mode');
      root.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
    }, []);
    const toggleMode = () => {
      theme == "dark"? setTheme('light'): setTheme("dark")
      setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
      const setUpProviders = async () => {
        const response = await getProviders();
  
        setProviders(response);
      }
  
      setUpProviders();
    }, []);

    
  useEffect(() => {
    const handleScroll = () => {
        const scrollThreshold = 100; // Adjust this value as needed
            if (window.scrollY > scrollThreshold) {
            setAlert(false);
            } else {
            setAlert(true);
            }
        };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const OpenDropdown = () => {
        setHoverState((prev) => !prev);
    }
    const CloseDropdown = () => {
        setHoverState(false);
    }
  return (
       <>
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {alert && (
            <div className='flex items-center justify-center bg-blue-900 h-7'>
                <div className='flex items-center justify-between'>
                    <span className='w-5 h-5 mr-2 -ml-1'>
                    <svg className="feather feather-alert-triangle" fill="#F9D949" height="20" width="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    </span>
                    <p className="text-gray-50 font-medium text-xs mt-1">Beta Version -This Site is Under Testing </p>
                </div>
            </div>
        )}
        <div className="px-4 py-3 lg:px-7 lg:pl-3">
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
                {/* <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button> */}
                <Link  href="/" className='flex gap-1 flex-center'>
                    <Image
                    src="/assets/images/logo.svg"
                    alt='Promptopia Logo' 
                    width={22} 
                    height={22} 
                    className='object-contain' /> 
                    <p className='logo_text'>NixerAI</p> 
                </Link>
            </div>
            <div className="flex items-center">
                <ul className="flex flex-wrap items-center mt-3 text-sm font-semibold text-[#2B3A55]  dark:text-gray-400 sm:mt-0">
                    <li className='' >
                        {/* <a href="#" className="mr-4 hover:text-[#2B3A55] p-2 md:mr-6 "  >Submit</a> */}
                        <button id="dropdownNavbarLink" onClick={OpenDropdown}  data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full  mr-4 hover:text-[#2B3A55] md:mr-6  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#2B3A55] md:p-0 md:w-auto dark:hover:text-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            Submit 
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        {hoverState && (
                            <div id="dropdownNavbar" className="relative right-10 z-10 font-normal bg-white divide-y mx-1 divide-gray-100 shadow  dark:bg-gray-700 dark:divide-gray-600">
                            
                                <ul className="absolute z-20 px-3 text-sm text-[#2B3A55] rounded-md dark:bg-gray-700 bg-white shadow dark:text-gray-400 border border-gray-300 dark:border-gray-500" aria-labelledby="dropdownLargeButton">
                                    <li className='py-1.5'>
                                        <a href="#" className="rounded-md text-center font-semibold inline-flex items-center px-5 hover:text-blue-700  dark:hover:text-white dark:stroke-gray-400 dark:hover:stroke-white stroke-[#2B3A55] hover:stroke-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" className="w-4 h-4 mr-2 -ml-1" height="20" viewBox="0 0 24 24" fill="none" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>          
                                            Prompt
                                        </a>
                                    </li>
                                    <li className='py-1.5'>
                                        <a href="#" className="rounded-md text-center font-semibold inline-flex items-center px-5 hover:text-blue-700 dark:stroke-gray-400 dark:hover:stroke-white dark:hover:text-white stroke-[#2B3A55] hover:stroke-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="w-4 h-4 mr-2 "  viewBox="0 0 24 24" fill="none" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
                                            Tools
                                        </a>
                                    </li>
                                
                                </ul>
                            </div>
                        )}
                        
                    </li>
                    <li>
                        <a href="/newsletter" className="mr-4 font-semibold hover:text-[#2B3A55] dark:hover:text-gray-50 md:mr-6">News</a>
                    </li>
                    <li>
                        <a href="/pricing" className="mr-4 font-semibold hover:text-[#2B3A55]  dark:hover:text-gray-50 md:mr-6">Pricing</a>
                    </li>
                    <li>
                        <a href="/blogs" className="hover:text-[#2B3A55] font-semibold  dark:hover:text-gray-50">Blogs</a>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <div className="flex items-center ml-3">
                    <span className='mr-3 mt-1 cursor-pointer' onClick={toggleMode}>
                        { isDarkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFE569" stroke="#FFA41B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ): (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFA41B" stroke="#F86F03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                        )}
                    </span>
                    <div>
                    {session?.user ? (
                    <button type="button" className="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <Image  width={37} height={37} onClick={() => setToggleDropdown((prev) => !prev)}  className="w-5 h-5 rounded-full" src={session?.user.image} alt="user photo" />
                    </button>
                    ):(
                        providers && Object.values(providers).map((providers) => (
                        <button type='button' key={providers.name} onClick={() => signIn(providers.id)} className="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <Image  width={37} height={37}  className="w-5 h-5 rounded-full" src="/assets/images/google.svg" alt="user photo" />
                        </button>
                        ))
                    )}
                    </div>
                    {toggleDropdown && (
                    <div className="fixed z-50 top-[70px] right-6 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                        {/* <div className="px-4 py-3" role="none">
                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                            Neil Sims
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            neil.sims@flowbite.com
                            </p>
                        </div> */}
                        <ul className="py-2 px-4" role="none">
                            {/* <li>
                            <a href="#" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                            </li>*/}
                            {session?.user.role === "client" && (
                            <li>
                            <a href="/profile" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                            </li> 
                            )}
                            {session?.user.role === "admin" && (
                            <li>
                            <a href="/dashboard" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                            </li> 
                            )}
                            
                            <li>
                            <button  onClick={() => {setToggleDropdown(false);signOut();}} className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                            </li>
                        </ul>
                    </div>)}
                </div>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar