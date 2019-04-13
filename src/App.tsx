import React from 'react'
import usePromise from './hooks/usePromise'
import { getStopPointArrivals } from './api/stopPointsAPI'

const EXAMPLE_STOP_ID = '490004963CE'

const getArrivals = () => getStopPointArrivals(EXAMPLE_STOP_ID)

const App = () => {
  const [arrivals, arrivalsStatus] = usePromise(getArrivals)

  return (
    <>
      {arrivalsStatus}<br />
      {arrivals && arrivals[0].lineName}
    </>
  );
}

export default App;
