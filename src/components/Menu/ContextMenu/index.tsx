import { memo } from "react";
import { Menu, Portal } from "@chakra-ui/react";
import { ContextMenuProps } from "types";
import { ContextMenuItem } from "components";

// import { LuLogOut, LuUser } from "react-icons/lu";

const ContextMenu = (props: ContextMenuProps) => {
    const { items } = props.menu;
    const open = !!props.open;
    const display = !!props.display;
    const menuRef = props.menuRef;
    const positionX = props.positionX;
    const positionY = props.positionY;

    const doesAnyItemHaveIcon = items.some((item) => "icon" in item && item.icon !== null && item.icon !== undefined);

    return (
        <>
            {open && (
                <Portal>
                    <Menu.Root open>
                        <Menu.Content
                            display={!display ? "none" : `block`}
                            ref={menuRef}
                            onContextMenu={(e) => e.preventDefault()}
                            position="fixed"
                            top={`${positionY}px`}
                            left={`${positionX}px`}
                            zIndex={9999}
                            borderRadius="md"
                            boxShadow="md"
                            p={0}
                            userSelect="none"
                            style={{
                                // Garante que o menu tenha um tamanho mínimo inicial
                                minWidth: "200px",
                                minHeight: "150px"
                            }}
                        >
                            {items.map((item, index) =>
                                "divider" in item ? (
                                    <Menu.Separator key={index} />
                                ) : (
                                    <ContextMenuItem key={index} item={item} showIcon={doesAnyItemHaveIcon} />
                                )
                            )}
                        </Menu.Content>
                    </Menu.Root>
                </Portal>
            )}
        </>
    );
};

export default memo(ContextMenu);
