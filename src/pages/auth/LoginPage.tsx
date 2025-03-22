import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Flex, Form, Input, Typography, Grid } from 'antd';
import Container from '../../components/Container/Container';
import { toast } from 'sonner';
import { useAuthService } from '../../services/authService';  
import { loginValidationRules } from '../../utils/validations';
import CustomButton from '../../components/Button/CustomButton';

const LoginPage = () => {
  const { t } = useTranslation();
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { loginUserService } = useAuthService();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const width = screens.lg ? '25%' : screens.md ? '60%' : '90%';

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      await loginUserService(data, dispatch);
      toast.success('Successfully Login!', {style: {backgroundColor: 'var(--success-color)'}});
      navigate('/');
    } catch (error) {
      toast.error(t('login.error'), {style: {backgroundColor: 'var(--error-color)'}});
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex justify='center' align='center' vertical style={{ height: '100vh' }}>
      <Container
        vertical
        style={{padding: 50, width: width}}
      >
        <Title level={2} style={{marginBottom: '2rem'}}>
          {t('login.title')}
        </Title>
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>

          <Form.Item
            label={t('login.email')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email.message : ''}
          >
            <Controller
              name="email"
              control={control}
              rules={loginValidationRules.email}
              render={({ field }) => <Input {...field} placeholder={t('login.email')} />}
            />
          </Form.Item>

          <Form.Item
            label={t('login.password')}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password ? errors.password.message : ''}
          >
            <Controller
              name="password"
              control={control}
              rules={loginValidationRules.password}
              render={({ field }) => <Input.Password {...field} placeholder={t('login.password')} />}
            />
          </Form.Item>

          <Flex justify="center" style={{marginTop: '3rem'}}>
            <CustomButton htmlType="submit" loading={loading} style={{ width: '50%', fontWeight: 'semibold' }}>
              {t('login.submit')}
            </CustomButton>
          </Flex>

        </Form>

        <p style={{ marginTop: '2rem' }}>
          {t('login.register')} <Link to='/register'>{t('login.register_link')}</Link>
        </p>
      </Container>
    </Flex>
  );
};

export default LoginPage;
