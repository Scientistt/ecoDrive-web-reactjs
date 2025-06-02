import { useLocale } from "next-intl";
import { usePathname } from "i18n/navigation";

import { listSupporteLocales } from "utils";
import { Locale } from "types";

import { Portal, Select, createListCollection, Avatar, useSelectContext, VStack } from "@chakra-ui/react";

const locales = createListCollection({
    items: listSupporteLocales(false),
    itemToString: (item) => item.name,
    itemToValue: (item) => item.key
});

const SelectValue = () => {
    const select = useSelectContext();
    const items = select.selectedItems as Array<Locale>;
    const { key, name, flag } = items[0];
    return (
        <Select.ValueText w={"40px"} bg="transparent">
            <VStack align={"center"} bg="transparent">
                <Avatar.Root shape="square" size="xs" bg="transparent" p={0} m={0}>
                    <Avatar.Image src={flag.src} w={"50px"} alt={name} bg="transparent" />
                    <Avatar.Fallback name={key} bg="transparent" p={0} m={0} />
                </Avatar.Root>
            </VStack>
        </Select.ValueText>
    );
};

export default function LocaleSelect() {
    const pathname = usePathname();
    const locale = useLocale();

    return (
        <Select.Root
            collection={locales}
            size="sm"
            defaultValue={[locale]}
            variant={"subtle"}
            bg="transparent"
            onValueChange={(locale) => {
                const selectedLocale = locale.items[0];
                const newPath = `/${selectedLocale.key}${pathname}`;
                window.location.href = newPath;
            }}
        >
            <Select.HiddenSelect />

            <Select.Control bg="transparent">
                <Select.Trigger bg="transparent" p={0} pl="7px">
                    <SelectValue />
                </Select.Trigger>
            </Select.Control>
            <Portal>
                <Select.Positioner p={0}>
                    <Select.Content p={0}>
                        {locales.items.map((item) => (
                            <Select.Item item={item} key={item.key} bg="transparent">
                                <VStack align={"center"} bg="transparent" w="40px">
                                    <Avatar.Root shape="square" size="xs" bg="transparent" p={0} m={0}>
                                        <Avatar.Image src={item.flag.src} w={"50px"} alt={item.name} bg="transparent" />
                                        {/* <Avatar.Fallback name={item.key} bg="transparent" p={0} m={0} /> */}
                                    </Avatar.Root>
                                </VStack>
                                {/* <Avatar.Root shape="square" size="2xs" bg="transparent">
                                    <Avatar.Image src={item.flag.src} alt={item.name} bg="transparent" />
                                    <Avatar.Fallback name={item.key} bg="transparent" />
                                </Avatar.Root> */}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
}

// export default function LocaleSelect() {
//     const t = useTranslations("LocaleSwitcher");
//     const locale = useLocale();
//     const otherLocale = locale === "en" ? "es" : "en";
//     const pathname = usePathname();

//     return (
//         <Link href={pathname} locale={otherLocale}>
//             {t("switchLocale", { locale: otherLocale })}
//         </Link>
//     );
// }
