"use client";
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';

const Provider = ({children}) => {
  console.log(session,"usersession")
  return (
    
    <SessionProvider>
      <ThemeProvider attribute="class">
          {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Provider