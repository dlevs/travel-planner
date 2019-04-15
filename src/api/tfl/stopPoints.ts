import qs from 'querystringify'
import { makeAPICall } from './base'
import { StopPoint, StopPointArrival, StopPointSearch, Mode } from './generatedResponseTypes'

export const getStopPoint = (stopId: string): Promise<StopPoint> =>
  makeAPICall(`/StopPoint/${stopId}`)

export const getStopPointArrivals = (stopId: string): Promise<StopPointArrival[]> =>
  makeAPICall(`/StopPoint/${stopId}/Arrivals`)

export const searchStopPoints = (query: string, mode: Mode ): Promise<StopPointSearch> =>
  makeAPICall(`/StopPoint/Search?${qs.stringify({ query, mode })}`)
