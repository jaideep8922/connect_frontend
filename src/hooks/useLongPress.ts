// useLongPress.js
import { useRef, useCallback } from 'react';

export function useLongPress(callback = () => { }, delay = 600) {
    const timerRef = useRef<any>(null);

    const createHandlers = useCallback((id: string, selectedPrice: string) => {
        const start = () => {
            timerRef.current = setTimeout(() => callback(id, selectedPrice), delay);
        };
        const clear = () => {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        };

        return {
            onMouseDown: start,
            onTouchStart: start,
            onMouseUp: clear,
            onMouseLeave: clear,
            onTouchEnd: clear,
            onTouchCancel: clear,
        };
    }, [callback, delay]);

    return createHandlers;
}


// import { useRef, useCallback } from 'react';

// export function useLongPress(callback = () => { }, delay = 600) {
//     const timerRef = useRef<any>(null);

//     const start = useCallback(() => {
//         timerRef.current = setTimeout(callback, delay);
//     }, [callback, delay]);

//     const clear = useCallback(() => {
//         if (timerRef.current) {
//             clearTimeout(timerRef.current);
//             timerRef.current = null;
//         }
//     }, []);

//     return {
//         onMouseDown: start,
//         onTouchStart: start,
//         onMouseUp: clear,
//         onMouseLeave: clear,
//         onTouchEnd: clear,
//         onTouchCancel: clear,
//     };
// }
