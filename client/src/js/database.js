import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// TODO DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('PUT to the database', content, " need id?");
    const jateDb = await openDB('jate', 1);
    console.log("jateDb: ", jateDb);
    const tx = jateDb.transaction('jate', 'readwrite');
    console.log("tx: ", tx);
    const store = tx.objectStore('jate');
    console.log("store: ", store);
    const request = store.put({ id: 1, jate: content });
    console.log("request: ", request);
    const result = await request;
    console.log('🚀 - data saved to the database', result);
};

// TODO DONE: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    console.log("jateDb: ", jateDb);
    const tx = jateDb.transaction('jate', 'readonly');
    console.log("tx: ", tx);
    const store = tx.objectStore('jate');
    console.log("store: ", store);
    const request = store.getAll();
    console.log("request: ", request);
    const result = await request;
    console.log('result.value', result);
    return result;
};
initdb();
