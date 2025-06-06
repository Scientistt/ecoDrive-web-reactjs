import { AccountSupplier } from "types";
import { useTranslations } from "next-intl";
import { oracle, aws, cloudflare, googlecloud, LoadingIcons, digitalOcean } from "assets";

const getAccountSuppliers = (t: typeof useTranslations): Record<string, AccountSupplier> => ({
    aws: {
        key: "aws",
        name: t("awsName") as unknown as string,
        description: t("awsDescription") as unknown as string,
        logo_light: aws.logo_light,
        logo_dark: aws.logo_dark
    },

    oracle: {
        key: "oracle",
        name: t("oracleName") as unknown as string,
        description: t("oracleDescription") as unknown as string,
        logo_light: oracle.logo_light,
        logo_dark: oracle.logo_dark
    },

    googlecloud: {
        key: "googlecloud",
        name: t("googlecloudName") as unknown as string,
        description: t("googlecloudDescription") as unknown as string,
        logo_light: googlecloud.logo_light,
        logo_dark: googlecloud.logo_dark
    },

    cloudflare: {
        key: "cloudflare",
        name: t("cloudflareName") as unknown as string,
        description: t("cloudflareDescription") as unknown as string,
        logo_light: cloudflare.logo_light,
        logo_dark: cloudflare.logo_dark
    },
    digitalocean: {
        key: "digitalocean",
        name: t("digitaloceanName") as unknown as string,
        description: t("digitaloceanDescription") as unknown as string,
        logo_light: digitalOcean.logo_light,
        logo_dark: digitalOcean.logo_dark
    },

    unknown: {
        key: "unknown",
        name: t("unknownName") as unknown as string,
        description: t("unknownDescription") as unknown as string,
        logo_light: LoadingIcons.failed,
        logo_dark: LoadingIcons.failed
    }
});

export const getAccountSupplier = (accountSupplier: string = "unknown", t: typeof useTranslations): AccountSupplier => {
    return getAccountSuppliers(t)[accountSupplier] || getAccountSuppliers(t).unknown;
};

export const listAccountSuppliers = (showBlank: boolean, t: typeof useTranslations) => {
    const tiers = [];
    for (const i in getAccountSuppliers(t)) {
        if (i !== "unknown") tiers.push(getAccountSuppliers(t)[i]);
        else if (showBlank) tiers.push(getAccountSuppliers(t)[i]);
    }
    return tiers;
};
