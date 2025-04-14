import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";
import {Clock} from "../time/Clock.ts";
import {SavedSession, SessionStore} from "../storage/SessionStore.ts";

describe('The Rep hook', () => {
    beforeEach(() => {
        clock = Clock.createNull([times.now, times.later]);
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
                reset()
            });

            itResets();
        });

        describe('and then saving', () => {
            beforeEach(async () => {
                await save()
            });

            it('saves to the store', async () => {
                const expected: SavedSession = {count: 1, start: times.now, end: times.later}
                expect(await store.read()).toEqual([oldSession, expected])
            });

            itResets();
        });

    });

    describe('when saving before repping', () => {
        it('does not save to the store', async () => {
            await save()
            expect(await store.read()).toEqual([oldSession])
        });
    });

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

    const rep = () => action('rep');
    const reset = () => action('reset');

    async function save() {
        await act(async (): Promise<void> => {
            model(subject).save()
        })
    }

    function action(name: keyof RepViewModel) {
        act((): void => {
            const method = model(subject)[name];
            if (typeof method === 'function') {
                method();
            }
        })
    }

    function model(subject: RenderHookResult<RepViewModel, object>) {
        return subject.result.current;
    }

    function itResets() {
        it('resets everything', () => {
            expect(model(subject).count).toEqual(0)
            expect(model(subject).hasStarted).toEqual(false)
            expect(model(subject).start).toEqual(null)
            expect(model(subject).end).toEqual(null)
        });
    }
})
;
