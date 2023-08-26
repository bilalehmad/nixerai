"use client";
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';

const Provider = ({children}) => {
  return (
    
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      <ThemeProvider attribute="class">
          {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Provider