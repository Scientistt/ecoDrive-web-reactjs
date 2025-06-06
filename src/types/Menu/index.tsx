import { type PortalProps, type MenuItemProps } from "@chakra-ui/react";
import { Ref, ReactNode } from "react";
import { User } from "types";

interface ContextMenuItem extends MenuItemProps {
    title: string;
    value: string;
    onClick: () => void;
    danger?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    command?: ReactNode;
    items?: Array<ContextMenuItem | ContextMenuDivider>;
}
interface ContextMenuDivider {
    divider: boolean;
}
export interface UserNavbarMenuProps extends PortalProps {
    user?: User | null;
}
export interface ContextMenuProps extends PortalProps {
    menu: ContextMenuType;
    open: boolean;
    display: boolean;
    menuRef: Ref<HTMLDivElement>;
    positionX: number;
    positionY: number;
}

export interface ContextMenuItemProps {
    item: ContextMenuItem;
    showIcon?: boolean;
}

export interface ContextMenuContextType<T> {
    entity?: T | null;
    setEntity?: (entity: T) => void;
    menu?: ContextMenuType | null;
    setMenu?: (menu: ContextMenuType) => void;

    clickHandler?: (e: React.MouseEvent) => void;
    setClickHandler?: (handler: (e: React.MouseEvent) => void) => void;
    // setClickHandler?: (e: React.MouseEvent) => void;
}

export interface ContextMenuType extends PortalProps {
    items: Array<ContextMenuItem | ContextMenuDivider>;
}
