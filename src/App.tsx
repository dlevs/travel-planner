/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { Fragment } from 'react'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals, getStopPoint } from './api/tfl/stopPoints'
import { getTubeLineStatuses } from './api/tfl/lines'
import { StopPoint, StopPointArrival } from './api/tfl/generatedResponseTypes'
import TubeLineStatusSquareRow from './components/TubeLineStatusSquareRow'

const EXAMPLE_STOP_ID = '490004963CE'

// const getDetails = () => getStopPoint(EXAMPLE_STOP_ID)
// const getArrivals = () => getStopPointArrivals(EXAMPLE_STOP_ID)

interface StopPointDetailsProps {
  stopPoint: StopPoint;
  arrivals: StopPointArrival[];
}

const StopPointDetails = (props: StopPointDetailsProps) => {
  const { stopPoint, arrivals } = props

  return (
    <Fragment>
      <h2>{stopPoint.commonName}</h2>
      <ul>
        {arrivals
          .sort((a, b) => a.timeToStation - b.timeToStation)
          .map(({ id, timeToStation, lineName }) => (
            <li key={id}>
              {lineName} - {Math.floor(timeToStation / 60) || 'due'}
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

// TODO: Move me:
const GlobalStyles = () => (
  <Global styles={{
    'html, body, #root': {
      width: '100%',
      height: '100%'
    },
    body: {
      background: '#eee'
    },
    '#root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    svg: {
      display: 'block',
      width: 'auto',
      height: 'auto'
    }
  }} />
)

const App = () => {
  // TODO: Show error and loading statuses
  // const [details, detailsStatus] = usePromise(getDetails)
  // const [arrivals, arrivalsStatus] = usePromise(getArrivals)
  const [tubeLineStatuses] = usePromise(getTubeLineStatuses)

  console.log(tubeLineStatuses)
  return (
    <Fragment>
      <GlobalStyles />
      <main
        css={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          margin: 0,
          width: 480,
          height: 320
        }}
      >
        <div css={{ flex: 1 }}>

        </div>
        {tubeLineStatuses && (
          <TubeLineStatusSquareRow
            statuses={tubeLineStatuses}
            css={{ flex: 0 }}
          />
        )}
      </main>
    </Fragment>
  );
}

export default App;
