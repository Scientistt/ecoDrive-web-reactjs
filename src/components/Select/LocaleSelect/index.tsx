import { useLocale } from "next-intl";
import navigation from "next/navigation";
import { listSupporteLocales, setLocale } from "utils";
import { Locale } from "types";

import { Portal, Select, createListCollection, Avatar, useSelectContext, VStack, Text, HStack } from "@chakra-ui/react";

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
    const locale = useLocale();
    const router = navigation.useRouter();

    return (
        <Select.Root
            collection={locales}
            size="sm"
            defaultValue={[locale]}
            variant={"subtle"}
            bg="transparent"
            positioning={{ placement: locale === "ar" || locale === "he" ? "right-start" : "left-start", flip: false }}
            onValueChange={(newLocale) => {
                const selectedLocale = newLocale.items[0];
                setLocale(selectedLocale.key);
                router.refresh();
            }}
        >
            <Select.HiddenSelect />

            <Select.Control>
                <Select.Trigger
                    bg={"transparent"}
                    _hover={{ bg: { base: "gray.100", _dark: "gray.900" } }}
                    p={0}
                    pl="7px"
                    cursor={"pointer"}
                >
                    <SelectValue />
                </Select.Trigger>
            </Select.Control>
            <Portal>
                <Select.Positioner p={0}>
                    <Select.Content p={0} maxHeight="none">
                        {locales.items.map((item) => (
                            <Select.Item item={item} key={item.key} cursor={"pointer"}>
                                <VStack align={"left"} bg="transparent">
                                    <HStack gap="5px" align={"center"}>
                                        <Avatar.Root shape="square" size="xs" bg="transparent" p={0} m={0}>
                                            <Avatar.Image
                                                src={item.flag.src}
                                                w={"50px"}
                                                alt={item.name}
                                                bg="transparent"
                                            />
                                        </Avatar.Root>
                                        <Text>{item.name}</Text>
                                    </HStack>
                                </VStack>
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
}
