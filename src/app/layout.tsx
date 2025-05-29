import "./globals.css";
// import { systemConfig } from "themes/system/index";
import { Provider } from "components/ui/provider";

import { ToastContainer } from "react-toastify";

import { NavbarProvider, AuthContextProvider, ContextMenuProvider } from "contexts";
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
                    <ToastContainer />
                    <AuthContextProvider>
                        <NavbarProvider>
                            <ContextMenuProvider>{children}</ContextMenuProvider>
                        </NavbarProvider>
                    </AuthContextProvider>
                </Provider>
            </body>
        </html>
    );
}
