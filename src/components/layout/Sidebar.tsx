import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { Flex, Layout, Menu, Image } from 'antd';
import { PoweroffOutlined} from '@ant-design/icons';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/services/authSlice';
import { useTranslation } from 'react-i18next';
import { getSidebarItems } from '../../constant/sidebarItems';
import CustomButton from '../Button/CustomButton';
import Logo from '../../assets/agency-logo.png';
import LogoMobile from '../../assets/agency-logo-mobile.png';

const {Content, Sider} = Layout;

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
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="xl"
        collapsedWidth="50"
        width={300}
        style={{ backgroundColor: 'var(--bg-white)', borderRight: '1px soli var(--border)', overflowY: 'hidden' }}
      >
        <div className='dashboard-logo'>
          <Image src={collapsed ? LogoMobile : Logo} style={{minHeight: 50}} />
        </div>
        <Flex vertical justify='space-between' style={{ height: '100%', paddingTop: '1rem', paddingBottom: collapsed ? '4rem' : '7rem' }}>
          <Menu
            mode='inline'
            style={{ fontSize: 16 }}
            defaultSelectedKeys={['Dashboard']}
            items={getSidebarItems(t)}
          />

          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              width: '80%',
              justifyContent: 'center',
            }}
          >
            <CustomButton style={{width: '100%'}} handleClick={handleClick}>
              <PoweroffOutlined />
              {!collapsed && t('sidebar.logout')}
            </CustomButton>
          </div>
        </Flex>

      </Sider>
      <Layout>
        <Content className='bg-content' style={{overflowY: 'auto'}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
