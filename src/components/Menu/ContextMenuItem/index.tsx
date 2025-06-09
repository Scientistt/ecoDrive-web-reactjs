import { memo } from "react";
import { Menu, Box, Portal, Spacer } from "@chakra-ui/react";
import { ContextMenuItemProps } from "types";
import { LuChevronRight } from "react-icons/lu";
import { ContextMenuItem } from "components";

const ContextMenu = (props: ContextMenuItemProps) => {
    const item = props.item;
    const showIcon = !!props.showIcon;

    const subItems = item.items || [];

    if (subItems.length > 0)
        return (
            <>
                <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                    <Menu.TriggerItem
                        key={item.value}
                        px={"5px"}
                        gap={0}
                        py={"5px"}
                        m={0}
                        {...(item.disabled ? { disabled: true } : {})}
                        fontSize={"smaller"}
                        onSelect={item.onClick}
                        color={item.danger ? { base: "red.600", _dark: "red.400" } : "light"}
                        _hover={
                            item.danger
                                ? {
                                      base: { bg: "red.100", color: "red.600" },
                                      _dark: { bg: "red.900", color: "red.400" }
                                  }
                                : {}
                        }
                    >
                        {showIcon ? (
                            <Box p={0} m={0} display="flex" alignItems="center" justifyContent="center" w="15px">
                                {item.icon ?? null}{" "}
                            </Box>
                        ) : (
                            <></>
                        )}
                        <Box p={0} ml={"5px"} flex="1">
                            {item.title}
                        </Box>{" "}
                        <Spacer /> <LuChevronRight />
                    </Menu.TriggerItem>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                {item?.items?.map((item, index) =>
                                    "divider" in item ? (
                                        <Menu.Separator key={index} />
                                    ) : (
                                        //ToDo: Show Icon validator for each submenu
                                        <ContextMenuItem key={index} item={item} showIcon={showIcon} />
                                    )
                                )}
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </>
        );
    else
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
