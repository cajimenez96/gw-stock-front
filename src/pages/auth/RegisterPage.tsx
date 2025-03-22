import { Flex, Form, Grid, Input } from 'antd';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Container from '../../components/Container/Container';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';
import { loginValidationRules } from '../../utils/validations';
import { useState } from 'react';
import { useAuthService } from '../../services/authService';
import CustomButton from '../../components/Button/CustomButton';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registerUserService } = useAuthService();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    fullname: '1',
    email: '2',
    password: '3',
    passwordRepeat: '4'
  });

  const width = screens.xl ? '30%' : screens.lg ? '50%' : screens.md ? '60%' : '90%';

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    if (data.password !== data.passwordRepeat) {
      toast.error(t('register.error_password'), {style: {backgroundColor: 'var(--error-color)'}});
      setLoading(false);
      return;
    }

    try {
      await registerUserService(data);
      toast.success('Successfully register!', {style: {backgroundColor: 'var(--success-color)'}});
      navigate('/login');
    } catch (error) {
      toast.error(t('login.error'), {style: { backgroundColor: 'var(--error-color)' }});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Container vertical style={{padding: 50, width: width}}>
        <Title level={2}>
          {t('register.title')}
        </Title>

        <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>

          <Form.Item
            label={t('register.full_name')}
            validateStatus={errors.fullname ? 'error' : ''}
            help={typeof errors?.fullname?.message === 'string' ? errors.fullname.message : ''}
          >
            <Controller
              name="fullname"
              control={control}
              rules={loginValidationRules.fullname}
              render={({ field }) => <Input {...field} placeholder={t('register.full_name')} />}
            />
          </Form.Item>

          <Form.Item
            label={t('register.email_label')}
            validateStatus={errors.email ? 'error' : ''}
            help={typeof errors?.email?.message === 'string' ? errors.email.message : ''}
          >
            <Controller
              name="email"
              control={control}
              rules={loginValidationRules.email}
              render={({ field }) => <Input {...field} placeholder={t('register.email')} />}
            />
          </Form.Item>

          <Form.Item
            label={t('register.password_label')}
            validateStatus={errors.password ? 'error' : ''}
            help={typeof errors?.password?.message === 'string' ? errors.password.message : ''}
          >
            <Controller
              name="password"
              control={control}
              rules={loginValidationRules.password}
              render={({ field }) => <Input.Password {...field} placeholder={t('register.password')} />}
            />
          </Form.Item>

          <Form.Item
            label={t('register.repeat_password_label')}
            validateStatus={errors.passwordRepeat ? 'error' : ''}
            help={typeof errors?.passwordRepeat?.message === 'string' ? errors.passwordRepeat.message : ''}
          >
            <Controller
              name="passwordRepeat"
              control={control}
              rules={loginValidationRules.password}
              render={({ field }) => <Input.Password {...field} placeholder={t('register.repeat_password')} />}
            />
          </Form.Item>

          <Flex justify="center" style={{marginTop: '3rem'}}>
            <CustomButton htmlType="submit" loading={loading} style={{ width: '50%', fontWeight: 'semibold' }}>
              {t('register.submit')}
            </CustomButton>
          </Flex>

        </Form>

        <p style={{ marginTop: '2rem' }}>
          {t('register.already_account')} <Link to='/login'>{t('register.login_here')}</Link>
        </p>
      </Container>
    </Flex>
  );
};

export default RegisterPage;
