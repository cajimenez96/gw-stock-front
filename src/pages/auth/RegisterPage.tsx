import { useTranslation } from 'react-i18next';
import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { toast } from 'sonner';

const RegisterPage = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Registering new account!');
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be same!' });
        return;
      }
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', textTransform: 'uppercase' }}>
          {t('register.title')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder={t('register.full_name')}
            className={`input-field ${errors['name'] ? 'input-field-error' : ''}`}
          />
          <input
            type='text'
            {...register('email', { required: true })}
            placeholder={t('register.email')}
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder={t('register.password')}
            {...register('password', { required: true })}
            className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder={t('register.repeat_password')}
            {...register('confirmPassword', { required: true })}
            className={`input-field ${errors['confirmPassword'] ? 'input-field-error' : ''}`}
          />
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              {t('register.submit')}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
