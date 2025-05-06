import { memo } from "react";
import { Badge } from "@chakra-ui/react";
import { SimpleTooltip } from "components";
import type { DateBadgeProps } from "types";
import { formatDateFullText, parseDateDMY } from "utils";
import { LuCalendar } from "react-icons/lu";

const DateBadge = (props: DateBadgeProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    const date = props.date;
    const textBeforeDate = props.startText || "";
    const textAfterDate = props.endText || "";

    return (
        <>
            <SimpleTooltip
                content={date ? `${textBeforeDate}${formatDateFullText(date)}${textAfterDate}` : "..."}
                openDelay={500}
                closeDelay={0}
                showArrow
            >
                <Badge bg={{ base: "white", _dark: "black" }} variant="outline" cursor="pointer" {...props}>
                    <LuCalendar />
                    {date ? parseDateDMY(date) : "..."}
                </Badge>
            </SimpleTooltip>
        </>
    );
};

export default memo(DateBadge);
