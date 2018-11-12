import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Judgement from './Judgement';

class App extends Component {
  render() {
    return (
		<Provider store={store}>			
			<Judgement></Judgement>
		</Provider>
    );
  }
}

export default App;
