import { Locale } from "types";
import { countryFlags } from "assets";
import { setStorage, NEXT_LOCALE_TOKEN_NAME } from "utils";

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
        name: "English"
    },
    es: {
        key: "es",
        flag: countryFlags.spain,
        name: "Español"
    },
    fr: {
        key: "fr",
        flag: countryFlags.france,
        name: "Français"
    },
    de: {
        key: "de",
        flag: countryFlags.germany,
        name: "Deutsch"
    },
    it: {
        key: "it",
        flag: countryFlags.italy,
        name: "Italiano"
    },
    ru: {
        key: "ru",
        flag: countryFlags.russia,
        name: "Русский"
    },

    ja: {
        key: "ja",
        flag: countryFlags.japan,
        name: "日本語"
    },
    zh: {
        key: "zh",
        flag: countryFlags.china,
        name: "中国人"
    },
    ko: {
        key: "ko",
        flag: countryFlags.south_korea,
        name: "한국인"
    },
    ar: {
        key: "ar",
        flag: countryFlags.emirates,
        name: "عربي"
    },
    hi: {
        key: "hi",
        flag: countryFlags.india,
        name: "हिंदी"
    },
    vi: {
        key: "vi",
        flag: countryFlags.vietnam,
        name: "Tiếng Việt"
    },
    el: {
        key: "el",
        flag: countryFlags.greece,
        name: "ελληνικά"
    },
    he: {
        key: "he",
        flag: countryFlags.israel,
        name: "עִברִית"
    },
    eo: {
        key: "eo",
        flag: countryFlags.esperanto,
        name: "Esperanto"
    },
    la: {
        key: "la",
        flag: countryFlags.vatican,
        name: "Latin"
    },
    unknown: {
        key: "un",
        flag: countryFlags.united_kingdom,
        name: "unknown"
    }
};

export const getSupportedLocale = (locale: string = "unknown"): Locale => {
    return LOCALES[locale] || LOCALES.unknown;
};

export const setLocale = (locale: string) => {
    setStorage(NEXT_LOCALE_TOKEN_NAME, locale);
};

export const listSupporteLocales = (showBlank: boolean) => {
    const locales = [];
    for (const i in LOCALES) {
        if (i !== "unknown") locales.push(LOCALES[i]);
        else if (showBlank) locales.push(LOCALES[i]);
    }
    return locales;
};
