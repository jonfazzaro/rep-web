import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";
import {Clock, NullDateValues} from "./Clock.ts";

describe('The Rep hook', () => {
    let subject: RenderHookResult<RepViewModel, object>;
    const times: NullDateValues = {now: new Date()}

    beforeEach(() => {
        subject = renderHook(() => useRep(Clock.createNull({now: [times.now]})))
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

        describe("given it's the first time", () => {
            it("sets the start time", () => {
                expect(model(subject).start).toEqual(times.now)
            });

            describe('when repping a second time', () => {
                it('does not change the start time', () => {
                    rep()
                    expect(model(subject).start).toEqual(times.now)
                });

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
