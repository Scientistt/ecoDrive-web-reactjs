"use client";

import { memo } from "react";
// import { Card, HStack, VStack, Image, Text, Spacer, Spinner } from "@chakra-ui/react";
// import { BucketCardProps, Bucket } from "types";
// import { getBucket } from "endpoints";
// import { useRouter } from "next/navigation";
// import { DateBadge, AWSRegionBadge, TagsBadge } from "components";
// import { bucketIcons /*aws*/ } from "assets";
// import { useColorMode, useSupplier } from "contexts";
import { listAWSStorageClasses } from "utils";
import { AWSStorageClass, AWSStorageClassSelectProps } from "types";
import { AWSStorageClassSelectItem } from "components";

import { Select, VStack, createListCollection, useSelectContext, Text } from "@chakra-ui/react";

const tiers = createListCollection({
    items: listAWSStorageClasses(false),
    itemToString: (item) => item.name,
    itemToValue: (item) => item.key
});

const SelectValue = () => {
    const select = useSelectContext();
    const items = select.selectedItems as Array<AWSStorageClass>;

    return (
        <Select.ValueText placeholder="Escolha um Storage Class">
            <AWSStorageClassSelectItem storageClass={items[0]} item={items[0]} />
        </Select.ValueText>
    );

    const { name, key } = items?.[0];

    return (
        <Select.ValueText placeholder="Escolha um Storage Class">
            <VStack align={"left"}>
                <Text fontSize={"md"} fontWeight={"normal"}>
                    {name}
                </Text>
                <Text fontSize={"sm"} mt={"-10px"} fontWeight={"light"}>
                    {key}
                </Text>
            </VStack>
        </Select.ValueText>
    );
};

const AWSStorageClassSelect = (props: AWSStorageClassSelectProps) => {
    /*const [storageClass, setstorageClass] = useState(tiers.items[0]);*/

    // const handleChange = (event: FormEventHandler<HTMLDivElement>) => {
    //     const selectedTier = tiers.items.find((tier) => tier.key === event?.target?.value) as AWSStorageClass;

    //     setstorageClass(selectedTier);
    //     if (props?.onChangeValue) {
    //         props.onChangeValue(selectedTier);
    //     }
    // };

    return (
        <>
            <Select.Root
                collection={tiers}
                size="md"
                width="100%"
                defaultValue={["STANDARD"]}
                positioning={{ sameWidth: true }}
                onChange={(e) => {
                    const value = (e.target as HTMLSelectElement).value;
                    props.onChangeValue?.(tiers.items.find((tier) => tier.key === value) as AWSStorageClass);
                    //setstorageClass(tiers.items.find((tier) => tier.key === value) as AWSStorageClass);
                }}
            >
                <Select.HiddenSelect />
                {/* <Select.Label>Storage Class</Select.Label> */}
                <Select.Control>
                    <Select.Trigger>
                        <SelectValue />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        {tiers.items.map((tier) => (
                            <Select.Item item={tier} key={tier.key} justifyContent="flex-start">
                                <AWSStorageClassSelectItem storageClass={tier} item={tier} />
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
            {/* <Text fontSize={"sm"} >{storageClass.description}</Text> */}
        </>
    );
};

export default memo(AWSStorageClassSelect);
