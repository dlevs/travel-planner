export const constrainToScreenSize = (width: number, height: number) => ({
  width,
  height,
  [`@media (min-width: ${width + 1}px), (min-height: ${height + 1}px)`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

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
