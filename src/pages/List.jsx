import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSort } from '../utils/customHook'
import { selectEmployeeList } from '../utils/selectors'

import '../style/list.css'
import PageNav from '../components/PageNav'

const List = () => {
  let data = useSelector(selectEmployeeList)

  const [list, setList] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [nbrOfPages, setNbrOfPages] = useState(null)
  const [sorting, setSorting] = useState({
    method: 'firstName',
    direction: 'asc',
  })

  const tableLength = useRef({ value: 10 })
  const search = useRef({ value: '' })

  /**
   * Determine number of pages necessary to all datas
   */
  const pagesNumberDetermination = useCallback(() => {
    setNbrOfPages(Math.ceil(list.length / parseInt(tableLength.current.value)))
  }, [list.length])

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
  const sortedData = useSort(sorting)
  useEffect(() => {
    setList(sortedData)
  }, [sortedData])

  const onSearch = () => {
    const filtered = []
    data.forEach((employee) => {
      if (
        Object.values(employee)
          .slice(1)
          .toString()
          .toLowerCase()
          .includes(search.current.value.toLowerCase())
      ) {
        filtered.push(employee)
      }
    })
    setList(filtered)
    setCurrentPage(1)
  }

  let pagedData = list.filter(
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
    <main className="container">
      <h1>Current Employees</h1>
      <div className="dataTable_wrapper">
        <div className="dataTable_length">
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
        <div className="dataTable_filter">
          <label htmlFor="search">
            Search:
            <input
              id="search"
              type="search"
              ref={search}
              onChange={onSearch}
            ></input>
          </label>
        </div>
        <table className="dataTable ">
          <thead>
            <tr>
              <th
                className={
                  sorting.method === 'firstName'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('firstName')}
              >
                First Name
              </th>
              <th
                className={
                  sorting.method === 'lastName'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('lastName')}
              >
                Last Name
              </th>
              <th
                className={
                  sorting.method === 'startDate'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('startDate')}
              >
                Start Date
              </th>
              <th
                className={
                  sorting.method === 'department'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('department')}
              >
                Department
              </th>
              <th
                className={
                  sorting.method === 'dateOfBirth'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('dateOfBirth')}
              >
                Date of Birth
              </th>
              <th
                className={
                  sorting.method === 'street'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('street')}
              >
                Street
              </th>
              <th
                className={
                  sorting.method === 'city'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('city')}
              >
                City
              </th>
              <th
                className={
                  sorting.method === 'state'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('state')}
              >
                State
              </th>
              <th
                className={
                  sorting.method === 'zipCode'
                    ? `sorting_${sorting.direction}`
                    : 'sorting'
                }
                onClick={() => setSortBy('zipCode')}
              >
                Zip Code
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td className="dataTable_empty" colSpan="9">
                  No matching records found
                </td>
              </tr>
            ) : (
              pagedData.map((employee) => (
                <tr key={employee.id}>
                  <td
                    className={sorting.method === 'firstName' ? 'sorting' : ''}
                  >
                    {employee.firstName}
                  </td>
                  <td
                    className={sorting.method === 'lastName' ? 'sorting' : ''}
                  >
                    {employee.lastName}
                  </td>
                  <td
                    className={sorting.method === 'startDate' ? 'sorting' : ''}
                  >
                    {employee.startDate}
                  </td>
                  <td
                    className={sorting.method === 'department' ? 'sorting' : ''}
                  >
                    {employee.department}
                  </td>
                  <td
                    className={
                      sorting.method === 'dateOfBirth' ? 'sorting' : ''
                    }
                  >
                    {employee.dateOfBirth}
                  </td>
                  <td className={sorting.method === 'street' ? 'sorting' : ''}>
                    {employee.street}
                  </td>
                  <td
                    className={
                      sorting.method === 'firstNcityame' ? 'sorting' : ''
                    }
                  >
                    {employee.city}
                  </td>
                  <td className={sorting.method === 'state' ? 'sorting' : ''}>
                    {employee.state}
                  </td>
                  <td className={sorting.method === 'zipCode' ? 'sorting' : ''}>
                    {employee.zipCode}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="dataTable_info">
          Showing {minDataIndex + 1} to
          {(currentPage - 1) * tableLength.current.value +
            pagedData.length} of {list.length}
          entries{' '}
          {data.length !== list.length &&
            `(filtered from ${data.length} total entries)`}
        </div>
        <PageNav
          currentPage={currentPage}
          nbrOfPages={nbrOfPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Link to="/">Home</Link>
    </main>
  )
}

export default List
