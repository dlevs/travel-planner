import { makeAPICall } from './base'
import responses from './lines.responses.json'
import { Unpacked } from '../../types'

type TubeLineStatusRaw = Unpacked<typeof responses.tubeLineStatuses>

const colorMap: { [key: string]: string } = {
  bakerloo: '#b36305',
  central: '#e32017',
  circle: '#ffd300',
  district: '#00782a',
  'hammersmith-city': '#f3a9bb',
  jubilee: '#a0a5a9',
  metropolitan: '#9b0056',
  northern: '#000',
  piccadilly: '#003688',
  victoria: '#0098d4',
  'waterloo-city': '#95cdba',
  default: '#fff'
}

const decorateTubeLineWithColor = (line: TubeLineStatusRaw) => ({
  ...line,
  color: colorMap[line.id] || colorMap.default
})

export const getTubeLineStatuses = async () => {
  const response: TubeLineStatusRaw[] = await makeAPICall('/line/mode/tube/status')
  return response.map(decorateTubeLineWithColor)
}
