// app/layout.tsx ou app/[...]/layout.tsx (caso esteja usando catch-all route layout)
import "./globals.css";
import { Provider } from "components/ui/provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import { NavbarProvider, AuthContextProvider, ContextMenuProvider } from "contexts";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { routing } from "i18n/routing";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // ⬇️ Lê o cookie diretamente
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt";

    // Segurança: garante que o locale está entre os suportados
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        // Padrão
        throw new Error(`Locale inválido: ${locale}`);
    }

    // Direção do texto
    const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
    console.log("QQ???", locale);
    const messages = await getMessages({ locale });

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Provider>
                        <ToastContainer />
                        <AuthContextProvider>
                            <NavbarProvider>
                                <ContextMenuProvider>{children}</ContextMenuProvider>
                            </NavbarProvider>
                        </AuthContextProvider>
                    </Provider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
