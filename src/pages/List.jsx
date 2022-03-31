import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmployeeList } from '../utils/selectors'

const List = () => {
  const data = useSelector(selectEmployeeList)
  const [currentPage, setCurrentPage] = useState(1)
  const [nbrOfPages, setNbrOfPages] = useState(null)
  const tableLength = useRef({ value: 10 })

  useEffect(() => {
    displayLength()
  })

  let nbrOfPageButtons = new Array(nbrOfPages).fill(0)

  const minIndex = parseInt(tableLength.current.value) * (currentPage - 1)
  const maxIndex = currentPage * parseInt(tableLength.current.value) - 1
  let sortData = data.filter(
    (_employee, index) => index >= minIndex && index <= maxIndex
  )

  function displayLength() {
    setNbrOfPages(Math.ceil(data.length / parseInt(tableLength.current.value)))
  }

  return (
    <section>
      <h1>Current Employees</h1>
      <div>
        <label htmlFor="show">
          Show
          <select
            onChange={displayLength}
            name="show"
            id="show"
            required
            ref={tableLength}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </label>
      </div>
      <div>Search</div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {sortData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>
          Showing {minIndex + 1} to
          {(currentPage - 1) * tableLength.current.value +
            sortData.length} of {data.length}
          entries
        </p>

        {currentPage !== 1 && (
          <p onClick={() => setCurrentPage(currentPage - 1)}>Previous</p>
        )}

        {nbrOfPageButtons.map((_button, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}

        {currentPage !== nbrOfPages && (
          <p onClick={() => setCurrentPage(currentPage + 1)}>Next</p>
        )}
      </div>
      <Link to="/">Home</Link>
    </section>
  )
}

export default List
