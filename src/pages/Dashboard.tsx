import { Col, Flex, Row, Typography } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import DailyChart from '../components/Charts/DailyChart';
import Container from '../components/Container/Container';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface ContainerItemProps {
  title: string;
  children: ReactNode;
}

const { Title, Text } = Typography;

const ContainerItem = ({title, children}: ContainerItemProps) => {
  return (
    <Container vertical className='number-card shadow-container'>
      <Title level={4} style={{fontSize: 36, paddingBottom: 0 }}>{title}</Title>
      {children}
    </Container>
  );
}

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  return (
    <Flex vertical justify='center' gap={10} style={{ height: '100%' }} >
      {
        (isLoading && isLoading1) && <Loader />
      }
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <ContainerItem title={t('dashboard.total_stock')}>
            <Text style={{ fontSize: 32 }}>
              ${products?.data?.totalQuantity || 0}
            </Text>
          </ContainerItem>
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <ContainerItem title={t('dashboard.total_item_sell')}>
            <Text style={{ fontSize: 32 }}>
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                0
              )}
            </Text>
          </ContainerItem>
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <ContainerItem title={t('dashboard.total_revenue')}>
            <Text style={{ fontSize: 32 }}>
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
                0
              )}
            </Text>
          </ContainerItem>
        </Col>

      </Row>
      
      <ContainerItem title={t('dashboard.daily')}>
        <DailyChart />
      </ContainerItem>

      <ContainerItem title={t('dashboard.monthly')}>
        <MonthlyChart />
      </ContainerItem>
    </Flex>
  );
};

export default Dashboard;
