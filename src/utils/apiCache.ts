import axios from 'axios'

const apiCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000

export async function getCachedAPI(url: string) {
  const cached = apiCache.get(url)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const { data } = await axios.get(url)
    apiCache.set(url, { data, timestamp: Date.now() })
    return data
  } catch (error) {
    if (cached) return cached.data
    throw error
  }
}
