import {SavedSession, SessionStore} from "./SessionStore.ts";

describe('The Session Store', () => {

    it('saves and reads', () => {
        const stuff:SavedSession = { count: 12, start: new Date(), end: new Date()}
        const things:SavedSession = { count: 198, start: new Date(), end: new Date()}
        const savingStore = new SessionStore();
        const readingStore = new SessionStore();

        savingStore.save(stuff)
        savingStore.save(things)
        expect(readingStore.read()).toEqual([stuff, things])
    });
    
});