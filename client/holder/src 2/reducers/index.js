import { combineReducers } from 'redux'
import potStill from './potStill'
import visibilityFilter from './visibilityFilter'

const pinetopApp = combineReducers({
  potStill,
  visibilityFilter
})

export default pinetopApp;