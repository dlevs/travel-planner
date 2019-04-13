/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { Fragment } from 'react'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals, getStopPointDetails } from './api/stopPointsAPI'

const EXAMPLE_STOP_ID = '490004963CE'

// TODO: Move this type:
type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T;

const getDetails = () => getStopPointDetails(EXAMPLE_STOP_ID)
const getArrivals = () => getStopPointArrivals(EXAMPLE_STOP_ID)

interface StopPointDetailsProps {
  details: Unpacked<ReturnType<typeof getDetails>>;
  arrivals: Unpacked<ReturnType<typeof getArrivals>>;
}

const StopPointDetails = (props: StopPointDetailsProps) => {
  const { details, arrivals } = props

  return (
    <Fragment>
      <h2>{details.commonName}</h2>
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
  const [details, detailsStatus] = usePromise(getDetails)
  const [arrivals, arrivalsStatus] = usePromise(getArrivals)

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
      {details && arrivals && (
        <StopPointDetails
          details={details}
          arrivals={arrivals}
        />
      )}
    </Fragment>
  );
}

export default App;
