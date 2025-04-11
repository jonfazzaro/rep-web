import {renderHook, RenderHookResult} from "@testing-library/react";
import {RepViewModel, useRep} from "./useRep.ts";

describe('The Rep hook', () => {
    let subject: RenderHookResult<RepViewModel, object>;
    beforeEach(() => {
        subject = renderHook(() => useRep())
    });

    it('is a hook', () => {
        expect(subject.result.current).toBeDefined()
    });

    it('has a count', () => {
        expect(subject.result.current.count).toEqual(0)
    });

    it('has a start and end time', () => {
        expect(subject.result.current.start).toEqual(null)
        expect(subject.result.current.end).toEqual(null)
    });

    it.skip('has a \'has started\' flag', () => {
        expect.fail()
    });

    describe('when repping', () => {
        it.skip('increments the count', () => {
            expect.fail()
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
});