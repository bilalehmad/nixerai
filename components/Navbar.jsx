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
  return (
       <>
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {alert && (
            <div className='flex items-center justify-center bg-blue-900 h-7'>
                <div className='flex items-center justify-between'>
                    <span className='w-5 h-5 mr-2 -ml-1'>
                    <svg class="feather feather-alert-triangle" fill="#F9D949" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    </span>
                    <p className="text-gray-50 font-medium text-xs mt-1">Beta Version -This Site is Under Testing </p>
                </div>
            </div>
        )}
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
                {/* <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button> */}
                <Link  href="/" className='flex gap-1 flex-center'>
                    <Image
                    src="/assets/images/logo.png"
                    alt='Promptopia Logo' 
                    width={22} 
                    height={22} 
                    className='object-contain' /> 
                    <p className='logo_text'>NixerAI</p> 
                </Link>
            </div>
            <div class="flex items-center">
                <div class="flex items-center ml-3">
                    <span className='mr-3 mt-1 cursor-pointer' onClick={toggleMode}>
                        { isDarkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFE569" stroke="#FFA41B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ): (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFA41B" stroke="#F86F03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                        )}
                    </span>
                    {/*<div>
                    <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                    </button>
                    </div>
                    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                    <div class="px-4 py-3" role="none">
                        <p class="text-sm text-gray-900 dark:text-white" role="none">
                        Neil Sims
                        </p>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        neil.sims@flowbite.com
                        </p>
                    </div>
                    <ul class="py-1" role="none">
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                        </li>
                    </ul>
                    </div> */}
                </div>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar