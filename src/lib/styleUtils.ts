import { CSSObject } from '@emotion/core';

export const constrainToScreenSize = (width: number, height: number) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  // []: {
  //   // Hide cursor on raspberry pi. TODO: Don't do this for desktop
  //   cursor: 'none'
  // },
  [`@media (min-width: ${width + 1}px), (min-height: ${height + 1}px)`]: {
    width,
    height,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
} as CSSObject)

export const visuallyHidden = {
	position: 'absolute',
	overflow: 'hidden',
	clip: 'rect(0 0 0 0)',
	height: 1,
	width: 1,
	margin: -1,
	padding: 0,
	border: 0
} as const
