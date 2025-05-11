import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
