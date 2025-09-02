export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/community/:path*",
    "/studio/:path*",
    "/members/:path*",
    "/profile/:path*",
    "/booking/:path*",
    "/events/:path*",
  ],
}
