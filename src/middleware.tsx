import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "utils";

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

// Aqui não usamos mais next-intl middleware
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authToken = request.cookies.get("usrtkn");

    // Verifica se a rota é pública
    const publicRoute = PUBLIC_ROUTES.find((route) => {
        const pattern = RegExp(`^(${route.path === "/" ? ["", "/"] : route.path})/?$`, "i");
        return pattern.test(pathname);
    });

    if (publicRoute) {
        if (!authToken) return NextResponse.next();

        if (publicRoute.whenAuthenticated === "redirect") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/suppliers";
            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next();
    }

    // Se não for rota pública e não autenticado, redireciona para login
    if (!authToken) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};
