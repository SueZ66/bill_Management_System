import React, {Component} from 'react';
import { Breadcrumb } from 'antd';
import {Link, withRouter} from 'react-router-dom';

	const breadcrumbNameMap = {
	  '/content': '主页',
	  '/content/editabletable': '经费编辑',
	  '/content/browsetable': '信息展示',
	  '/content/editabletable/studenttable': '学生展示',
	  '/content/editabletable/billtable': '账单展示',
	  '/content/editabletable/teachertable': '老师展示',
	  '/content/userinfor': '管理员信息',
	};
	const Home = withRouter((props) => {
	  const { location } = props;
/*	  const dealLocation = location.pathname.split('/content').filter(i => i);*/
	  // 此处content改为根路径
	  const pathSnippets = location.pathname.split('/').filter(i => i);
	  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
	    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
	    return (
	      <Breadcrumb.Item key={url}>
	        <Link to={url}>
	          {breadcrumbNameMap[url]}
	        </Link>
	      </Breadcrumb.Item>
	    );
	  });

	  // 此处用于在面包屑整体之前拼接一个 /Home 
/*	  const breadcrumbItems = [(
	    <Breadcrumb.Item key="home">
	      <Link to="/">Home</Link>
	    </Breadcrumb.Item>
	  )].concat(extraBreadcrumbItems);*/
	  return (
	      <Breadcrumb style={{ margin: '16px 0' }}>
	        {extraBreadcrumbItems}
	      </Breadcrumb>
	  );
	});

class Guidance extends Component {
	
	render() {
		return(
			<Home></Home>
		)
	}
}

export default Guidance;