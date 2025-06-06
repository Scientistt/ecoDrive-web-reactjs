export const USER_JWT_TOKEN_NAME = "usrtkn";

export const PUBLIC_ROUTES = [
    {
        path: "/register",
        whenAuthenticated: "redirect"
    },
    {
        path: "/login",
        whenAuthenticated: "redirect"
    },
    {
        path: "/",
        whenAuthenticated: "next"
    }
] as const;

export const NEXT_LOCALE_TOKEN_NAME = "NEXT_LOCALE";

export const PAGINATION_DEFAULT_ELEMENTS_PER_PAGE = 10;

export const PAGINATION_DEFAULT_SUPPLIERS_PER_PAGE = 8;
