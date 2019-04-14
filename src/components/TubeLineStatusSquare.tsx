/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TubeLineStatus } from '../api/tfl/types'

interface Props {
  status: TubeLineStatus;
}

const TubeLineStatusSquare = ({ status }: Props) => (
  <div
    title={status.name}
    css={{
      background: status.color
    }}
  >
    <div css={{ paddingBottom: '100%' }} />
  </div>
)

export default TubeLineStatusSquare
