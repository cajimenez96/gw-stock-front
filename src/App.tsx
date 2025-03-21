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
