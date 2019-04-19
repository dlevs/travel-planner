/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TubeStatusExtended } from '../api/tfl/lines';
import { ReactComponent as Square } from '../icons/square.svg'
import { ReactComponent as Circle } from '../icons/circle.svg'

interface Props {
  statuses: TubeStatusExtended[];
}

const TubeLineStatusRow = ({ statuses }: Props) => (
  <div css={{
    display: 'flex',
    '> *': {
      flex: 1
    }
  }}>
    {statuses.map(({ id, lineStatuses, color, name }) => {
      const foundDisruption = lineStatuses.find(({ disruption }) => !!disruption)

      return (
        <div key={id} title={name}>
          <Circle css={{
            width: 10,
            // TODO: Make a variable for "red" error color:
            fill: foundDisruption ? 'red' : 'transparent',
            // TODO: spacing variables
            margin: '0 auto 5px'
          }} />
          <Square fill={color} />
        </div>
      )
    })}
  </div>
)

export default TubeLineStatusRow
