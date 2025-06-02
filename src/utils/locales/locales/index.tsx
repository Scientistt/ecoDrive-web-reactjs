import { Locale } from "types";
import { countryFlags } from "assets";

// import {
//     LuShieldCheck,
//     LuShieldEllipsis,
//     LuPackage,
//     LuFlag,
//     LuFileX2,
//     LuBrain,
//     LuPackageOpen,
//     LuPackage2
// } from "react-icons/lu";

const LOCALES: Record<string, Locale> = {
    pt: {
        key: "pt",
        flag: countryFlags.brazil,
        name: "Português"
    },
    en: {
        key: "en",
        flag: countryFlags.united_states,
        name: "Inglês"
    },
    es: {
        key: "es",
        flag: countryFlags.spain,
        name: "Espanhol"
    },
    ja: {
        key: "ja",
        flag: countryFlags.japan,
        name: "Japonês"
    },
    zh: {
        key: "zh",
        flag: countryFlags.china,
        name: "Chinês (Simplificado)"
    },
    unknown: {
        key: "un",
        flag: countryFlags.united_kingdom,
        name: "undefined"
    }
};

export const getSupportedLocale = (locale: string = "unknown"): Locale => {
    return LOCALES[locale] || LOCALES.unknown;
};

export const listSupporteLocales = (showBlank: boolean) => {
    const locales = [];
    for (const i in LOCALES) {
        if (i !== "unknown") locales.push(LOCALES[i]);
        else if (showBlank) locales.push(LOCALES[i]);
    }
    return locales;
};
