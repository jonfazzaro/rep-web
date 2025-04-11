import {renderHook} from "@testing-library/react";
import {useRep} from "./useRep.ts";

describe('The Rep hook', () => {
    it('exists', () => {
        const subject = renderHook(() => useRep())
        expect(subject.result.current).toBeDefined()
    });

    it.skip('is a view model', () => {
        expect.fail()
    });

    it.skip('has a count', () => {
        expect.fail()
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