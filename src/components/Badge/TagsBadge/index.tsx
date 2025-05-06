import { memo } from "react";
import { Badge, VStack, Text, HStack, Icon } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import type { TagsBadgeProps } from "types";
import { LuTags, LuTag } from "react-icons/lu";

const TagsBadge = (props: TagsBadgeProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    const tags = props.tags || [];

    const getTagsTooltipContent = (tags: { key: string; value: string }[]) => {
        return (
            <VStack align="left">
                <Text>Tags encontradas</Text>

                {tags.map((tag) => {
                    return (
                        <HStack key={tag.key}>
                            {/* <LuTag boxSize /> */}
                            <Icon as={LuTag} boxSize="15px" />
                            <Text>
                                {" "}
                                {tag.key} = {tag.value}{" "}
                            </Text>
                        </HStack>
                    );
                })}
            </VStack>
        );
    };

    return (
        <>
            {tags.length > 0 ? (
                <SimpleTooltip content={getTagsTooltipContent(tags)} openDelay={500} closeDelay={0} showArrow>
                    <Badge bg={{ base: "white", _dark: "black" }} variant="outline" cursor="pointer" {...props}>
                        <LuTags />
                        {`${tags.length} Tags`}
                    </Badge>
                </SimpleTooltip>
            ) : (
                <></>
            )}
        </>
    );
};

export default memo(TagsBadge);
