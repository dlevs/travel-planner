const { fetch } = window
const API_HOST = 'https://api.tfl.gov.uk'

export const makeAPICall = async (endpoint: string) => {
  const response = await fetch(`${API_HOST}${endpoint}`)
  return response.json()
}
