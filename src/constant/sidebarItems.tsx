import {
  AimOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  MoneyCollectFilled,
  ProfileFilled,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const getSidebarItems = (t: any) => [
  {
    key: 'Dashboard',
    label: <NavLink to='/'>{t('sidebar.dashboard')}</NavLink>,
    icon: React.createElement(ProfileFilled),
    role: ['OWNER', 'ADMIN']
  },
  {
    key: 'Add Product',
    label: <NavLink to='/create-product'>{t('sidebar.add_product')}</NavLink>,
    icon: React.createElement(AntDesignOutlined),
    role: ['OWNER', 'ADMIN']
  },
  {
    key: 'Manage Products',
    label: <NavLink to='/products'>{t('sidebar.manage_products')}</NavLink>,
    icon: React.createElement(MoneyCollectFilled),
    role: ['OWNER', 'ADMIN', 'SELLER']
  },
  {
    key: 'Manage Sales',
    label: <NavLink to='/sales'>{t('sidebar.manage_sales')}</NavLink>,
    icon: React.createElement(AreaChartOutlined),
    role: ['OWNER', 'ADMIN', 'SELLER']
  },
  {
    key: 'Manage Seller',
    label: <NavLink to='/sellers'>{t('sidebar.manage_seller')}</NavLink>,
    icon: React.createElement(ApartmentOutlined),
    role: ['OWNER', 'ADMIN']
  },
  {
    key: 'Manage Purchase',
    label: <NavLink to='/purchases'>{t('sidebar.manage_purchase')}</NavLink>,
    icon: React.createElement(AimOutlined),
    role: ['OWNER', 'ADMIN', 'SELLER']
  },
  // {
  //   key: 'Sales History',
  //   label: <NavLink to='/sales-history'>SALES HISTORY</NavLink>,
  //   icon: React.createElement(HistoryOutlined),
  // },
  {
    key: 'Profile',
    label: <NavLink to='/profile'>{t('sidebar.profile')}</NavLink>,
    icon: React.createElement(UserOutlined),
    role: ['OWNER', 'ADMIN', 'SELLER']
  },
  {
    key: 'Get All Users',
    label: <NavLink to='/all-users'>{t('sidebar.users')}</NavLink>,
    icon: React.createElement(UsergroupAddOutlined),
    role: ['OWNER', 'ADMIN']
  },
];
