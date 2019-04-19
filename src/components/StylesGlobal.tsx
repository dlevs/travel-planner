/** @jsx jsx */
import { jsx, Global } from '@emotion/core'

export const StylesGlobal = () => (
  <Global
    styles={{
      html: {
        background: '#eee',
        fontFamily: `'Open Sans', sans-serif`,
        color: '#444'
      },
      body: {
        margin: 0
      },
      svg: {
        display: 'block',
        width: 'auto',
        height: 'auto'
      }
    }}
  />
)

export default StylesGlobal
