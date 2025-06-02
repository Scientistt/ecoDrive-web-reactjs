import "../globals.css";
// import { systemConfig } from "themes/system/index";
import { Provider } from "components/ui/provider";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { ToastContainer } from "react-toastify";
import { routing } from "i18n/routing";
import { notFound } from "next/navigation";
import { NavbarProvider, AuthContextProvider, ContextMenuProvider } from "contexts";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
    title: "ecoDrive",
    description: "Armazene com consciência. Use com liberdade."
};

export default async function LocaleLayout(props: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
    const { children } = props;
    const { locale } = await props.params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html suppressHydrationWarning lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Provider>
                        <ToastContainer />
                        <AuthContextProvider>
                            <NavbarProvider>
                                {/* ToDo: Criar um Provider para cobrir a tela
                                enquanto o provider de authenticação carrega dados do usuário */}
                                <ContextMenuProvider>{children}</ContextMenuProvider>
                            </NavbarProvider>
                        </AuthContextProvider>
                    </Provider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
