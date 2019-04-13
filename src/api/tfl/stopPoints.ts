import { makeAPICall } from './base'
import responses from './stopPoints.responses.json'
import { Unpacked } from '../../types';

type StopPointDetails = typeof responses.details
type StopPointArrival = Unpacked<typeof responses.arrivals>

export const getStopPointDetails = (stopId: string): Promise<StopPointDetails> =>
  makeAPICall(`/StopPoint/${stopId}`)

export const getStopPointArrivals = (stopId: string): Promise<StopPointArrival[]> =>
  makeAPICall(`/StopPoint/${stopId}/arrivals`)
