import * as actionTypes from './actionTypes';

const defaultState = ({
	billList: [],
	editingKey: '',
	// 页码
	page: 1,
});

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type) {
		case actionTypes.EDIT:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.SAVE:
			if(action.index === "new") {
				newState.billList.push(action.data);
			}else {
				newState.billList.splice(action.index, 1, action.data);          
			}
			newState.editingKey = "";
			return newState;
		case actionTypes.ADDDATA:
			if (newState.billList.length % 10 === 0) {
				newState.page = Math.floor(newState.billList.length) + 1;
			}else {
				newState.page = Math.floor(newState.billList.length);
			}
			newState.billList.push(action.newData);
			newState.editingKey = action.newData.key;
			return newState;
		case actionTypes.CANCEL:
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.CANCELADD:
			newState.billList.pop();
			newState.editingKey = action.editingKey;
			return newState;
		case actionTypes.GETPAGECHANGE:
			newState.page = action.page;
			return newState;
		case actionTypes.DELETEDATA:
			newState.billList = [...newState.billList].filter(item => item.key !== action.key)
			return newState;
		case actionTypes.CHANGEBILLLIST:
			newState.billList = action.billList;
			newState.editingKey = '';
			newState.page = 1;
			return newState;
		default:
			return state;
	}
}