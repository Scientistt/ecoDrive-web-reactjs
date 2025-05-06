import { memo } from "react";
import { Badge } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import type { DateBadgeProps } from "types";
import { LuCalendar } from "react-icons/lu";

const DateBadge = (props: DateBadgeProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    const date = props.date;

    return (
        <>
            <SimpleTooltip content={date ? date.toString() : "..."} openDelay={500} closeDelay={0} showArrow>
                <Badge bg={{ base: "white", _dark: "black" }} variant="outline" cursor="pointer" {...props}>
                    <LuCalendar />
                    {date ? `${date.toString().split("T")[0]}` : "..."}
                </Badge>
            </SimpleTooltip>
        </>
    );
};

export default memo(DateBadge);
