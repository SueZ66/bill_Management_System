import React, {Component, Fragment} from 'react';
import { Table, Button, Popconfirm, Select, Input } from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';

const columns = [{
    title: '账单',
    dataIndex: 'billName',
    width: '10%',
}, {
    title: '报账日期',
    dataIndex: 'date',
    width: '10%',
}, {
    title: '报账金额',
    dataIndex: 'amount',
    width: '10%',
}, {
    title: '报账人',
    dataIndex: 'personName',
    width: '10%',
}, {
    title: '学号',
    dataIndex: 'studentID',
    width: '10%',
}, {
    title: '导师',
    dataIndex: 'teacher',
    width: '10%',
}, {
    title: '报账原因',
    dataIndex: 'reason',
    width: '35%',
}];

class BrowserTable extends Component {
	componentDidMount() {
		const {getList} = this.props;
		getList();
	};
	render() {
		const {
			list,
			selectedRowChange,
			search,
			searchKeyChange,
			timeSortChange,
		} = this.props;
		const rowSelection = {
		    onChange: (selectedRowKeys, selectedRows) => {
		    	selectedRowChange(selectedRowKeys);
		    },
		    getCheckboxProps: record => ({
		    	disabled: record.name === 'Disabled User', // Column configuration not to be checked
		    	name: record.name,
		    }),
		};
		return (
			<Fragment>
				<div style={{overflow: "hidden"}}>
					<Select defaultValue="desc" style={{ width: 180, float: "left" }} onChange={(value)=>{timeSortChange(value)}}>
				        <Select.Option value="desc">时间降序显示</Select.Option>
				        <Select.Option value="esc">时间升序显示</Select.Option>
				    </Select>
				    <Input.Group compact style={{marginLeft: 100, float: "left", width: 500}}>
				        <Select defaultValue="all" style={{ width: 120, float: "left" }} onChange={(value)=>{searchKeyChange(value)}}>
				        	<Select.Option value="all">全部显示</Select.Option>	
				            <Select.Option value="teacher">导师</Select.Option>
				            <Select.Option value="student">学生</Select.Option>
				            <Select.Option value="date">日期</Select.Option>
				        </Select>
				        <Input.Search style={{ width: 300 }} placeholder="请输入搜索信息" enterButton="搜索" onSearch={(value)=>{search(value)}}/>
			        </Input.Group>
					<Popconfirm style={{}} title="删除将不能恢复，确认删除？" onConfirm={()=>{this.deleteAll()}}>
						<Button  type="primary" style={{ marginBottom: 18, float: "right", zIndex: 2}}>删除所选项</Button>
					</Popconfirm>
				</div>
			    <Table rowSelection={rowSelection} columns={columns} dataSource={list} bordered={true}/>
			</Fragment>
		);
	}
	deleteAll() {
		const {keys, deleteData} = this.props;
		deleteData(keys);
	}
}

const mapState = (state) => ({
	list: state._root.entries[3][1].handledList,
	keys: state._root.entries[3][1].keys,
});

const mapDispatch = (dispatch) => ({
	getList() {
		const action = actionCreators.getList();
		dispatch(action);
	},
	selectedRowChange(keys) {
		const action = actionCreators.selectedRowChange(keys);
		dispatch(action);
	},
	deleteData(keys) {
		const action = actionCreators.deleteData(keys);
		dispatch(action);
	},
	timeSortChange(sortMode) {
		const action = actionCreators.timeSortChange(sortMode);
		dispatch(action);
	},
	searchKeyChange(searchKey) {
		const action = actionCreators.searchKeyChange(searchKey);
		dispatch(action);
	},
	search(value) {
		const action = actionCreators.search(value);
		dispatch(action);
	},
});

export default connect(mapState, mapDispatch)(BrowserTable);