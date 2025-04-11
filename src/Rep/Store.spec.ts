import {Store} from "./Store.ts";

describe('The Store', () => {
    it('exists', () => {
       expect(new Store()).toBeDefined() 
    });

    it('saves and reads', () => {
        const stuff = {a: 1, b: 2};
        const things = {c: 3, d: 4};
        const savingStore = new Store();
        const readingStore = new Store();

        savingStore.save(stuff)
        savingStore.save(things)
        expect(readingStore.read()).toEqual([stuff, things])
    });
    
});