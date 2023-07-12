"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import { useTheme } from "next-themes";

const Nav = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  //const isuserLoggedIn = true;
  const {data: session} = useSession();
  //Need to be Learn
  const [providers , setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const [enabled, setEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  }, [])
  return (

    <nav className='flex-between w-full pt-3'>
      <Link  href="/" className='flex gap-1 flex-center'>
        <Image
          src="/assets/images/logo.png"
          alt='Promptopia Logo' 
          width={30} 
          height={30} 
          className='object-contain' /> 
          <p className='logo_text'>NixerAI</p> 
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <span className='mr-3 mt-1 cursor-pointer' onClick={toggleMode}>
            { isDarkMode ? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFE569" stroke="#FFA41B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ): (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFA41B" stroke="#F86F03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
             )}
            </span>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
              </Link>
              <Link href="/create-ai-tool" className='black_btn'>
              Create AI Tool
              </Link>

              <button type='button' className='outline_btn' onClick={signOut}>
                Sign Out
              </button>

              <Link href="/profile" >
                <Image 
                src={session?.user.image}
                width={37}
                height={37} 
                className='rounded-full'
                alt='Profile'
                />
                
              </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers)
              .map((providers) => (
                <button
                  type='button'
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className='black_btn'
                  >
                    Sign In
                  </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
                <Image 
                src={session?.user.image}
                width={37}
                height={37} 
                className='rounded-full'
                alt='Profile'
                onClick={() => setToggleDropdown(
                  (prev) => !prev
                )}
                />

                

                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link 
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <Link 
                    href='/create-ai-tool'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                    >
                      Create AI Tool
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
                
            </div>
          ): (
            <>
            {providers && Object.values(providers)
              .map((providers) => (
                <button
                  type='button'
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className='black_btn'
                  >
                    Sign In
                  </button>
              ))}
          </>
          )}
      </div>

    </nav>
  )
}

export default Nav