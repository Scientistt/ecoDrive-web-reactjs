import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { PUBLIC_ROUTES } from "utils";

const intlMiddleware = createMiddleware(routing);

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
    // Primeiro, aplica o middleware de internacionalização
    const intlResponse = intlMiddleware(request);
    if (!intlResponse) return NextResponse.next(); // segurança extra

    const pathname = request.nextUrl.pathname;

    const publicRoute = PUBLIC_ROUTES.find((route) => {
        const pattern = RegExp(
            `^(/(${routing.locales.join("|")}))?(${route.path === "/" ? ["", "/"] : route.path})/?$`,
            "i"
        );
        return pattern.test(pathname);
    });

    const authToken = request.cookies.get("usrtkn");

    // Se for rota pública, segue como está
    if (publicRoute) {
        if (!authToken) return intlResponse;

        if (publicRoute.whenAuthenticated === "redirect") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/suppliers";
            return NextResponse.redirect(redirectUrl);
        }

        return intlResponse;
    }

    // Se não for rota pública e não autenticado, redireciona para login
    if (!authToken) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }

    // Se autenticado e rota protegida, segue normalmente
    return intlResponse;
}

export const config: MiddlewareConfig = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};
