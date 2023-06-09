import React, { Component } from 'react';
import { Icon, Menu, Layout } from 'antd';
import Link from 'umi/link';
import cls from 'classnames';
import { ScrollBar } from 'suid';
import styles from './index.less';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const menuData = [
  {
    id: '1',
    name: '本地登录',
    path: '/user/login',
  },
  {
    id: '2',
    name: 'Demo',
    path: '/moduleName/demo',
  },
  {
    id: '20',
    name: 'pm',
    children: [
      {
        id: '201',
        name: '项目基础信息',
        path: '/pm/PmBaseInfo',
      },
      {
        id: '2011',
        name: '项目基础信息编辑',
        path: '/pm/PmBaseInfoEdit',
      },
      {
        id: '202',
        name: '项目管理人员',
        path: '/pm/ProjectMembers',
      },
      {
        id: '203',
        name: '项目计划表',
        path: '/pm/ProjectPlan',
      },
      {
        id: '204',
        name: '项目待办',
        path: '/pm/TodoList',
      },
      {
        id: '205',
        name: '流程节点（设置附件）',
        path: '/pm/WfConfig',
      },
    ],
  },
  {
    id: '301',
    name: '人员管理',
    path: '/em/Emp',
  },
  {
    id: '401',
    name: '首页',
    path: '/pm/Home',
  },
  {
    id: '501',
    name: '数据报表',
    path: '/pm/Report',
  },
  {
    id: '601',
    name: '待办列表清单',
    path: '/pm/TodolistDetails',
  },
  {
    id: '502',
    name: '审批页面',
    path: '/pm/TodolistApprove',
  },
  {
    id: '701',
    name: 'eip待办处理页面',
    path: '/pm/eipTodo',
  },
  {
    id: '702',
    name: '流程配置',
    path: '/pm/ProjectOption',
  },
  {
    id: '703',
    name: '项目进度报表',
    path: '/pm/ProjectScheduleReport',
  },
  {
    id: '703',
    name: '科室年度项目',
    path: '/pm/YearProjectReport',
  },
  {
    id: '704',
    name: '个人月度计划',
    path: '/pm/PersonalMonthReport',
  },
  {
    id: '705',
    name: '双周计划明细',
    path: '/pm/PmBaseInfoWeekReport',
  },
  {
    id: '705',
    name: '访问量统计',
    path: '/pm/PmVisitStatistics',
  },
  {
    id: '706',
    name: '无项目名单列表',
    path: '/pm/PersonalBaseInfoReport',
  }
  
];

const getIcon = icon => {
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class Home extends Component {
  componentDidMount() {
    this.getNavMenuItems(menuData);
  }

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  getSubMenuTitle = item => {
    const { name } = item;
    return item.icon ? (
      <span>
        {getIcon(item.icon)}
        <span>{name}</span>
      </span>
    ) : (
      name
    );
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu title={this.getSubMenuTitle(item)} key={item.id}>
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.id}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = item => {
    const { name } = item;
    const { location } = this.props;
    return (
      <Link to={item.path} replace={item.path === location.pathname}>
        <span>{name}</span>
      </Link>
    );
  };

  render() {
    return (
      <Layout className={cls(styles['main-box'])}>
        <Header className={cls('menu-header')}>应用路由列表</Header>
        <Content className={cls('menu-box')}>
          <ScrollBar>
            <Menu key="Menu" mode="inline" theme="light">
              {this.getNavMenuItems(menuData)}
            </Menu>
          </ScrollBar>
        </Content>
      </Layout>
    );
  }
}
