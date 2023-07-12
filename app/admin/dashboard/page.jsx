"use client";

import { useSession } from "next-auth/react";
import {  } from "next/navigation";

const Dashboard = () => {
    const {data: session} = useSession();
    const router = useRouter();

    // Redirect to login page if session is invalid
  if (!session) {
    router.replace('/');
    return null;
  }


  return (
    <>
    {session && (
        <div>Hello</div>
        )}
    </>
  )
}

export default Dashboard