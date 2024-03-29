// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const token = await getToken({
//     req: req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const publicPaths = path === "/" || path === "/signup" || path === "/sigin";

//   if (publicPaths && token) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }
//   if (!publicPaths && !token) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }
// }

export { default } from 'next-auth/middleware'

export const config = {
  matcher: ["/dashboard", "/companies"],
};
