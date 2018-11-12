import * as actionTypes from './actionTypes';

const defaultState = ({
	userInfor: {},
	logStatus: true,
});

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type) {
		case actionTypes.CHANGELOGSTATUS:
			newState.logStatus = true;
			newState.userInfor = action.userInfor;
			return newState;
		case actionTypes.LOGOUT:
			newState.logStatus = false;
			return newState;
		default:
			return state;
	}
}