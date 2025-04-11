import {useState} from "react";
import {Clock} from "./Clock.ts";

export interface RepViewModel {
    hasStarted: boolean;
    count: number;
    start: null;
    end: null;
    rep(): void;
    reset(): void;
    save(): void;
}

export function useRep(clock: Clock) : RepViewModel {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    return <RepViewModel>{
        count,
        start,
        end,
        hasStarted: hasStarted(),
        rep,
        reset,
        save
    }

    function rep() {
        if (!hasStarted())
            setStart(clock.now());
        setCount(count => count + 1);
    }

    function reset() {
        setCount(0);
        setStart(null);
        setEnd(null);
    }

    function save() {
        setEnd(clock.now())
    }

    function hasStarted() {
        return 0 < count;
    }
}