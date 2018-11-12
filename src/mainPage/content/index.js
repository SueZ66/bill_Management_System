import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import EditableTable from './editableTable';
import BrowseTable from './browseTable';
import UserInfor from './userInfor';
import './style.css';

class Contents extends Component {
	render() {
		return(
			<Switch>
				<Route path="/" exact render={()=><div>welcome to here!</div>}/>
				<Route path="/content" exact render={()=><div>welcome to search!</div>}/>
                <Route path="/content/editabletable" component={EditableTable} />
                <Route path="/content/browsetable" component={BrowseTable} />
                <Route path="/content/userinfor" component={UserInfor} />
            </Switch>
		)
	}
}

export default Contents;