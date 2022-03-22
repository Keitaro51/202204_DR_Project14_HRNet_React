import { useSelector } from 'react-redux'

const List = () => {
  const data = useSelector((state) => state.employees.list)

  return (
    <section>
      {data.map((employee) => (
        <div key={employee.id}>{employee.id}</div>
      ))}
    </section>
  )
}

export default List
