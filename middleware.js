import { NextResponse , NextRequest} from 'next/server'
 
// This function can be marked `async` if using `await` inside
export const  middleware =  async (request)  => {
    const response = NextResponse.next();
    response.cookies.set({
        name: 'Set-Cookie',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV  !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: '/',
      });
     return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/chat/:path*',
}