import { makeAPICall } from './base'
import { TubeStatus } from './generatedResponseTypes'

interface TubeStatusMeta {
  color: string;
}

export type TubeStatusExtended = TubeStatus & TubeStatusMeta

const tubeLineMetaMap: { [key: string]: TubeStatusMeta } = {
  bakerloo: { color: '#b36305' },
  central: { color: '#e32017' },
  circle: { color: '#ffd300' },
  district: { color: '#00782a' },
  'hammersmith-city': { color: '#f3a9bb' },
  jubilee: { color: '#a0a5a9' },
  metropolitan: { color: '#9b0056' },
  northern: { color: '#000' },
  piccadilly: { color: '#003688' },
  victoria: { color: '#0098d4' },
  'waterloo-city': { color: '#95cdba' },
  default: { color: '#fff' }
}

const decorateTubeLine = (line: TubeStatus) => ({
  ...line,
  ...(tubeLineMetaMap[line.id] || tubeLineMetaMap.default)
})

export const getTubeLineStatuses = async () => {
  const response: TubeStatus[] = await makeAPICall('/line/mode/tube/status')
  return response.map(decorateTubeLine)
}
