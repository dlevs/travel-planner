/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TubeLineStatus } from '../api/tfl/types'
import TubeLineStatusSquare from './TubeLineStatusSquare'

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
      <TubeLineStatusSquare
        key={status.id}
        status={status}
      />
    ))}
  </div>
)

export default TubeLineStatusSquareRow
