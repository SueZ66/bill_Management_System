import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import "./style.css";
import {actionCreators} from './store';


class Login extends PureComponent {
	render() {
		const {commitLogin} = this.props;
		return(
			<div className="loginWrapper">
				<div className="loginBox">
					<input className="input" placeholder='账号' ref={input => this.account = input }></input>
					<input className="input" placeholder='密码' ref={input => this.password = input }></input>
					<div className="button" onClick={()=>{commitLogin(this.account.value, this.password.value)}}>登录</div>
				</div>
			</div>
		)
			
	}
}

const mapDispatch = (dispatch) => ({
	commitLogin(account, password) {
		dispatch(actionCreators.login(account, password));
	}
});

export default connect(null, mapDispatch)(Login);