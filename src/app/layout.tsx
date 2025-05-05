import "./globals.css";
import { Provider } from "../components/ui/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "🌿ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
    const { children } = props;
    return (
        <html suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
