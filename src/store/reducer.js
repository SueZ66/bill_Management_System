import {combineReducers} from 'redux-immutable';
import {reducer as studentReducer} from '../mainPage/content/editableTable/studentTable/store';
import {reducer as billReducer} from '../mainPage/content/editableTable/billTable/store';
import {reducer as browseReducer} from '../mainPage/content/browseTable/store';
import {reducer as userReducer} from '../loginPage/store';
import {reducer as teacherReducer} from '../mainPage/content/editableTable/teacherTable/store';

const reducer =  combineReducers({
	user: userReducer,
	student: studentReducer,
	bill: billReducer,
	browse: browseReducer,
	teacher: teacherReducer,
}); 

export default reducer;