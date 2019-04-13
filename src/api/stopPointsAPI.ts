import responses from './stopPointsAPI.responses.json'

const { fetch } = window
const API_HOST = 'https://api.tfl.gov.uk'

const makeAPICall = async (endpoint: string) => {
  const response = await fetch(`${API_HOST}/${endpoint}`)
  return response.json()
}

export const getStopPointArrivals = (stopId: string): Promise<typeof responses.arrivals> =>
  makeAPICall(`/StopPoint/${stopId}/arrivals`)
