import { useState, useEffect } from 'react'

type Status = 'inactive' | 'loading' | 'loaded' | 'error'

function useAPI <T> (
  promiseCreator: () => Promise<T> | null
): [T | null, Status] {
  let isStale = false
  const [data, setData] = useState(null as null | T)
  const [status, setStatus] = useState((promiseCreator ? 'loading' : 'inactive') as Status)
  const callPromiseCreator = async () => {
    try {
      setStatus('loading')

      const result = await promiseCreator()

      if (isStale) return

      setStatus('loaded')
      setData(result)
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (promiseCreator) {
      callPromiseCreator()
    } else {
      setStatus('inactive')
    }

    return () => {
      isStale = true
    }
  }, [promiseCreator])

  return [data, status]
}

export default useAPI
