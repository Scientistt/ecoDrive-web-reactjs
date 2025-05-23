import "./globals.css";
// import { systemConfig } from "themes/system/index";
import { Provider } from "components/ui/provider";

import { Toaster } from "components";
import { NavbarProvider, AuthContextProvider } from "contexts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
    const { children } = props;

    return (
        <html suppressHydrationWarning={true}>
            <body>
                <Provider>
                    <Toaster />
                    <AuthContextProvider>
                        <NavbarProvider>{children}</NavbarProvider>
                    </AuthContextProvider>
                </Provider>
            </body>
        </html>
    );
}
