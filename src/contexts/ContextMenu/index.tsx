"use client";

import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState, useEffect, useRef } from "react";
import { ContextMenuContextType, ContextMenuType } from "types";
import { ContextMenu } from "components";

export const ContextMenuContext = createContext<ContextMenuContextType<unknown>>({
    menu: null,
    setMenu: () => {},
    entity: null,
    setEntity: () => {},
    clickHandler: () => {}
});

export function ContextMenuProvider({ children }: { children: ReactNode }) {
    const contextMenu = useDisclosure();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [menu, setMenu] = useState<ContextMenuType | null>({ items: [] });
    const [entity, setEntity] = useState<unknown | null>(null);

    const menuRef = useRef<HTMLDivElement>(null);

    const [displayContextMenu, setDisplayContextMenu] = useState(true);

    const clickHandler = (e: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            if (contextMenu.open) contextMenu.onClose();
            const { clientX, clientY } = e;

            setDisplayContextMenu(false);
            contextMenu.onOpen(); // ToDo: review this logic

            requestAnimationFrame(() => {
                if (menuRef.current) {
                    const rect = menuRef.current.getBoundingClientRect();
                    const pos = calculatePosition(clientX, clientY, rect.width, rect.height);
                    setPosition(pos);
                    setDisplayContextMenu(true);
                }
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu.open) {
                contextMenu.onClose();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [contextMenu]);

    const calculatePosition = (clickX: number, clickY: number, menuWidth: number, menuHeight: number) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = clickX;
        let y = clickY;

        // Se o menu sair da direita, abre totalmente à esquerda do clique
        if (clickX + menuWidth > viewportWidth) {
            x = clickX - menuWidth;
        }

        // Se o menu sair embaixo, abre totalmente acima do clique
        if (clickY + menuHeight > viewportHeight) {
            y = clickY - menuHeight;
        }

        // Garante que não fique colado demais nas bordas da tela
        x = Math.max(10, x);
        y = Math.max(10, y);

        return { x, y };
    };

    return (
        <ContextMenuContext.Provider value={{ menu, setMenu, entity, setEntity, clickHandler }}>
            {children}
            <ContextMenu
                open={contextMenu.open}
                display={displayContextMenu}
                // display={true}
                menuRef={menuRef}
                positionX={position.x}
                positionY={position.y}
                menu={menu || { items: [] }}
            ></ContextMenu>
        </ContextMenuContext.Provider>
    );
}

export const useContextMenu = () => useContext(ContextMenuContext);
