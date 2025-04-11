export class Clock {
    private date: DateWrapper;

    constructor(dateWrapper: DateWrapper = new RealDate()) {
        this.date = dateWrapper
    }

    static createNull(values: NullDateValues) {
        return new Clock(new NullDate(values))
    }

    now() {
        return this.date.now()
    }
}

interface DateWrapper {
    now(): Date
}

class RealDate implements DateWrapper {
    now() {
        return new Date()
    }
}

interface NullDateValues {
    now: Date
}

class NullDate implements DateWrapper {
    private values: NullDateValues;

    constructor(values: NullDateValues) {
        this.values = values
    }

    now() {
        return this.values.now
    }
}