export interface User {
    id: bigint;
    slug: string;
    created_at: Date;
    name: string;
    sex?: string;
    login: string;
    status: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}
