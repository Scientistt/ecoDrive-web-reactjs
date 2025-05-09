import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [
    {
        path: "/register",
        whenAuthenticated: "redirect"
    },
    {
        path: "/login",
        whenAuthenticated: "redirect"
    },
    {
        path: "/about",
        whenAuthenticated: "next"
    }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
    const publicRoute = publicRoutes.find((route) => route.path === request.nextUrl.pathname);
    const authToken = request.cookies.get("usrtkn");

    if (!authToken && publicRoute) return NextResponse.next();

    if (!authToken && !publicRoute) {
        const redurectUrl = request.nextUrl.clone();
        redurectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redurectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redurectUrl = request.nextUrl.clone();
        redurectUrl.pathname = "/";
        return NextResponse.redirect(redurectUrl);
    }

    if (authToken && !publicRoute) return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
    ]
};
