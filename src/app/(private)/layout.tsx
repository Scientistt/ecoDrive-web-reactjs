import type { Metadata } from "next";
import { AuthContextProvider } from "contexts";
import { Navbar } from "components";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
    );
}
