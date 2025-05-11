import "./globals.css";
// import { systemConfig } from "themes/system/index";
import { Provider } from "components/ui/provider";
// import { AuthProvider } from "contexts";
// import { ColorModeProvider } from "components/ui/color-mode";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Navbar } from "components";

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
                    <Navbar />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
