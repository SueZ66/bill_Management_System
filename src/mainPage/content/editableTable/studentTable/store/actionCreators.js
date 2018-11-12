import * as actionTypes from './actionTypes';
import axios from 'axios';

const changeStudentList = (result) => ({
	type: actionTypes.CHANGESTUDENTLIST,
	studentList: result.studentList,
});
export const getStudentList = (id) => {
	return (dispatch) => {
		axios.get('/api/studentList.json?id='+id)
			.then((res)=>{
			 	const result = res.data.data;
			 	dispatch(changeStudentList(result))
			 })	
			.catch((error)=>{console.log(error)})
	}
}


const saveToState = (data, index) => ({
	type: actionTypes.SAVE,
	data: data,
	index: index,
});
export const save = (data, index) => {

	return (dispatch) => {
		dispatch(saveToState(data, index));

		/*axios.post('/api/newstudent', {
			data: data
		})
			.then((res)=>{
				const result = res.data.success;
				const resData = res.data.data;
				result?dispatch(saveToState(resData, index)):alert('error');
			})
			.catch((error)=>{console.log(error)})*/
	}
};

const deleteToState = (key) => ({
	type: actionTypes.DELETEDATA,
	key: key,	
});
export const deleteData = (key) => {
	return (dispatch) => {
		dispatch(deleteToState(key));

		/*axios.post('/api/deletebilllist', {
			key: key
		})
			.then((res)=>{
				const result = res.data.success;
				result?dispatch(deleteToState(key)):alert("删除失败");
			})
			.catch((error)=>{console.log(error)})*/
	}
};

export const addData = (newData) => ({
	type: actionTypes.ADDDATA,
	newData: newData,
});

export const cancel = () => ({
	type: actionTypes.CANCEL,
	editingKey: '',
});

export const cancelAdd = () => ({
	type: actionTypes.CANCELADD,
	editingKey: '',
});

export const getPageChange = (page) => ({
	type: actionTypes.GETPAGECHANGE,
	page: page,
});

export const setHistory = (text) => ({
	type: actionTypes.SETHISTORY,
	history: text,
});

export const edit = (key) => ({
	type: actionTypes.EDIT,
	editingKey: key,
});