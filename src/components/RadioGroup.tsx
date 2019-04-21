/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import RadioBox from './RadioBox'

let uniqueNameCount = 0

interface Props {
  name?: string;
  value: string | null;
  setValue: (value: string | null) => void;
  options: {
    value: string,
    label: string
  }[];
}

const RadioGroup = ({
  name = `RadioGroup-${uniqueNameCount++}`,
  options,
  value,
  setValue
}: Props) => (
  <Fragment>
    {options.map(option => (
      <RadioBox
        key={option.value}
        name={name}
        value={option.value}
        checked={option.value === value}
        onChange={() => setValue(option.value)}
      >
        {option.label}
      </RadioBox>
    ))}
  </Fragment>
)

export default RadioGroup
