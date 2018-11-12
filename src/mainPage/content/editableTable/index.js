import React, {Component} from 'react';
import StudentTable from './studentTable';
import BillTable from './billTable';
import TeacherTable from './teacherTable';
import {Route, Switch} from 'react-router-dom';

class EditableTable extends Component {
	render() {
		return(
			<Switch>
                <Route path="/content/editableTable/teachertable" component={TeacherTable} />
                <Route path="/content/editableTable/studenttable" component={StudentTable} />
                <Route path="/content/editableTable/billtable" component={BillTable} />
            </Switch>
		)
	}
}

export default EditableTable;