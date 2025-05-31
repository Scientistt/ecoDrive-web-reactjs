import { memo } from "react";
import { Menu, Box } from "@chakra-ui/react";
import { ContextMenuItemProps } from "types";

const ContextMenu = (props: ContextMenuItemProps) => {
    const item = props.item;
    const showIcon = !!props.showIcon;

    return (
        <>
            <Menu.Item
                // {...props}
                key={item.value}
                px={"5px"}
                gap={0}
                py={"5px"}
                m={0}
                {...(item.disabled ? { disabled: true } : {})}
                fontSize={"smaller"}
                value={item.value}
                onSelect={item.onClick}
                color={item.danger ? { base: "red.600", _dark: "red.400" } : "light"}
                _hover={
                    item.danger
                        ? { base: { bg: "red.100", color: "red.600" }, _dark: { bg: "red.900", color: "red.400" } }
                        : {}
                }
            >
                {/* {item.icon ? item.icon : ``} */}

                {showIcon ? (
                    <Box p={0} m={0} display="flex" alignItems="center" justifyContent="center" w="15px">
                        {item.icon ?? null}{" "}
                    </Box>
                ) : (
                    <></>
                )}

                <Box p={0} ml={"5px"} flex="1">
                    {item.title}
                </Box>
                {item.command ? <Menu.ItemCommand>{item.command}</Menu.ItemCommand> : ``}
            </Menu.Item>
        </>
    );
};

export default memo(ContextMenu);
