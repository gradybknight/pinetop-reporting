import { SET_GRAPH_DATA, SET_POT_STATUS } from './types'
import axios from "axios"

export const appendNewTimepoints = () => dispatch => {
    fetch('cheyenne_server')
        .then(res => res.json())
        .then(graphData => dispatch({
            type:SET_GRAPH_DATA,
            payload:graphData
        }))
}

export const setPotStatus = () => dispatch => {
    let serverString = `/api/potstatus`;
    axios.get(serverString)
        .then(res => dispatch({
            type:SET_POT_STATUS,
            payload:res.data.serverPotStatus
        }))
}

// export const setPot = (desiredPotState) => dispatch => {
//     let serverString = `/api/setpot`
//     axios.post(serverString, { desiredPotState: desiredPotState })
//         .then(res => {
//             console.log(`server returned ${res.data.serverPotStatus}`);
//             return res.data.serverPotStatus;
//         })
//         .then(serverPotStatus => dispatch({
//                 type:SET_POT_STATUS,
//                 payload:serverPotStatus
//             })
//         )
// }

export const setPot = (desiredPotState) => dispatch => {
    fetch('/api/setpot', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(desiredPotState)
        })
        .then(res => res.json())
        .then(stillStatus => dispatch({
            type: SET_POT_STATUS,
            payload: stillStatus
        }))
}