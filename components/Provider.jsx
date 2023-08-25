"use client";
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';

const Provider = ({children,session}) => {
  return (
   <ThemeProvider attribute="class">
    <SessionProvider session={session} refetchOnWindowFocus={false}>
    
      {children}
    </SessionProvider>
    </ThemeProvider>
  )
}

export default Provider