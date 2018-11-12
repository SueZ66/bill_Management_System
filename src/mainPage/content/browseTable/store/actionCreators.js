import * as actionTypes from './actionTypes';
import axios from 'axios';

const changeList = (result) => ({
	type: actionTypes.CHANGELIST,
	list: result.list,
});
export const getList = () => {
	return (dispatch) => {
		axios.get('/api/allList.json')
			.then((res)=>{
			 	const result = res.data.data;
			 	dispatch(changeList(result))
			 })	
			.catch((error)=>{console.log(error)})
	}
}

const deleteToState = (key) => ({
	type: actionTypes.DELETEDATA,
	key: key,	
});
export const deleteData = (key) => {
	return (dispatch) => {
		dispatch(deleteToState(key));

/*		axios.post('/api/deletebilllist', {
			key: key
		})
			.then((res)=>{
				const result = res.data.success;
				result?dispatch(deleteToState(key)):alert("删除失败");
			})
			.catch((error)=>{console.log(error)})*/
	}
};

export const selectedRowChange = (keys) => ({
	type: actionTypes.SELECTEDROWCHANGE,
	keys: keys,
});

export const timeSortChange = (sortMode) => ({
	type: actionTypes.TIMESORTCHANGE,
	sortMode: sortMode,
});

export const searchKeyChange = (searchKey) => ({
	type: actionTypes.SEARCHKEYCHANGE,
	searchKey: searchKey,
});

export const search = (value) => ({
	type: actionTypes.SEARCH,
	value: value,
});