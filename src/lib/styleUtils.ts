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
