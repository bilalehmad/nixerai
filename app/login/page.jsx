
"use client";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleButton from 'react-google-button';

const UserLogin = () => {
  

  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to dashboard if session is valid
  if (session) {
    router.replace('/admin/dashboard');
  }
  return (
    <div className="w-full mt-8 dark:bg-gray-700 sm:w-1/3 bg-white  flex items-start justify-center h-[400px] shadow-lg border border-gray-300 rounded-md ">
        <button 
            type='button'
            className="flex items-center mt-16 bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none ">
              <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span className='ml-2'>Login with Google</span>
              </button>
    </div>
  )
}

export default UserLogin