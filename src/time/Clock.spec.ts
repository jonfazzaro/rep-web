import {Clock} from "./Clock.ts";
import {expect} from "vitest";

describe('The Clock', () => {

    it('tells the time', () => {
        expect(toTheMinute(new Clock().now()))
            .toEqual(toTheMinute(new Date()))
    });

    describe('when null', () => {
        it('returns the given time', () => {
            const now = [new Date("2022-01-01")]
            const clock = Clock.createNull(now)
            expect(clock.now()).toEqual(now[0])
        });

        describe('given more than one date', () => {
            let clock: Clock;
            const times = [new Date("2022-01-01"), new Date("2022-01-02")]
            beforeEach(() => {
                clock = Clock.createNull(times)
            });

            describe('when called a second time', () => {
                it('returns the second value', () => {
                    clock.now()
                    expect(clock.now()).toEqual(times[1])
                });

                describe('when called more times than values given', () => {
                    it('returns undefined', () => {
                        clock.now()
                        clock.now()
                        expect(clock.now()).not.toBeDefined()
                    });
                });
            });
        });
    });

    function toTheMinute(date: Date) {
        return date.toISOString().replace(/.\d+Z$/g, "Z");
    }
});