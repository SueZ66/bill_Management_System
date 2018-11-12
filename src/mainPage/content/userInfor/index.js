import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserInfor extends Component {	
	render() {
		const {userInfor} = this.props;
		return(
			<div>用户名： {userInfor.name}</div>
		)
	}
}

const mapState = (state) => ({
	userInfor: state._root.entries[0][1].userInfor,
});

export default connect(mapState, null)(UserInfor);