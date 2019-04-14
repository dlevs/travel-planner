import { makeAPICall } from './base'
import { TubeLineStatus as TubeLineStatusRaw } from './apiTypes'

interface TubeLineMeta {
  color: string;
}
const tubeLineMeta: { [key: string]: TubeLineMeta } = {
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

const decorateTubeLine = (line: TubeLineStatusRaw) => ({
  ...line,
  ...(tubeLineMeta[line.id] || tubeLineMeta.default)
})

export const getTubeLineStatuses = async () => {
  const response: TubeLineStatusRaw[] = await makeAPICall('/line/mode/tube/status')
  return response.map(decorateTubeLine)
}
