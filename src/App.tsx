import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { ConfigProvider } from 'antd';
import Language from './components/Language';
import { getCurrentLanguage } from './redux/services/authSlice';
import { useAppSelector } from './redux/hooks';

const App = () => {
  const lng = useAppSelector(getCurrentLanguage);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `"League Spartan", sans-serif`,
            colorPrimary: 'rgb(4, 157, 191)',
            colorBgContainerDisabled: 'rgb(168, 201, 250)',
            colorTextDisabled: 'rgb(255, 255, 255)',
            colorBorder: 'rgb(226, 232, 240)',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
      <Language lng={lng} />
    </>
  );
};

export default App;
