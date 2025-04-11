import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";
import {Clock} from "./Clock.ts";
import {SavedSession, SessionStore} from "./SessionStore.ts";

describe('The Rep hook', () => {
    let subject: RenderHookResult<RepViewModel, object>;
    let clock: Clock;
    let store: SessionStore;
    const times = {
        now: new Date("2023-01-05T05:00:00Z"),
        later: new Date("2023-01-05T07:00:00Z"),
        olden: new Date("2003-01-05T01:00:00Z"),
        good: new Date("2012-11-05T12:00:00Z"),

    }
    const oldSession = {count: 18, start: times.olden, end: times.good};

    beforeEach(() => {
        clock = Clock.createNull({nows: [times.now, times.later]});
        store = SessionStore.createNull({"other_data": "{}", "rep_sessions": JSON.stringify([oldSession])})
        subject = renderHook(() => {
            return useRep(clock, store);
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
        });

        describe('and then saving', () => {
            beforeEach(() => {
                act((): void => {
                    model(subject).save()
                })
            });

            it('saves to the store', () => {
                const expected: SavedSession = {count: 1, start: times.now, end: times.later}
                expect(store.read()).toEqual([oldSession, expected])
            });

            it.skip('resets everything', () => {
                expect.fail()
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
