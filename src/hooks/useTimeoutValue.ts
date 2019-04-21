import { useState, useEffect } from 'react';

const useTimeoutValue = <T> (
  getValue: () => T,
  timeout: number
) => {
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(getValue)
    }, timeout)

    return () => {
      clearInterval(interval)
    }
  }, [getValue])

  return value
}

export default useTimeoutValue
