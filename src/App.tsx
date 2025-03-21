import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { ConfigProvider } from 'antd';
import Language from './components/Language/Language';

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `"League Spartan", sans-serif`,
            colorPrimary: 'rgb(38, 121, 243)',
            colorBgContainerDisabled: 'rgb(168, 201, 250)',
            colorTextDisabled: 'rgb(255, 255, 255)',
            colorBorder: 'rgb(226, 232, 240)'
          },
        }}
      >
        <RouterProvider router={router} />
        <Language />
      </ConfigProvider>
    </>
  );
};

export default App;
