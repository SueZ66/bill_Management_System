import React, {Component, Fragment} from 'react';
import { Table, Input, Popconfirm, Form, Button, Icon } from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
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
      return <div>订单号由系统自动分配</div>;
    }
    
    return <Input />;
  };

  getRules(dataIndex) {
    const {
      record,
    } = this.props;
    switch (dataIndex) {
      case 'date':
        return {
                        // 表单校验规则
                        rules: [{
                          required: true,
                          len: 10,
                          pattern: RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/),
                          message: `输入形式应该为1995-10-17`,
                        }],
                        initialValue: record[dataIndex],
                }
      default:
        return {
                        // 表单校验规则
                        rules: [{
                          required: true,
                          message: `Please Input 3!`,
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

class BillTable extends Component {

    componentDidMount() {
        const {getBillList, location} = this.props;
        getBillList(location.search.substr(4,10));
    };

    render() {
        const {
            data, page, editingKey, studentHistory,
            handlePageChange,
            handleAdd,
        } = this.props;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = [
            {
                title: '账单',
                dataIndex: 'billName',
                width: '15%',
                editable: true,
            },
            {
                title: '报账日期',
                dataIndex: 'date',
                width: '15%',
                editable: true,
            },
            { 
                title: '报账金额',
                dataIndex: 'amount',
                width: '15%',
                editable: true,
            },
            {
                title: '报账人',
                dataIndex: 'personName',
                width: '10%',
                editable: true,
            },
            {
                title: '报账原因',
                dataIndex: 'reason',
                width: '30%',
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
                                <span style={{ marginRight: 18, color: '#1890ff', cursor: 'pointer' }}>保存</span>
                              </Popconfirm>
                            )}
                          </EditableContext.Consumer>
                          <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => cancel(record.key)}>取消</span>
                        </span>
                      ) : (
                        <span>
                            <span 
                                onClick={() => {this.isSaved(editingKey,  record.key, null, edit)}}
                                style={{ marginRight: 18, color: '#1890ff', cursor: 'pointer' }}
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
              inputType:  col.dataIndex === 'billName' ? 'notInput' : 'input',
             
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
                <Button>
                  <Link to={"/content/editabletable/studenttable?id="+studentHistory}>
                    学生表
                  </Link>
                </Button>
                <Button style={{color: "rgb(64, 169, 255)", borderColor: "rgb(64, 169, 255)"}}>
                    报单表
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
    		        pagination={{current: page, onChange: (page)=>{editingKey===''?handlePageChange(page):alert("请先完成当前的操作")}}}
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
    data: state._root.entries[2][1].billList,
    editingKey: state._root.entries[2][1].editingKey,
    // 页码
    page: state._root.entries[2][1].page,   
    studentHistory: state._root.entries[4][1].studentHistory, 
});

const mapDispatch = (dispatch) => ({
    getBillList(id) {
        const action = actionCreators.getBillList(id);
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
            billName: '',
            key: 'new',
            date: '',
            personName: '',
            amount: '',
            reason: '',
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
});

export default connect(mapState, mapDispatch)(BillTable);