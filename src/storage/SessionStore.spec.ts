import {SessionStore} from "./SessionStore.ts";
import {SavedSession} from "./SavedSession.ts";

describe('The Session Store', () => {

    it('saves and reads', async () => {
        const stuff:SavedSession = { count: 12, start: new Date(), end: new Date()}
        const things:SavedSession = { count: 198, start: new Date(), end: new Date()}
        const savingStore = new SessionStore();
        const readingStore = new SessionStore();

        await savingStore.save(stuff)
        await savingStore.save(things)
        const result = await readingStore.read();
        expect(result).toEqual([stuff, things])
    });
    
});