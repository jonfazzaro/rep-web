import {useRep} from "./useRep.ts";

export function Rep() {
    const {count, rep, save, reset, hasStarted} = useRep()
    return <div className='rep'>
        <button className='reset' onClick={reset}>Reset</button>
        <button className='save' onClick={save} disabled={!hasStarted}>Save</button>
        <button className='count' onClick={rep}>{count}</button>
    </div>
}