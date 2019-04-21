/** @jsx jsx */
import { jsx, Global } from '@emotion/core'

export const StylesGlobal = () => (
  <Global
    styles={{
      '*, *::after, *::before': {
        boxSizing: 'border-box',
        '-moz-osx-font-smoothing': 'grayscale',
        '-webkit-font-smoothing': 'antialiased',
        fontSmoothing: 'antialiased',

        // Prevent every small interaction resulting in text selection
        // on raspberry pi touch screen
        userSelect: 'none'
      },
      html: {
        background: '#eee',
        fontFamily: `'Open Sans', sans-serif`,
        fontSize: 16,
        color: '#444'
      },
      'html, body, #root': {
        overflow: 'hidden',
        margin: 0,
        padding: 0
      },
      svg: {
        display: 'block',
        width: 'auto',
        height: 'auto'
      },
      'h1,h2,h3,h4,h5,h6': {
        marginTop: 0
      }
    }}
  />
)

export default StylesGlobal
