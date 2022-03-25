import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import Select from '../components/Select'

const Home = () => {
  const [modalDisplay, setModalDisplay] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await setModalDisplay(true)
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
          <input type="text" id="first-name" required defaultValue="Hector" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" required defaultValue="Dubuis" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            type="date"
            required
            defaultValue="1983-06-18"
          />

          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            required
            defaultValue="2022-03-29"
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              required
              defaultValue="10 rue des Accacias"
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              required
              defaultValue="Joué les tours"
            />

            <label htmlFor="states">State</label>
            <Select optionSrc="states" />

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" required defaultValue="51100" />
          </fieldset>

          <label htmlFor="departments">Department</label>
          <Select optionSrc="departments" />
          <input type="submit" defaultValue="Save" />
        </form>
      </div>

      {modalDisplay && <Modal updateDisplay={setModalDisplay} />}
    </main>
  )
}

export default Home
