import { useState, useEffect } from 'react';

/**
 * Pass a function that generates a value to return.
 *
 * The value will be recalculated at the interval specified, or if a
 * new `getValue` function is passed.
 */
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
