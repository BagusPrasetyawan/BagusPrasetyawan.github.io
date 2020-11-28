/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable radix */
const dbPromised = idb.open('Football-API', 1, (upgradeDb) => {
  const articlesObjectStore = upgradeDb.createObjectStore('soccer_league', {
    keyPath: 'id',
  });
  articlesObjectStore.createIndex('team', 'team', { unique: false });
});

function saveForLater(article) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('soccer_league', 'readwrite');
      const store = tx.objectStore('soccer_league');
      console.log(article);
      store.put(article);
      return tx.complete;
    })
    .then(() => {
      console.log('Team berhasil di simpan.');
    });
}
function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('soccer_league', 'readonly');
        const store = tx.objectStore('soccer_league');
        return store.getAll();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('soccer_league', 'readonly');
        const store = tx.objectStore('soccer_league');
        return store.get(id);
      })
      .then((article) => {
        resolve(article);
      });
  });
}

function deleteByID(id) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('soccer_league', 'readwrite');
      const store = tx.objectStore('soccer_league');
      store.delete(parseInt(id));
      return tx.complete;
    }).then(() => {
      console.log('Item deleted');
    });
}
