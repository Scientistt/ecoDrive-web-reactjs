"use client";

import { memo, useState, FormEvent } from "react";
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
import { useColorMode } from "contexts";
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
    const { colorMode } = useColorMode();
    const invalid = !!props.invalid;
    const required = !!props.required;
    const label = props.label;
    const defaultValue = props.value?.key ?? "aws";
    const errorMessage = props.errorMessage;

    const [isFocused, setIsFocused] = useState(false);

    const accountSuppliers = createListCollection({
        items: listAccountSuppliers(false, t as unknown as typeof useTranslations),
        itemToString: (item) => item.name,
        itemToValue: (item) => item.key
    });

    // props.onChangeValue?.(accountSuppliers.items.find((tier) => tier.key === defaultValue) as AccountSupplier);

    const onChangeValue = (e: FormEvent<HTMLDivElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        props.onChangeValue?.(accountSuppliers.items.find((tier) => tier.key === value) as AccountSupplier);
    };

    return (
        <>
            <Field.Root required={required} gap={0} invalid={invalid}>
                <Select.Root
                    collection={accountSuppliers}
                    // size="md"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        props.onBlurValue?.();
                    }}
                    width="100%"
                    variant="outline"
                    colorPalette={"primary"}
                    defaultValue={[defaultValue]}
                    positioning={{ sameWidth: true }}
                    onChange={onChangeValue}
                    // {...props}
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

                {colorMode === "light" ? (
                    <Box
                        borderColor={"blue.800"}
                        colorPalette={"primary"}
                        borderTop={
                            invalid
                                ? { base: "2px solid #ef4444" }
                                : !isFocused
                                  ? { base: "2px solid #e4e4e7" }
                                  : { base: "3px solid #a1a1aa" }
                        }
                        w={"100%"}
                        mb={"5px"}
                    ></Box>
                ) : (
                    <Box
                        borderColor={"blue.800"}
                        colorPalette={"primary"}
                        borderTop={
                            invalid
                                ? { base: "2px solid #f87171" }
                                : !isFocused
                                  ? { base: "2px solid #27272a" }
                                  : { base: "3px solid #a1a1aa" }
                        }
                        w={"100%"}
                        mb={"5px"}
                    ></Box>
                )}

                <Field.ErrorText>{errorMessage}</Field.ErrorText>
                {/* <Box borderColor={"blue.800"} colorPalette={"primary"} borderTop={"2px solid #e4e4e7"} w={"100%"}></Box> */}
            </Field.Root>
        </>
    );
};

export default memo(AccountSupplierSelect);
