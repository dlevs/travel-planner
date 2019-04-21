/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useState } from 'react'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals, getStopPoint } from './api/tfl/stopPoints'
import { getTubeLineStatuses } from './api/tfl/lines'
import { StopPoint, StopPointArrival } from './api/tfl/generatedResponseTypes'
import RadioGroup from './components/RadioGroup'
import TubeLineStatusRow from './components/TubeLineStatusRow'
import { StylesGlobal } from './components/StylesGlobal'
import { constrainToScreenSize } from './lib/styleUtils'
import { busLineSorter } from './lib/busLineUtils'
import Clock from './components/Clock';

const EXAMPLE_STOP_ID = '490004963CE'

const getDetails = () => getStopPoint(EXAMPLE_STOP_ID)
const getArrivals = () => getStopPointArrivals(EXAMPLE_STOP_ID)

interface StopPointDetailsProps {
  stopPoint: StopPoint;
  arrivals: StopPointArrival[];
}

const StopPointDetails = (props: StopPointDetailsProps) => {
  const { stopPoint, arrivals } = props
  const [selectedBusLine, setSelectedBusLine] = useState(
    stopPoint.lines.length ? stopPoint.lines[0].id : null
  )

  return (
    <Fragment>
      {/* TODO: Move this heading style */}
      <h2 css={{ fontWeight: 300, fontSize: '1.25rem', marginBottom: '0.25rem' }}>
        {stopPoint.commonName}
      </h2>
      <RadioGroup
        options={
          stopPoint.lines
            .sort(busLineSorter)
            .map(({ id, name }) => ({ value: id, label: name }))
        }
        value={selectedBusLine}
        setValue={setSelectedBusLine}
      />
      {/* <ul>
        {sortBy(arrivals, 'timeToStation').map(({ id, timeToStation, lineName }) => (
          <li key={id}>
            {lineName} - {Math.floor(timeToStation / 60) || 'due'}
          </li>
        ))}
      </ul> */}
    </Fragment>
  )
}

const App = () => {
  // TODO: Show error and loading statuses
  const [details, detailsStatus] = usePromise(getDetails)
  const [arrivals, arrivalsStatus] = usePromise(getArrivals)
  const [tubeLineStatuses] = usePromise(getTubeLineStatuses)

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
        <div css={{ flex: 1, padding: '0.5rem' }}>
          <Clock />
          {details && arrivals && (
            <StopPointDetails
              stopPoint={details}
              arrivals={arrivals}
            />
          )}
        </div>
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
