/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react';
import { TubeLineStatus } from '../api/tfl/types'
import { ReactComponent as Square } from '../icons/square.svg'
import { ReactComponent as Circle } from '../icons/circle.svg'

interface Props {
  statuses: TubeLineStatus[];
}

const TubeLineStatusSquareRow = ({ statuses }: Props) => (
  <div css={{
    display: 'flex',
    '> *': {
      flex: 1
    }
  }}>
    {statuses.map(status => (
      <div key={status.id}>
        <Circle css={{
          width: 10,
          fill: 'red',
          margin: '0 auto 5px'
        }} />
        <Square fill={status.color} />
      </div>
    ))}
  </div>
)

export default TubeLineStatusSquareRow
