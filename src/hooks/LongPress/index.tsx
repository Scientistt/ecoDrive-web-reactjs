"use client";

import { useRef, useCallback } from "react";

export function useLongPress(callback: (event: React.TouchEvent | React.MouseEvent) => void, delay = 700) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(
        (event: React.TouchEvent | React.MouseEvent) => {
            timerRef.current = setTimeout(() => {
                callback(event);
            }, delay);
        },
        [callback, delay]
    );

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    return {
        onTouchStart: start,
        onTouchEnd: clear,
        onTouchCancel: clear
    };
}
