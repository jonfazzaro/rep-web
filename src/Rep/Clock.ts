export class Clock {
    private date: DateProvider;

    constructor(date: DateProvider = new RealDate()) {
        this.date = date
    }

    static createNull(values: NullDateValues) {
        return new Clock(new NullDate(values))
    }

    now() {
        return this.date.now()
    }
}

interface DateProvider {
    now(): Date
}

class RealDate implements DateProvider {
    now() {
        return new Date()
    }
}

export interface NullDateValues {
    nowValues: Date[]
}

class NullDate implements DateProvider {
    private values: NullDateValues;
    private callCount: number;

    constructor(values: NullDateValues) {
        this.values = values
        this.callCount = 0
    }

    now() {
        return this.values.nowValues[this.callCount++]
    }
}