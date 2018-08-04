import { SET_USER_INFORMATION , SET_ACTIVE_CARD} from './types';

export const setUserInformation = userInformation => ({
        type: SET_USER_INFORMATION,
        payload: userInformation //pass object containing userName (string) and allowedTabs (array)
    });

export const setActiveCard = (activeCard) => ({
        type: SET_ACTIVE_CARD,
        payload: activeCard
    });
