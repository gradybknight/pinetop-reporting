/*
 * action types
 */

// Global
export const SET_VISIBILITY_FILTER =  'SET_VISIBILITY_FILTER'

// Pot Still
export const SET_POT_STATUS_RUNNING = 'SET_POT_STATUS_RUNNING'
export const SET_POT_LOGS = 'SET_POT_LOGS'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ONLY_DASHBOARD: 'SHOW_ONLY_DASHBOARD'
}

/*
 * action creators
 */

export function setPotStatusRunning(potStatusRunning) {
  return { type: SET_POT_STATUS_RUNNING, potStatusRunning }
}

export function setPotLogs(potLogArray) {
    return { type: SET_POT_LOGS, potLogArray }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}