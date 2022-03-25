import { useEffect, useState } from 'react'
import { departments, states } from '../asssets/data'

const Select = ({ optionSrc }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (optionSrc === 'departments') {
      setOptions(departments)
    }
    if (optionSrc === 'states') {
      setOptions(states)
    }
  }, [optionSrc])

  return (
    <select name={optionSrc} id={optionSrc} required>
      <option value="">--Please choose an option--</option>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select
