import * as actionTypes from './actionTypes';

const defaultState = ({
	list: [],
	handledList: [],
	keys: [],
	searchKey: "",
	sortMode: "",
});

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type) {
		case actionTypes.CHANGELIST:
			newState.list = action.list;
			newState.handledList = action.list;
			return newState;
		case actionTypes.SELECTEDROWCHANGE:
			newState.keys = action.keys;
			return newState;
		case actionTypes.DELETEDATA:
			let keys = action.key;
			let list = newState.list;
			for(let i = 0; i < keys.length; ++i) {
				for(let j = 0; j < list.length; ++j) {
					if(keys[i] === list[j].key) {
						list.splice(j,1);
						newState.list = list;
						j--;
					}
				}			
			}
			newState.keys = [];
			return newState;
		case actionTypes.TIMESORTCHANGE:
			newState.sortMode = action.sortMode;
			if(newState.sortMode === "desc") {
				newState.handledList.sort(compareDesc("date"));
			}else {
				newState.handledList.sort(compareEsc("date"));
			}
			return newState;
		case actionTypes.SEARCHKEYCHANGE:
			newState.searchKey = action.searchKey;
			newState.handledList = newState.list;
			return newState;
		case actionTypes.SEARCH:
			let value = action.value;
			switch(newState.searchKey) {
				case "teacher":
					let list1 = newState.handledList.filter((list)=>(list.teacher === value));
					newState.handledList = list1;
					break;
				case "student":
					let list2 = newState.handledList.filter((list)=>(list.personName === value));
					newState.handledList = list2;
					break;
				case "date":
					let list3 = newState.handledList.filter((list)=>(list.date === value));
					newState.handledList = list3;
					break;
				default:
					break
			}
			return newState;
		default:
			return state;
	}
}

const compareEsc = (prop) => {
	return (obj1, obj2) => {
		let val1 = obj1[prop];
		let val2 = obj2[prop];
		if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }      
	}
}
const compareDesc = (prop) => {
	return (obj1, obj2) => {
		let val1 = obj1[prop];
		let val2 = obj2[prop];
		if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }      
	}
}