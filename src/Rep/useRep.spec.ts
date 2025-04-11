import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";
import {Clock} from "./Clock.ts";

describe('The Rep hook', () => {
    let subject: RenderHookResult<RepViewModel, object>;
    let clock: Clock;
    const times = {
        now: new Date("2023-01-05T05:00:00"),
        later: new Date("2023-01-05T07:00:00"),
    }

    beforeEach(() => {
        clock = Clock.createNull({nows: [times.now, times.later]});
        subject = renderHook(() => {
            return useRep(clock);
        })
    });

    it('has a count', () => {
        expect(model(subject).count).toEqual(0)
    });

    it('has a start and end time', () => {
        expect(model(subject).start).toEqual(null)
        expect(model(subject).end).toEqual(null)
    });

    it("has a started flag", () => {
        expect(model(subject).hasStarted).toEqual(false)
    });

    describe('when repping', () => {
        beforeEach(() => {
            rep()
        });

        describe('and setting the start time', () => {
            it("sets it the first time", () => {
                expect(model(subject).start).toEqual(times.now)
            });

            it('does not change the start time with more reps', () => {
                rep()
                expect(model(subject).start).toEqual(times.now)
            });
        });

        it('increments the count', () => {
            expect(model(subject).count).toEqual(1)
        });

        it("sets the started flag", () => {
            expect(model(subject).hasStarted).toEqual(true)
        });

        describe('and then resetting', () => {
            beforeEach(() => {
                act((): void => {
                    model(subject).reset()
                })
            });

            it('resets everything', () => {
                expect(model(subject).count).toEqual(0)
                expect(model(subject).hasStarted).toEqual(false)
                expect(model(subject).start).toEqual(null)
                expect(model(subject).end).toEqual(null)
            });

            describe('and then saving', () => {
                it.skip('saves to the store', () => {
                    expect.fail()
                });

                it.skip('resets everything', () => {
                    expect.fail()
                });
            });
        });
    });

    describe('when saving before repping', () => {
        it.skip('does not save to the store', () => {
            expect.fail()
        });
    });

    function rep() {
        act((): void => {
            model(subject).rep()
        })
    }

    function model(subject: RenderHookResult<RepViewModel, object>) {
        return subject.result.current;
    }
});
