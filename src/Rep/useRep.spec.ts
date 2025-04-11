import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";

describe('The Rep hook', () => {
    let subject: RenderHookResult<RepViewModel, object>;

    beforeEach(() => {
        subject = renderHook(() => useRep())
    });

    it('has a count', () => {
        expect(model(subject).count).toEqual(0)
    });

    it('has a start and end time', () => {
        expect(model(subject).start).toEqual(null)
        expect(model(subject).end).toEqual(null)
    });

    it("has a 'has started' flag", () => {
        expect(model(subject).hasStarted).toEqual(false)
    });

    describe('when repping', () => {
        it('increments the count', () => {
            rep();
            expect(model(subject).count).toEqual(1)
        });

        it.skip('sets the start time given it\'s the first time', () => {
            expect.fail()
        });

        it.skip('sets the \'has started\' flag', () => {
            expect.fail()
        });

        describe('and then resetting', () => {
            it.skip('resets everything', () => {
                expect.fail()
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
