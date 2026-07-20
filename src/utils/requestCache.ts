type CacheEntry<T> = {
  expiresAt: number
  value: T
}

const CACHE_PREFIX = 'sht:request-cache:'
const memoryCache = new Map<string, CacheEntry<unknown>>()
const inFlight = new Map<string, Promise<unknown>>()

function getStorageKey(key: string) {
  return `${CACHE_PREFIX}${key}`
}

function readStorage<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(getStorageKey(key))
    if (!raw) return null
    return JSON.parse(raw) as CacheEntry<T>
  } catch {
    return null
  }
}

function writeStorage<T>(key: string, entry: CacheEntry<T>) {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(entry))
  } catch {
    // Cache is an optimization. Ignore quota/private-mode failures.
  }
}

export function getRequestCache<T>(key: string): T | null {
  const now = Date.now()
  const memoryEntry = memoryCache.get(key) as CacheEntry<T> | undefined

  if (memoryEntry && memoryEntry.expiresAt > now) return memoryEntry.value

  const storageEntry = readStorage<T>(key)

  if (storageEntry && storageEntry.expiresAt > now) {
    memoryCache.set(key, storageEntry)
    return storageEntry.value
  }

  return null
}

export function setRequestCache<T>(key: string, value: T, ttl: number) {
  const entry: CacheEntry<T> = {
    expiresAt: Date.now() + ttl,
    value,
  }

  memoryCache.set(key, entry)
  writeStorage(key, entry)
}

export async function fetchWithRequestCache<T>(
  key: string,
  ttl: number,
  fetchFn: () => Promise<T>,
  force = false,
): Promise<T> {
  if (!force) {
    const cached = getRequestCache<T>(key)
    if (cached) return cached
  }

  const activeRequest = inFlight.get(key) as Promise<T> | undefined
  if (activeRequest) return activeRequest

  const request = fetchFn()
    .then((res) => {
      setRequestCache(key, res, ttl)
      return res
    })
    .finally(() => {
      inFlight.delete(key)
    })

  inFlight.set(key, request)
  return request
}

export function buildRequestCacheKey(prefix: string, params: Record<string, unknown> = {}) {
  const normalizedParams = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))

  if (normalizedParams.length === 0) return prefix

  return `${prefix}:${JSON.stringify(Object.fromEntries(normalizedParams))}`
}
