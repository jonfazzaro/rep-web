import {renderHook} from "@testing-library/react";
import {useRep} from "./useRep.ts";

describe('The Rep hook', () => {

    it('is a hook', () => {
        const subject = renderHook(() => useRep())
        expect(subject.result.current).toBeDefined()
    });

    it('has a count', () => {
        const subject = renderHook(() => useRep())
        expect(subject.result.current.count).toEqual(0)
    });

    it.skip('has a start and end time', () => {
        expect.fail()
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