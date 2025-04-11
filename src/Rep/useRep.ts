import {useState} from "react";

export interface RepViewModel {
    hasStarted: boolean;
    count: number;
    start: null;
    end: null;
    rep(): void;
}

export function useRep() : RepViewModel {
    const [count, setCount] = useState(0);
    return <RepViewModel>{
        count,
        start: null,
        end: null,
        hasStarted: false,
        rep: () => {
            setCount(count => count + 1);
        }
    }
}