import qs from 'querystringify'
import { makeAPICall } from './base'
import { StopPoint, StopPointArrival, StopPointSearch, StopPointMode } from './types'

export const getStopPoint = (stopId: string): Promise<StopPoint> =>
  makeAPICall(`/StopPoint/${stopId}`)

export const getStopPointArrivals = (stopId: string): Promise<StopPointArrival[]> =>
  makeAPICall(`/StopPoint/${stopId}/Arrivals`)

export const searchStopPoints = (query: string, mode: StopPointMode ): Promise<StopPointSearch> =>
  makeAPICall(`/StopPoint/Search?${qs.stringify({ query, mode })}`)
