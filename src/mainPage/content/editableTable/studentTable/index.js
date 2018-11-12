import React, {Component, Fragment} from 'react';
import { Table, Input, Popconfirm, Form, Button, Icon, Select } from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {actionCreators} from './store';


const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends Component {
  getInput() {
        
    if (this.props.inputType === 'notInput') {
      return <div>请在账单页面修改账单信息</div>;
    }else if(this.props.inputType === 'grade') {
      return (
      <Select>
        <Select.Option value="研一">研一</Select.Option>
        <Select.Option value="研二">研二</Select.Option> 
        <Select.Option value="研三">研三</Select.Option> 
      </Select> 
      )
    }
    return <Input />;
  };

  getRules(dataIndex) {
    const {
      record,
    } = this.props;
    switch (dataIndex) {
      case 'studentID':
        return {
                        // 表单校验规则
                        rules: [{
                          required: true,
                          len: 10,
                          message: `请输入正确的学号`,
                        }],
                        initialValue: record[dataIndex],
                }
      case 'moneyLimit':
        return {
                        // 表单校验规则
                        rules: [{
                          required: false,
                        }],
                        initialValue: record[dataIndex],
                }
      case 'balance':
        return {
                        // 表单校验规则
                        rules: [{
                          required: false,
                        }],
                        initialValue: record[dataIndex],
                }
      default:
        return {
                        // 表单校验规则
                        rules: [{
                          required: true,
                          message: `请输入正确信息`,
                        }],
                        initialValue: record[dataIndex],
                }
    }
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>

        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <Fragment>
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, this.getRules(dataIndex))(this.getInput())}
                  </FormItem>
                </Fragment>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class studentTable extends Component {

    componentDidMount() {
        const {getStudentList, location} = this.props;  
        getStudentList(location.search.substr(4,1));
    };

    render() {
        const {
            data, page, editingKey, billHistory,
            handlePageChange,
            handleAdd,
            setHistory,
        } = this.props;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '10%',
                editable: true,
                render: (text, record) => 
                <Link to={"/content/editabletable/billtable?id=" + text} onClick={()=>{setHistory(text);console.log(record)}}><span style={{color: '#1890ff', cursor: 'pointer'}}>{text}</span></Link>,
            },
            {
                title: '学号',
                dataIndex: 'studentID',
                width: '10%',
                editable: true,
            },
            {
                title: '年级',
                dataIndex: 'grade',
                width: '10%',
                editable: true,
            },            { 
                title: '导师',
                dataIndex: 'teacher',
                width: '15%',
                editable: true,
            },
            {
                title: '报销额度',
                dataIndex: 'moneyLimit',
                width: '15%',
                editable: true,
            },
            {
                title: '余额',
                dataIndex: 'balance',
                width: '15%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const {
                        editingKey,
                        handleDelete,
                        cancel,
                        edit,
                    } = this.props;
                    const editable = this.isEditing(record);
                    return (
                        // 此处是一行表格
                    <div>
                      {editable ? (
                        <span>
                          <EditableContext.Consumer>
                            {form => (
                              <Popconfirm
                                title="Sure to save?"
                                onConfirm={() => {this.save(form, record.key)}}
                              >
                                <span style={{ marginRight: 18, color: '#1890ff', cursor: 'pointer'}}>保存</span>
                              </Popconfirm>
                            )}
                          </EditableContext.Consumer>
                          <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => cancel(record.key)}>取消</span>
                        </span>
                      ) : (
                        <span>
                            <span 
                                onClick={() => {this.isSaved(editingKey,  record.key, null, edit)}}
                                style={{ marginRight: 18, color: '#1890ff', cursor: 'pointer'}}
                            >
                                修改
                            </span>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                <span style={{color: 'red', cursor: 'pointer'}}>删除</span>
                            </Popconfirm>
                        </span>
                      )}
                    </div>
                  );
                },
            },
        ]
        const columnsEx = columns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              inputType: col.dataIndex === 'balance'|| col.dataIndex === 'moneyLimit'? 'notInput': col.dataIndex === 'grade'? 'grade': 'input',
              // 输入类型判断
              dataIndex: col.dataIndex,
              title: col.title,
              editing: this.isEditing(record),
            }),
          };
        });

        return (
        	<Fragment>
    	    	<Button.Group>
                <Button>
                  <Link to={"/content/editabletable/teachertable"}>
                    教师表
                  </Link>
                </Button>
                <Button style={{color: "rgb(64, 169, 255)", borderColor: "rgb(64, 169, 255)", zIndex: 2}}>
                    学生表
                </Button>
                <Button disabled={billHistory===''}>
                  <Link to={"/content/editabletable/billtable?="+billHistory}>
                    报单表
                  </Link>
    		      	</Button>
    		    </Button.Group>
    		    <Button onClick={()=>{this.isSaved(editingKey, null, null, handleAdd)}} type="primary" style={{float: 'right'}}>
              		<Icon type="plus" theme="outlined" />
              		添加
        		</Button>
    	        <Table
    		        components={components}
    		        bordered
    		        dataSource={data}

    		        // 页面控制,页面改变的回调获得变化得到的页码，通过改变state中的页码改变来改变显示的页码
    		        pagination={{current: page, onChange: (page)=>{handlePageChange(page)} }}
    		        columns={columnsEx}
    		        rowClassName="editable-row"
    		        style={{marginTop: '20px'}}
    	        />
        	</Fragment>
        );
    }
    isEditing(record) {
        const {editingKey} = this.props;
        return record.key === editingKey;
    };
    save(form, key) {
        const {saveToStore} = this.props;
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                saveToStore({
                    ...item,
                    ...row,
                }, index);
            } else {
                saveToStore(row, "new");
            }
        });
    };
    isSaved(is, a, b, callback) {
        if (is === '') {
            callback(a, b);
        }else {
            alert("请先保存哦！")
        }
    };
}

const mapState = (state) => ({
    data: state._root.entries[1][1].studentList,
    editingKey: state._root.entries[1][1].editingKey,
    // 页码
    page: state._root.entries[1][1].page,
    billHistory: state._root.entries[1][1].billHistory,
    
});

const mapDispatch = (dispatch) => ({
    getStudentList(id) {
        const action = actionCreators.getStudentList(id);
        dispatch(action);
    },
    edit(key) {
        const action = actionCreators.edit(key);
        dispatch(action);
    },
    saveToStore(data, index) {
        const action = actionCreators.save(data, index);
        dispatch(action);
    },
    handleAdd() {
        const newData = {
            studentID: '',
            key: 'new',
            name: '',
            teacher: '',
            moneyLimit: '',
            balance: '',
            grade: '研一',
        };
        const action = actionCreators.addData(newData);
        dispatch(action);
    },
    handleDelete(key) {
        const action = actionCreators.deleteData(key);
        dispatch(action);

    },
    cancel(key) {
        if (key === 'new') {
            const action = actionCreators.cancelAdd();
            dispatch(action);            
        }else {
            const action = actionCreators.cancel();
            dispatch(action);
        }
    },
    handlePageChange(page) {
        const action = actionCreators.getPageChange(page);
        dispatch(action);
    },
    setHistory(key) {
        const action = actionCreators.setHistory(key);
        dispatch(action);
    }, 
});

export default connect(mapState, mapDispatch)(studentTable);