import type { Metadata } from "next";
import { AuthContextProvider } from "contexts";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
    return <AuthContextProvider>{children}</AuthContextProvider>;
}
