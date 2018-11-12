import React, {Component} from 'react';
import { Layout, Menu, Icon, Avatar, Popconfirm } from 'antd';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from '../../loginPage/store';
import Contents from '../content';
import Guidance from './guidance';
import './style.css';

class Main extends Component {
    rootSubmenuKeys = ['sub1', 'sub2'];
    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        const { Header, Content, Sider} = Layout;
        const {logout} = this.props;
        return (
            <Router>
                <Layout>
                    <Sider width={200} style={{ background: '#fff', minHeight: '100vh'}}>
                        <div className='siderTop' style={{marginBottom: 10}}>
                            <Link to="./">
                                <div className='logo'></div>
                            </Link>
                        </div>
                        <Menu
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            defaultSelectedKeys={['']}
                            style={{ height: '100%', borderRight: 0}}
                        >
                            <Menu.Item key="1" style={{ height: 40, fontSize: 16}}>
                                <Link to="/content/editabletable/teachertable" style={{ paddingLeft: 20}}>
                                    <Icon type="user" />
                                    <span >经费编辑</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2" style={{ height: 40, fontSize: 16}}>
                                <Link to="/content/browsetable" style={{ paddingLeft: 20}}>
                                    <Icon type="laptop" />
                                    <span>信息展示</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" style={{ height: 40, fontSize: 16}}>
                                <Link to="/content/userinfor" style={{ paddingLeft: 20}}>
                                    <Icon type="notification" />
                                    <span>管理员信息</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{}}>
                        <Header style={{padding: '0', float: 'left'}}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px', display: 'inline-block', float: 'left' }}
                            >
                                <Menu.Item key="1">主题</Menu.Item>
                            </Menu>
                            <div style={{float: 'right', margin: '0 100px'}}>
                                <Link to="/content/userinfor">
                                    <Avatar icon='user' size='large'></Avatar>
                                </Link>
                                <Popconfirm title="确认退出" onConfirm={logout}>
                                    <span style={{color: 'white', paddingLeft: '30px', cursor: 'pointer'}}>退出</span>
                                </Popconfirm>
                            </div>
                        </Header>
                        <Layout style={{ padding: '0 24px 24px'}}>
                            <Guidance></Guidance>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <Contents></Contents>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}

const mapDispatch = (dispatch) => ({
    logout() {
        const action = actionCreators.logout();
        dispatch(action);
    }
});

export default connect(null, mapDispatch)(Main);