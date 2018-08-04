import { combineReducers} from 'redux';
import postReducer from './postReducer';
import potStillReducer from './potStillReducer';
import userReducer from './userReducer';

export default combineReducers({
    posts: postReducer,
    potStill: potStillReducer,
    userInfo: userReducer
});