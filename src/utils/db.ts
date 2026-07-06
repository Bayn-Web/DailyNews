import { openDB } from 'idb'

const dbPromise = openDB('DailyNews', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('articles')) {
      db.createObjectStore('articles', { keyPath: 'id' })
    }
  },
})

export async function cacheArticles(articles: any[]) {
  const db = await dbPromise
  const tx = db.transaction('articles', 'readwrite')
  for (const article of articles) {
    await tx.store.put(article)
  }
  await tx.done
}

export async function getCachedArticles(): Promise<any[]> {
  const db = await dbPromise
  return db.getAll('articles')
}

export async function clearArticleCache() {
  const db = await dbPromise
  db.transaction('articles', 'readwrite').store.clear()
}
