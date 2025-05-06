import "./globals.css";
// import { systemConfig } from "themes/system/index";
import { Provider } from "components/ui/provider";
// import { ColorModeProvider } from "components/ui/color-mode";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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
                {/* <ChakraProvider value={defaultSystem}>
                    <ColorModeProvider {...props} />
                    {children} 
                </ChakraProvider> */}

                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
