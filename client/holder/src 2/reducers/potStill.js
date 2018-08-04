const potStillInitialState = {
    potLogArray=[],
    potStatusRunning=false,
    potTemperature=0,
    potElapsedTime=0
}

function potStill(state = potStillInitialState, action) {
    switch (action.type) {
        case SET_POT_STATUS_RUNNING:
            return Object.assign({}, state, {
                potStatusRunning: action.potStatusRunning
            })
        case SET_POT_LOGS:
            return Object.assign({}, state, {
                potLogArray: action.potLogArray
            })
        default:
            return state
    }
}

export default potStill;
