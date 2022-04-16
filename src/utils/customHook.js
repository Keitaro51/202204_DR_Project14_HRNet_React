import { useSelector, useDispatch } from 'react-redux'
import { sortEmployee } from '../features/employees'
import { selectEmployeeList } from '../utils/selectors'

export const useSort = (sorting) => {
  const dispatch = useDispatch()
  dispatch(sortEmployee(sorting))
  let sortedData = useSelector(selectEmployeeList)

  return sortedData
}
