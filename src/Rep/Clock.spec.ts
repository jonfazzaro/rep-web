import {Clock} from "./Clock.ts";
import {expect} from "vitest";

describe('The Clock', () => {

    it('tells the time', () => {
        expect(new Clock().now()).toEqual(new Date())
    });

    describe('when null', () => {
        it('returns the given time', () => {
            const now = [new Date("2022-01-01")]
            const clock = Clock.createNull({now})
            expect(clock.now()).toEqual(now[0])
        });

        // describe('given more than one date', () => {
        //     let clock: Clock;
        //     beforeEach(() => {
        //         clock = Clock.createNull({now: [new Date("2022-01-01")]})
        //     });
        //     describe('when called a second time', () => {
        //         it('returns the second value', () => {
        //            
        //         });
        //     });
        // });
        
    });

});