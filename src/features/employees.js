import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = { list: [] }

/*mock dispatch for reduxDevTools */
const dispatchExample = {
  type: 'employee/add',
  payload: {
    firstName: '1',
    lastName: '1',
    dateOfBirth: '1',
    startDate: '1',
    department: '1',
    street: '1',
    city: '1',
    state: '1',
    zipCode: '1',
  },
}

const { actions, reducer } = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push({
        id: uuidv4(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        startDate: action.payload.startDate,
        department: action.payload.department,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
      })
      return
    },
    sortByText: (state, action) => {
      state.list.sort((a, b) => {
        const firstEntrie = a[action.payload.method].toLowerCase()
        const secondEntrie = b[action.payload.method].toLowerCase()
        if (action.payload.direction === 'asc') {
          return firstEntrie.localeCompare(secondEntrie)
        } else {
          return secondEntrie.localeCompare(firstEntrie)
        }
      })
      return state
    },
    sortByDate: (state, action) => {
      state.list.sort((a, b) => {
        const firstEntrie = new Date(a[action.payload.method])
        const secondEntrie = new Date(b[action.payload.method])
        if (action.payload.direction === 'asc') {
          return firstEntrie - secondEntrie
        } else {
          return secondEntrie - firstEntrie
        }
      })
      return state
    },
  },
})

export const { add, sortByText, sortByDate } = actions

export default reducer
