import type { Metadata } from "next";

import { Navbar } from "components";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
