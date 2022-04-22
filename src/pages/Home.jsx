import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../features/employees'
import Modal from '../components/Modal'
import FormSelect from '../components/FormSelect'

import { DatePicker } from 'oc_p14_hrnet_datepicker/dist/index'

const Home = () => {
  const [modalDisplay, setModalDisplay] = useState(false)
  const dispatch = useDispatch()

  const inputs = useRef([])
  const addInputs = (el) => {
    el && !inputs.current.includes(el) && inputs.current.push(el)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      add({
        firstName: inputs.current[0].value,
        lastName: inputs.current[1].value,
        dateOfBirth: inputs.current[2].value,
        startDate: inputs.current[3].value,
        street: inputs.current[4].value,
        city: inputs.current[5].value,
        state: inputs.current[6].value,
        zipCode: inputs.current[7].value,
        department: inputs.current[8].value,
      })
    )
    setModalDisplay(true)
  }

  return (
    <main>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            required
            defaultValue="Hector"
            ref={addInputs}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            required
            defaultValue="Dubuis"
            ref={addInputs}
          />

          {/* <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            type="date"
            required
            defaultValue="1983-06-18"
            ref={addInputs}
          /> */}
          <DatePicker
            forId="date-of-birth"
            content="Date of Birth"
            ref={addInputs}
          />
          {/* <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            required
            defaultValue="1983-06-18"
            ref={addInputs}
          /> */}
          <DatePicker forId="start-date" content="Start Date" ref={addInputs} />
          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              required
              defaultValue="10 rue des Accacias"
              ref={addInputs}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              required
              defaultValue="Joué les tours"
              ref={addInputs}
            />

            <label htmlFor="states">State</label>
            <FormSelect optionSrc="states" ref={addInputs} />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              required
              defaultValue="51100"
              ref={addInputs}
            />
          </fieldset>

          <label htmlFor="departments">Department</label>
          <FormSelect optionSrc="departments" ref={addInputs} />
          <input type="submit" defaultValue="Save" />
        </form>
      </div>

      {modalDisplay && <Modal updateDisplay={setModalDisplay} />}
    </main>
  )
}

export default Home
