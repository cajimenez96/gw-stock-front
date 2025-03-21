import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { Layout, Menu, Typography} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/services/authSlice';
import { useTranslation } from 'react-i18next';
import { getSidebarItems } from '../../constant/sidebarItems';
import CustomButton from '../Button/CustomButton';

const {Content, Sider} = Layout;
const { Title } = Typography;

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="xl"
        collapsedWidth="50"
        width='300px'
        style={{backgroundColor: 'var(--bg-white)'}}
      >
        <div onClick={() => setCollapsed(!collapsed)} className='dashboard-logo'>
          {collapsed ? (
            <MenuUnfoldOutlined style={{color: 'rgb(34, 34, 34)', width: 40}} />
          ) : (
            <MenuFoldOutlined style={{color: 'rgb(34, 34, 34)', width: 40}}/>
          )}
          <Title
            level={3}
            style={{
              color: 'var(--font-color)',
              // margin: 'auto',
              marginLeft: 10,
              marginTop: 10,
              display: collapsed ? 'none' : 'block',
              animationDelay: '5s'
            }}
          >
            {t('sidebar.title')}
          </Title>
        </div>
        <Menu
          mode='inline'
          style={{backgroundColor: 'var(--bg-white)', color: 'var(--font-color)', fontSize: 16, borderRadius: 0}}
          defaultSelectedKeys={['Dashboard']}
          items={getSidebarItems(t)}
          title={'hola'}
        />
        {!collapsed && (
          <div
            style={{
              margin: 'auto',
              position: 'absolute',
              bottom: 0,
              padding: '1rem',
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <CustomButton style={{width: '100%'}} handleClick={handleClick}>
              <PoweroffOutlined />
              {t('sidebar.logout')}
            </CustomButton>
          </div>
        )}
      </Sider>
      <Layout>
        <Content style={{padding: '2rem', background: '#BBE1FA'}}>
          <div
            style={{
              padding: '1rem',
              maxHeight: 'calc(100vh - 4rem)',
              minHeight: 'calc(100vh - 4rem)',
              background: '#fff',
              borderRadius: '1rem',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
