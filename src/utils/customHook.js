import { useSelector, useDispatch } from 'react-redux'
import { sortByText, sortByDate } from '../features/employees'
import { selectEmployeeList } from '../utils/selectors'

export const useSort = (sorting) => {
  const dispatch = useDispatch()
  if (sorting.method === 'dateOfBirth' || sorting.method === 'startDate') {
    dispatch(sortByDate(sorting))
  } else {
    dispatch(sortByText(sorting))
  }
  let sortedData = useSelector(selectEmployeeList)

  return sortedData
}
