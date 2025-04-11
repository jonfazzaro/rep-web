import {useState} from "react";

export interface RepViewModel {
    hasStarted: boolean;
    count: number;
    start: null;
    end: null;
    rep(): void;
    reset(): void;
}

export function useRep() : RepViewModel {
    const [count, setCount] = useState(0);
    return <RepViewModel>{
        count,
        start: null,
        end: null,
        hasStarted: 0 < count,
        rep,
        reset
    }

    function reset() {
        return setCount(0);
    }

    function rep() {
        setCount(count => count + 1);
    }
}