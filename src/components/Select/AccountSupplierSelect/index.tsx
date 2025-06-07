"use client";

import { memo } from "react";
// import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
// import { BucketCardProps, Bucket } from "types";
// import { getBucket } from "endpoints";
// import { useRouter } from "next/navigation";
// import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
// import { bucketIcons /*aws*/ } from "assets";
// import { useColorMode, useSupplier } from "contexts";

import { listAccountSuppliers } from "utils";
import { AccountSupplierProps, AccountSupplier } from "types";
import { AccountSupplierSelectItem } from "components";
import { useTranslations } from "next-intl";
import { Select, createListCollection, useSelectContext, Field, Box } from "@chakra-ui/react";

// const tiers = createListCollection({
//     items: listAWSStorageClasses(false, t),
//     itemToString: (item) => item.name,
//     itemToValue: (item) => item.key
// });

const SelectValue = () => {
    const select = useSelectContext();
    const items = select.selectedItems as Array<AccountSupplier>;

    return (
        <Select.ValueText placeholder="Escolha um Storage Class">
            <AccountSupplierSelectItem accountSupplier={items[0]} item={items[0]} />
        </Select.ValueText>
    );
};

const AccountSupplierSelect = (props: AccountSupplierProps) => {
    const t = useTranslations("AccountSupplier");

    const required = !!props.required;
    const label = props.label;

    const accountSuppliers = createListCollection({
        items: listAccountSuppliers(false, t as unknown as typeof useTranslations),
        itemToString: (item) => item.name,
        itemToValue: (item) => item.key
    });

    return (
        <>
            <Field.Root required={required} gap={0}>
                <Select.Root
                    collection={accountSuppliers}
                    // size="md"
                    width="100%"
                    variant="outline"
                    colorPalette={"primary"}
                    defaultValue={["aws"]}
                    positioning={{ sameWidth: true }}
                    onChange={(e) => {
                        const value = (e.target as HTMLSelectElement).value;
                        props.onChangeValue?.(
                            accountSuppliers.items.find((tier) => tier.key === value) as AccountSupplier
                        );
                        //setstorageClass(accountSuppliers.items.find((tier) => tier.key === value) as AWSStorageClass);
                    }}
                    {...props}
                >
                    <Select.HiddenSelect />

                    <Field.Label>
                        {label} <Field.RequiredIndicator />
                    </Field.Label>
                    <Select.Control>
                        <Select.Trigger border={"none"} colorPalette={"primary"}>
                            <SelectValue />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                        <Select.Content>
                            {accountSuppliers.items.map((accountSup) => (
                                <Select.Item item={accountSup} key={accountSup.key}>
                                    <AccountSupplierSelectItem accountSupplier={accountSup} item={accountSup} />
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
                {/* <Text fontSize={"sm"} >{storageClass.description}</Text> */}
                <Box borderColor={"blue.800"} colorPalette={"primary"} borderTop={"2px solid "} w={"100%"}></Box>
            </Field.Root>
        </>
    );
};

export default memo(AccountSupplierSelect);
