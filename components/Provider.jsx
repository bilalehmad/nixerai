"use client";
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';

const Provider = ({children}) => {
  return (
   <ThemeProvider attribute="class">
    <SessionProvider>
      {children}
    </SessionProvider>
    </ThemeProvider>
  )
}

export default Provider