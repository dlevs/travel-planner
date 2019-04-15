/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TubeStatusExtended } from '../api/tfl/lines';
import { ReactComponent as Square } from '../icons/square.svg'
import { ReactComponent as Circle } from '../icons/circle.svg'

interface Props {
  statuses: TubeStatusExtended[];
}

const TubeLineStatusSquareRow = ({ statuses }: Props) => (
  <div css={{
    display: 'flex',
    '> *': {
      flex: 1
    }
  }}>
    {statuses.map(status => {
      const foundDisruption = status.lineStatuses.find(({ disruption }) => !!disruption)

      return (
        <div key={status.id}>
          <Circle css={{
            width: 10,
            // TODO: Make a variable for "red" error color:
            fill: foundDisruption ? 'red' : 'transparent',
            // TODO: spacing variables
            margin: '0 auto 5px'
          }} />
          <Square fill={status.color} />
        </div>
      )
    })}
  </div>
)

export default TubeLineStatusSquareRow
