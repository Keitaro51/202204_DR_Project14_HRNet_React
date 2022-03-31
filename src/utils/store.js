import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage'
import employeesReducer from '../features/employees'

const persistedState = loadState()

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  preloadedState: persistedState,
})

store.subscribe(() => {
  saveState({ employees: store.getState().employees })
})
