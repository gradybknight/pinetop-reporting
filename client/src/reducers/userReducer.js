import { SET_USER_INFORMATION, SET_ACTIVE_CARD, SET_NEXT_EXPLANATION_CARD } from '../actions/types'

const initialState = {
    userName:'anonymous',
    allowedTabs:    [
                    'Explanation',
                    'Dashboard',
                    'Stripping Pot',
                    // 'Fractional Still',
                    'Inventory Management'                
    ],
    activeCard:'Dashboard',
    arrayOfExplanations: [
            {
                headline:'What was our vision for the distillery',
                img:'yawn.jpg',
                description:'how hard could it be?'
            },
            {
                headline:'What engineering and business constraints did we encounter?',
                img:'yawn.jpg',
                description:'cost and day jobs'
            },
            {
                headline:'How did I solve the equipment cost issue?',
                img:'yawn.jpg',
                description:'designed and fabricated my stills'
            },
            {
                headline:'How did I solve the labor cost issue?',
                img:'yawn.jpg',
                description:'wrote the automation for each unit operation'
            },
            {
                headline:'What is our current state?',
                img:'yawn.jpg',
                description:'CLI'
            },
            {
                headline:'How am I transforming the backend?',
                img:'yawn.jpg',
                description:'replace java with node, express, and passport'
            },
            {
                headline:'How am I transforming the frontend?',
                img:'yawn.jpg',
                description:'replace VPN and CLI with React and Redux'
            }
        ],
    currentArrayIndex:0
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
        case SET_NEXT_EXPLANATION_CARD:
            return {
                ...state,
                currentArrayIndex:action.payload
            }
        default:
            return state;
    }
}