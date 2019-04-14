import { Unpacked } from '../../types'

import stopPointSearchResponse from './responses/StopPoint_Search.response.json'
import stopPointResponse from './responses/StopPoint_$.response.json'
import stopPointArrivalsResponse from './responses/StopPoint_$_arrivals.response.json'

import tubeStatusResponse from './responses/line_mode_tube_status.response.json'

export type StopPointSearch = typeof stopPointSearchResponse
export type StopPoint = typeof stopPointResponse
export type StopPointArrival = Unpacked<typeof stopPointArrivalsResponse>
export type StopPointMode = 'national-rail' | 'bus'

export type TubeLineStatusRaw = Unpacked<typeof tubeStatusResponse>
export type TubeLineStatusMeta = {
  color: string;
}
export type TubeLineStatus = TubeLineStatusRaw & TubeLineStatusMeta
