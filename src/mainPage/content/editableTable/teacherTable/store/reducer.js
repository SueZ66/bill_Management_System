import * as actionTypes from './actionTypes';

const defaultState = ({
	teacherList: [],
	editingKey: '',
	// 页码
	page: 1,
	studentHistory: '',
});

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type) {
		case actionTypes.EDIT:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.SAVE:
			if(action.index === "new") {
				newState.teacherList.push(action.data);
			}else {
				newState.teacherList.splice(action.index, 1, action.data);          
			}
			newState.editingKey = "";
			return newState;
		case actionTypes.ADDDATA:
			if (newState.teacherList.length % 10 === 0) {
				newState.page = Math.floor(newState.teacherList.length) + 1;
			}else {
				newState.page = Math.floor(newState.teacherList.length);
			}
			newState.teacherList.push(action.newData);
			newState.editingKey = action.newData.key;
			return newState;
		case actionTypes.CANCEL:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.CANCELADD:
			newState.teacherList.pop();
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.GETPAGECHANGE:
			newState.page = action.page;
			return newState;
		case actionTypes.DELETEDATA:
			newState.teacherList = [...newState.teacherList].filter(item => item.key !== action.key)
			return newState;
		case actionTypes.CHANGETEACHERLIST:
			newState.teacherList = action.teacherList;
			newState.editingKey = '';
			newState.page = 1;
			return newState;
		case actionTypes.SETHISTORY:
			newState.studentHistory = action.history;
			return newState;
		default:
			return state;
	}
}