import { parseBusLineName, busLineNameSorter } from './busLineUtils'

describe('parseBusLineName()', () => {
  test('parses bus names without a prefix', () => {
    expect(parseBusLineName('0')).toMatchObject({ prefix: null, number: 0 })
    expect(parseBusLineName('10')).toMatchObject({ prefix: null, number: 10 })
    expect(parseBusLineName('486')).toMatchObject({ prefix: null, number: 486 })
  })

  test('parses bus names with a prefix', () => {
    expect(parseBusLineName('B0')).toMatchObject({ prefix: 'B', number: 0 })
    expect(parseBusLineName('N10')).toMatchObject({ prefix: 'N', number: 10 })
    expect(parseBusLineName('CRAZY486')).toMatchObject({ prefix: 'CRAZY', number: 486 })
  })
})

describe('busLineNameSorter()', () => {
  test('correctly sorts bus names', () => {
    expect(
      ['B16', '1', '120', '10', 'B14', 'C6', '6', '89', 'N89', '2'].sort(busLineNameSorter)
    ).toMatchObject(
      ['1', '2', '6', '10', '89', '120', 'B14', 'B16', 'C6', 'N89'])
  })
})
