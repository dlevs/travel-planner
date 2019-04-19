/** @jsx jsx */
import { jsx } from '@emotion/core'
import { HTMLProps } from 'react'
import { visuallyHidden } from '../lib/styleUtils'

const RadioBox = ({ children, checked, ...rest }: HTMLProps<HTMLInputElement>) => (
  <label css={{
    fontWeight: 300,
    transform: `scale(${checked ? 1.25 : 1})`,
    transformOrigin: 'center bottom',
    transition: 'transform 0.3s',
    margin: '0 8px',
    display: 'inline-block',
    ':first-of-type': { marginLeft: 0 },
    ':last-of-type': { marginRight: 0 }
  }}>
    {checked && (
      <span
        aria-hidden={'true'}
        css={{
          fontWeight: 700,
          position: 'absolute'
        }}
      >
        {children}
      </span>
    )}
    <span css={{
      color: checked ? 'transparent' : undefined
    }}>
      {children}
    </span>
    <input
      css={visuallyHidden}
      type={'radio'}
      checked={checked}
      {...rest}
    />
  </label>
)

export default RadioBox
