import {
  AimOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  MoneyCollectFilled,
  ProfileFilled,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const getSidebarItems = (t: any) => [
  {
    key: 'Dashboard',
    label: <NavLink to='/'>{t('sidebar.dashboard')}</NavLink>,
    icon: React.createElement(ProfileFilled),
  },
  {
    key: 'Add Product',
    label: <NavLink to='/create-product'>{t('sidebar.add_product')}</NavLink>,
    icon: React.createElement(AntDesignOutlined),
  },
  {
    key: 'Manage Products',
    label: <NavLink to='/products'>{t('sidebar.manage_products')}</NavLink>,
    icon: React.createElement(MoneyCollectFilled),
  },
  {
    key: 'Manage Sales',
    label: <NavLink to='/sales'>{t('sidebar.manage_sales')}</NavLink>,
    icon: React.createElement(AreaChartOutlined),
  },
  {
    key: 'Manage Seller',
    label: <NavLink to='/sellers'>{t('sidebar.manage_seller')}</NavLink>,
    icon: React.createElement(ApartmentOutlined),
  },
  {
    key: 'Manage Purchase',
    label: <NavLink to='/purchases'>{t('sidebar.manage_purchase')}</NavLink>,
    icon: React.createElement(AimOutlined),
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
  },
];
