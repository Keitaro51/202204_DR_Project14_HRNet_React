import { useEffect, useState, forwardRef } from 'react'
import { departments, states } from '../asssets/data'

const FormSelect = ({ optionSrc }, ref) => {
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
    <select name={optionSrc} id={optionSrc} required ref={ref}>
      <option value="">--Please choose an option--</option>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default forwardRef(FormSelect)
