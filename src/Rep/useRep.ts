export interface RepViewModel {
    count: number;
    start: null;
    end: null;
}

export function useRep() : RepViewModel {
    return <RepViewModel>{
        count: 0,
        start: null,
        end: null,
    }
}