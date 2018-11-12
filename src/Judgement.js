import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './mainPage/header'; 
import Login from './loginPage';

class Judgement extends Component {
  render() {
  	const {logStatus} = this.props;
	if(logStatus) {
		return(<Main />)
	}else {	
		return(<Login />)
	}
  }
}

const mapState = (state) => ({
	logStatus: state._root.entries[0][1].logStatus,
});

export default connect(mapState, null)(Judgement);
