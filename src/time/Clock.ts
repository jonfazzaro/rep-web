export class Clock {
    private date: DateProvider;

    constructor(date: DateProvider = new RealDate()) {
        this.date = date
    }

    static createNull(nowValues: Date[] = []) {
        return new Clock(new NullDate(nowValues))
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

class NullDate implements DateProvider {
    private callCount: number;

    constructor(private nowValues: Date[] = []) {
        this.callCount = 0
    }

    now() {
        return this.nowValues[this.callCount++]
    }
}