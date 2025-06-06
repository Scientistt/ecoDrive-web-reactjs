import { useRef, useCallback } from "react";

// type MouseCallback = (event: React.MouseEvent) => void;
// type TouchCallback = (event: React.TouchEvent) => void;

export function useLongPressFactory(delay = 700) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const createHandlers = useCallback(
        (callback: (event: React.MouseEvent | React.TouchEvent) => void) => {
            const startMouse = (event: React.MouseEvent) => {
                event.persist?.();
                timerRef.current = setTimeout(() => callback(event), delay);
            };
            const startTouch = (event: React.TouchEvent) => {
                event.persist?.();
                timerRef.current = setTimeout(() => callback(event), delay);
            };

            const clear = () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            };

            return {
                onMouseDown: startMouse,
                onMouseUp: clear,
                onMouseLeave: clear,
                onTouchStart: startTouch,
                onTouchEnd: clear,
                onTouchCancel: clear
            };
        },
        [delay]
    );

    return createHandlers;
}
