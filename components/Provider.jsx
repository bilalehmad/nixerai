"use client";
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';
import { useRouter } from  "next/navigation";

const Provider = ({children,session}) => {
  const router = useRouter();
  return (
   <ThemeProvider attribute="class">
    <SessionProvider session={session}>
    
      {children}
    </SessionProvider>
    </ThemeProvider>
  )
}

export default Provider