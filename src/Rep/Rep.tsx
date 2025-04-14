import {useRep} from "./useRep.ts";

export function Rep() {
    const {count, rep, save, reset} = useRep()
    return <div className='rep'>
        <button onClick={reset}>Reset</button>
        <button onClick={save}>Save</button>
        <button className='count' onClick={rep}>{count}</button>
    </div>
}