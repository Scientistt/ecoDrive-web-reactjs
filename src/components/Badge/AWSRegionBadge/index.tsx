import { memo } from "react";
import { Badge, Image } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import type { AWSRegionBadgeProps } from "types";
import { getAWSRegion } from "utils";

const AWSRegionBadge = (props: AWSRegionBadgeProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    const region = getAWSRegion(props.region);

    return (
        <>
            <SimpleTooltip content={`${region.key}: ${region.description}`} openDelay={500} closeDelay={0} showArrow>
                <Badge bg={{ base: "white", _dark: "black" }} variant="outline" cursor="pointer" {...props}>
                    <Image
                        height="20px"
                        top="5px"
                        src={region.icon.src}
                        alt={region.name}
                        borderRadius="md"
                        objectFit="cover"
                        mx="auto"
                    />
                    {region.name}{" "}
                </Badge>
            </SimpleTooltip>
        </>
    );
};

export default memo(AWSRegionBadge);
