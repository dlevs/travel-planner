import overArgs from 'lodash/overArgs'
import { Line } from '../api/tfl/generatedResponseTypes'

export const parseBusLineName = (name: string) => {
  const match = /^([A-Z]*)(\d+)$/.exec(name.toUpperCase())

  if (!match) throw new TypeError(`Invalid bus name: "${name}"`)

  return {
    prefix: match[1] as string || null,
    number: Number(match[2])
  }
}

export const busLineNameSorter = (a: string, b: string) => {
  const nameA = parseBusLineName(a)
  const nameB = parseBusLineName(b)

  if (nameA.prefix !== null && nameB.prefix !== null) {
    if (nameA.prefix < nameB.prefix) return -1
    if (nameA.prefix > nameB.prefix) return 1
  }

  if (nameA.prefix !== null && nameB.prefix === null) return 1
  if (nameB.prefix !== null && nameA.prefix === null) return -1

  if (nameA.number < nameB.number) return -1
  if (nameA.number > nameB.number) return 1

  return 0
}

const getBusLineName = ({ name }: Line) => name

export const busLineSorter = overArgs(
  busLineNameSorter,
  [getBusLineName, getBusLineName]
)
