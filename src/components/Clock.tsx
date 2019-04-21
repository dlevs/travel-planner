/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback } from 'react'
import format from 'date-fns/format'
import useTimeoutValue from '../hooks/useTimeoutValue'

const Clock = () => {
  const getTime = useCallback(() => Date.now(), [])
  const time = useTimeoutValue(getTime, 1000)

  return <span>{format(time, 'HH:mm:ss')}</span>
}

export default Clock
