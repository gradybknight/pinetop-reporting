import { SET_USER_INFORMATION, SET_ACTIVE_CARD } from '../actions/types'

const initialState = {
    userName:'anonymous',
    allowedTabs:    [
                    'Dashboard',
                    'Explanation',
                    'Stripping Pot',
                    // 'Fractional Still',
                    'Inventory Management'                
    ],
    activeCard:'Dashboard'
}

// Currently Planned Tabs
// allowedTabs:    [
//     'Dashboard',
//     'Explanation',
//     'Mash Tun',
//     'Stripping Pot',
//     'Fractional Still',
//     'Inventory Management'                
// ],

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_USER_INFORMATION:
            return {
                ...state,
                userName:action.payload.userInformation.userName,
                allowedTabs:action.payload.userInformation.allowedTabs
            }
        case SET_ACTIVE_CARD:
            return {
                ...state,
                activeCard:action.payload,
            }
        default:
            return state;
    }
}