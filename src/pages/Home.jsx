import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../features/employees'
import Modal from '../components/Modal'
import Select from '../components/Select'

const Home = () => {
  const [modalDisplay, setModalDisplay] = useState(false)
  const dispatch = useDispatch()

  const firstName = useRef(null)
  const lastName = useRef(null)
  const dateOfBirth = useRef(null)
  const startDate = useRef(null)
  const department = useRef(null)
  const street = useRef(null)
  const city = useRef(null)
  const state = useRef(null)
  const zipCode = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      add({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        dateOfBirth: dateOfBirth.current.value,
        startDate: startDate.current.value,
        department: department.current.value,
        street: street.current.value,
        city: city.current.value,
        state: state.current.value,
        zipCode: zipCode.current.value,
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
            ref={firstName}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            required
            defaultValue="Dubuis"
            ref={lastName}
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            type="date"
            required
            defaultValue="1983-06-18"
            ref={dateOfBirth}
          />

          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            required
            defaultValue="2022-03-29"
            ref={startDate}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              required
              defaultValue="10 rue des Accacias"
              ref={street}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              required
              defaultValue="Joué les tours"
              ref={city}
            />

            <label htmlFor="states">State</label>
            <Select optionSrc="states" ref={state} />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              required
              defaultValue="51100"
              ref={zipCode}
            />
          </fieldset>

          <label htmlFor="departments">Department</label>
          <Select optionSrc="departments" ref={department} />
          <input type="submit" defaultValue="Save" />
        </form>
      </div>

      {modalDisplay && <Modal updateDisplay={setModalDisplay} />}
    </main>
  )
}

export default Home
