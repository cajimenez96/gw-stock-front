import { Col, Row } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import DailyChart from '../components/Charts/DailyChart';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  if (isLoading && isLoading1) return <Loader />;
  else
    return (
      <>
        <Row style={{ paddingRight: '1rem' }}>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>{t('dashboard.total_stock')}</h3>
              <h1>{products?.data?.totalQuantity || 0}</h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>{t('dashboard.total_item_sell')}</h3>
              <h1>
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                  0
                )}
              </h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>{t('dashboard.total_revenue')}</h3>
              <h1>
                $
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
                  0
                )}
              </h1>
            </div>
          </Col>
        </Row>
        <div
          style={{
            border: '1px solid gray',
            margin: '1rem',
            padding: '1rem',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '.5rem' }}>{t('dashboard.daily')}</h1>
          <DailyChart />
        </div>
        <div
          style={{
            border: '1px solid gray',
            margin: '1rem',
            padding: '1rem',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '.5rem' }}>{t('dashboard.monthly')}</h1>
          <MonthlyChart />
        </div>
      </>
    );
};

export default Dashboard;
