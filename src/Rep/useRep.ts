import {useState} from "react";
import {Clock} from "./Clock.ts";

export interface RepViewModel {
    hasStarted: boolean;
    count: number;
    start: null;
    end: null;
    rep(): void;
    reset(): void;
}

export function useRep(clock: Clock) : RepViewModel {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState<Date | null>(null);
    
    return <RepViewModel>{
        count,
        start,
        end: null,
        hasStarted: 0 < count,
        rep,
        reset
    }

    function reset() {
        setCount(0);
        setStart(null);
    }

    function rep() {
        setCount(count => count + 1);
        setStart(clock.now());
    }
}