import * as actionTypes from './actionTypes';
import axios from 'axios';

const changeLogStatus = (result) => ({
	type: actionTypes.CHANGELOGSTATUS,
	userInfor: result.userInfor,
});
export const login = (account, password) => {
	return (dispatch) => {

		axios.post('/api/login', {
			account: account,
			password: password
		})
			.then((res)=>{
			 	const success = res.data.success;
			 	const result = res.data.data;
			 	success?dispatch(changeLogStatus(result)):alert("账号或密码有误");
			 })	
			.catch((error)=>{console.log(error)})
	}
}

const logOut = () => ({
	type: actionTypes.LOGOUT,
});
export const logout = () => {
	return (dispatch) => {
		dispatch(logOut());
/*
		axios.post('/api/logout', {
			userInfor: userInfor
		})
			.then((res)=>{
			 	const success = res.data.success;
			 	success?dispatch(logOut()):alert("退出失败");
			 })	
			.catch((error)=>{console.log(error)})*/
	}
}

