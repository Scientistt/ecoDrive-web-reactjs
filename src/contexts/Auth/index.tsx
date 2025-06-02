"use client";

import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { AuthContextType, User } from "types";
import { checkAuthToken } from "endpoints";
import { getStorage, deleteStorage, USER_JWT_TOKEN_NAME, PUBLIC_ROUTES } from "utils";
import { useRouter, usePathname } from "next/navigation";
// import { FullPageLoading } from "components";
import { toaster } from "components";

const defaultValues = {
    user: null,
    setUser: () => {},
    logout: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValues);

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
        deleteStorage(USER_JWT_TOKEN_NAME);
        setUser(null);

        toaster.create({
            type: "info",
            title: "Usuário desconectado: " + isLoading,
            description: "Redirecionando para a pagina de login"
        });

        const publicRoute = PUBLIC_ROUTES.find((route) => route.path === pathname);

        if (!publicRoute) {
            router.push("/login");
        }
    };

    const checkToken = async () => {
        try {
            setIsLoading(true);
            const jwt = getStorage(USER_JWT_TOKEN_NAME);

            const loggedUser = await checkAuthToken(`${jwt}`);

            if (!loggedUser) {
                logout();
            } else {
                setUser(loggedUser);
            }
        } catch {
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
            {/* {isLoading ? <FullPageLoading message="Verificando login" pt="50px" /> : children} */}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
