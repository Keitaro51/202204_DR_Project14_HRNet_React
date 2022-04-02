import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmployeeList } from '../utils/selectors'

const List = () => {
  let data = useSelector(selectEmployeeList)
  const [currentPage, setCurrentPage] = useState(1)
  const [nbrOfPages, setNbrOfPages] = useState(null)
  const [sorting, setSorting] = useState({
    method: 'firstName',
    direction: 'asc',
  })

  const tableLength = useRef({ value: 10 })

  /**
   * Determine number of pages necessary to all datas
   */
  const pagesNumberDetermination = useCallback(() => {
    setNbrOfPages(Math.ceil(data.length / parseInt(tableLength.current.value)))
  }, [data.length])

  // create an array with same length than page number, for mapping the right number of buttons
  let nbrOfPageButtons = new Array(nbrOfPages).fill(undefined)

  useEffect(() => {
    pagesNumberDetermination()
  }, [pagesNumberDetermination])

  // determine min and max indexes of data array depending on page size
  const minDataIndex = parseInt(tableLength.current.value) * (currentPage - 1)
  const maxDataIndex = currentPage * parseInt(tableLength.current.value) - 1

  /**
   * Switch between no sorting, ascendant sorting or descendant sorting
   * @param {string} sortBy determine method (by firstname, lastname, city, etc...)
   */
  const setSortBy = (sortBy) => {
    if (sorting.method === sortBy) {
      sorting.direction === 'asc'
        ? setSorting({ method: sortBy, direction: 'desc' })
        : setSorting({ method: sortBy, direction: 'asc' })
    } else {
      setSorting({ method: sortBy, direction: 'asc' })
    }
  }
  //FIXME need dataCopy l47 54 57 58 or generate error during first list render after employee creation
  const sort = () => {
    let dataCopy = [...data].sort((a, b) => {
      if (sorting.direction === 'asc') {
        return a[sorting.method].toLowerCase() < b[sorting.method].toLowerCase()
          ? -1
          : 1
      } else {
        return a[sorting.method].toLowerCase() < b[sorting.method].toLowerCase()
          ? 1
          : -1
      }
    })
    return dataCopy
  }

  let sortedData = sort()
  let pagedData = sortedData.filter(
    (_employee, index) => index >= minDataIndex && index <= maxDataIndex
  )

  /**
   * security for specific case
   * (e.g. positioning on last page then switch to a lower show select value doesn't render the first page
   * but en empty page with invalid side informations)
   */
  function onChange() {
    setCurrentPage(1)
    pagesNumberDetermination()
  }

  return (
    <section>
      <h1>Current Employees</h1>
      <div>
        <label htmlFor="show">
          Show
          <select
            onChange={onChange}
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
            <th onClick={() => setSortBy('firstName')}>First Name</th>
            <th onClick={() => setSortBy('lastName')}>Last Name</th>
            <th onClick={() => setSortBy('startDate')}>Start Date</th>
            <th onClick={() => setSortBy('department')}>Department</th>
            <th onClick={() => setSortBy('dateOfBirth')}>Date of Birth</th>
            <th onClick={() => setSortBy('street')}>Street</th>
            <th onClick={() => setSortBy('city')}>City</th>
            <th onClick={() => setSortBy('state')}>State</th>
            <th onClick={() => setSortBy('zipCode')}>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((employee) => (
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
          Showing {minDataIndex + 1} to
          {(currentPage - 1) * tableLength.current.value +
            pagedData.length} of {data.length}
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
