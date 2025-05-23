import { memo } from "react";
import { Badge } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import type { IdBadgeProps } from "types";
import { LuCalendar } from "react-icons/lu";

const DateBadge = (props: IdBadgeProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    const id = props.myId;

    return (
        <>
            <SimpleTooltip content={`Identificador: #${id}`} openDelay={500} closeDelay={0} showArrow>
                <Badge bg={{ base: "white", _dark: "black" }} variant="outline" cursor="pointer" {...props}>
                    <LuCalendar />
                </Badge>
            </SimpleTooltip>
        </>
    );
};

export default memo(DateBadge);
