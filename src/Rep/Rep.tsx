import {useRep} from "./useRep.ts";

export function Rep() {
    const {count, rep, save, reset} = useRep()
    return <>
        <button onClick={reset}>Reset</button>
        <button onClick={save}>Save</button>
        <h1><button onClick={rep}>{count}</button></h1>
    </>
}