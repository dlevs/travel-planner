/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { Fragment } from 'react'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals, getStopPoint } from './api/tfl/stopPoints'
import { getTubeLineStatuses } from './api/tfl/lines'
import { StopPoint, StopPointArrival } from './api/tfl/types'
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

const App = () => {
  // TODO: Show error and loading statuses
  // const [details, detailsStatus] = usePromise(getDetails)
  // const [arrivals, arrivalsStatus] = usePromise(getArrivals)
  const [tubeLineStatuses] = usePromise(getTubeLineStatuses)

  return (
    <Fragment>
      <Global styles={{
        html: {
          background: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          overflow: 'hidden'
        },
        body: {
          background: '#fff',
          margin: 0,
          width: 480,
          height: 320,
          overflow: 'hidden'
        }
      }} />
      {tubeLineStatuses && (
        <TubeLineStatusSquareRow statuses={tubeLineStatuses} />
      )}
      {/* {details && arrivals && (
        <StopPointDetails
          details={details}
          arrivals={arrivals}
        />
      )} */}
    </Fragment>
  );
}

export default App;
