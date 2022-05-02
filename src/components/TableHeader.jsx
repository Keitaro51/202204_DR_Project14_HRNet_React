const TableHeader = ({ sorting, setSortBy }) => {
  return (
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
  )
}

export default TableHeader
