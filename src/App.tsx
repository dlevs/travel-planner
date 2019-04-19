/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import sortBy from 'lodash/sortBy'
import overArgs from 'lodash/overArgs'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals, getStopPoint } from './api/tfl/stopPoints'
import { getTubeLineStatuses } from './api/tfl/lines'
import { StopPoint, StopPointArrival } from './api/tfl/generatedResponseTypes'
import TubeLineStatusRow from './components/TubeLineStatusRow'
import { StylesGlobal } from './components/StylesGlobal'
import { constrainToScreenSize } from './lib/styleUtils'
import { busLineSorter } from './lib/busLineUtils'

const EXAMPLE_STOP_ID = '490004963CE'

const getDetails = () => getStopPoint(EXAMPLE_STOP_ID)
const getArrivals = () => getStopPointArrivals(EXAMPLE_STOP_ID)

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
        {stopPoint.lines
          .sort(busLineSorter)
          .map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))
        }
      </ul>
      <ul>
        {sortBy(arrivals, 'timeToStation').map(({ id, timeToStation, lineName }) => (
          <li key={id}>
            {lineName} - {Math.floor(timeToStation / 60) || 'due'}
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

const App = () => {
  // TODO: Show error and loading statuses
  const [details, detailsStatus] = usePromise(getDetails)
  const [arrivals, arrivalsStatus] = usePromise(getArrivals)
  const [tubeLineStatuses] = usePromise(getTubeLineStatuses)

  console.log(tubeLineStatuses)
  return (
    <Fragment>
      <StylesGlobal />
      <main
        css={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          ...constrainToScreenSize(480, 320)
        }}
      >
        {details && arrivals && (
          <div css={{ flex: 1 }}>
            <StopPointDetails
              stopPoint={details}
              arrivals={arrivals}
            />
          </div>
        )}
        {tubeLineStatuses && (
          <TubeLineStatusRow
            statuses={tubeLineStatuses}
            css={{ flex: 0 }}
          />
        )}
      </main>
    </Fragment>
  );
}

export default App;
