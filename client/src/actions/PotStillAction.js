import { SET_GRAPH_DATA, SET_POT_STATUS , SET_LAST_TIME_POINT} from './types'
import axios from "axios"


export const setPotStatus = () => dispatch => {
    let serverString = `/api/potstatus`;
    axios.get(serverString)
        .then(res => dispatch({
            type:SET_POT_STATUS,
            payload:res.data.serverPotStatus
        }))
}

export const setPot = (desiredPotState) => dispatch => {
    let serverString = `/api/setpot`
    axios.post(serverString, { desiredPotState: desiredPotState })
        .then(res => {
            console.log(`server returned ${res.data.serverPotStatus}`);
            return res.data.serverPotStatus;
        })
        .then(serverPotStatus => dispatch({
                type:SET_POT_STATUS,
                payload:serverPotStatus
            })
        )
}

export const setGraphData = (lastTimePoint) => dispatch => {
    let serverString = `/api/potgraphdata`
    console.log('got it');
    axios.get(serverString)
        .then(res => {
            console.log(`server returned ${res.data.serverGraphData}`);
            let newDataPoints = res.data.serverGraphData.filter(dataPoint => dataPoint.x > lastTimePoint);
            console.log(newDataPoints);
            return newDataPoints;
        })
        .then(newDataPoints => dispatch({
                type:SET_GRAPH_DATA,
                payload:newDataPoints
            })
        )
}

export const setLastTimePoint = (lastTimePoint) => ({
        type:SET_LAST_TIME_POINT,
        payload:lastTimePoint
});