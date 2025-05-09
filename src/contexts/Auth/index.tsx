"use client";

import { Text } from "@chakra-ui/react";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { AuthContextType, User } from "types";
import { checkAuthToken } from "endpoints";
import { getStorage, deleteStorage, USER_JWT_TOKEN_NAME } from "utils";
import { useRouter } from "next/navigation";

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

    const logout = async () => {
        console.log("vou deslogar");
        deleteStorage(USER_JWT_TOKEN_NAME);
        router.push("/login");
    };

    const checkToken = async () => {
        try {
            setIsLoading(true);
            const jwt = getStorage(USER_JWT_TOKEN_NAME);

            console.log("JWT: ", jwt);

            const loggedUser = await checkAuthToken(`${jwt}`);

            console.log("User: ", loggedUser);

            if (!loggedUser) {
                logout();
            } else {
                console.log("Segue o bonde");
                setUser(loggedUser);
            }
        } catch {
            console.log("Vou pra tela de login por erro");
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
            {isLoading ? <Text>Carregando informações do Usuário...</Text> : children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
