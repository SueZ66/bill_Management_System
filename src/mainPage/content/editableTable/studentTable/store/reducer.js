import * as actionTypes from './actionTypes';

const defaultState = ({
	studentList: [],
	editingKey: '',
	// 页码
	page: 1,
	billHistory: '',
});

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type) {
		case actionTypes.EDIT:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.SAVE:
			if(action.index === "new") {
				newState.studentList.push(action.data);
			}else {
				newState.studentList.splice(action.index, 1, action.data);          
			}
			newState.editingKey = "";
			return newState;
		case actionTypes.ADDDATA:
			if (newState.studentList.length % 10 === 0) {
				newState.page = Math.floor(newState.studentList.length) + 1;
			}else {
				newState.page = Math.floor(newState.studentList.length);
			}
			newState.studentList.push(action.newData);
			newState.editingKey = action.newData.key;
			return newState;
		case actionTypes.CANCEL:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.CANCELADD:
			newState.studentList.pop();
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.GETPAGECHANGE:
			newState.page = action.page;
			return newState;
		case actionTypes.DELETEDATA:
			newState.studentList = [...newState.studentList].filter(item => item.key !== action.key)
			return newState;
		case actionTypes.CHANGESTUDENTLIST:
			newState.studentList = action.studentList;
			newState.editingKey = '';
			newState.page = 1;
			return newState;
		case actionTypes.SETHISTORY:
			newState.billHistory = action.history;
			return newState;
		default:
			return state;
	}
}