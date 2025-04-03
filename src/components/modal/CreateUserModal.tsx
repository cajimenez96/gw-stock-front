import { Button, Flex, Form } from 'antd';
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import CustomModal from './CustomModal';
import ModalInput from './ModalInput';
import { useTranslation } from 'react-i18next';
import { useAuthService } from '../../services/authService';
import { registerValidationRules } from '../../utils/validations';
import { IUser } from '../../constant/profile';
import { toast } from 'sonner';
import Loader from '../Loader';

interface CreateUserProps {
  open: boolean;
  close: () => void;
}

const allRoles = [
  {name: 'OWNER', value: 'OWNER'},
  {name: 'ADMIN', value: 'ADMIN'},
  {name: 'SELLER', value: 'SELLER'},
]

const CreateUserModal = ({ open, close }: CreateUserProps) => {
  const { t } = useTranslation();
    const { registerNewUserService } = useAuthService();
   const [isLoading, setIsLoading] = useState(false);
  
  const {
      handleSubmit,
      reset,
      control,
      formState: { errors },
    } = useForm<IUser>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        role: '',
        address: '',
        phone: '',
        city: ''
      }
    });

  const handleClose = () => {
    close();
    reset();
  }

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {  
      await registerNewUserService(data)

      toast.success('Successfully register!', {style: {backgroundColor: 'var(--success-color)'}});
    } catch (error) {
      toast.error(t('login.error'), {style: { backgroundColor: 'var(--error-color)' }});
    } finally {
      setIsLoading(false);
      handleClose();
    }
  }

  return (
    <CustomModal
      title='Nuevo usuario'
      show={open}
      closable
      handleCancel={handleClose}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Form layout='vertical' className='w-full' onFinish={handleSubmit(onSubmit)}>
          <ModalInput
            name='name'
            label={t('all_user.table.name')}
            errors={errors}
            rule={registerValidationRules.name}
            control={control}
          />

          <ModalInput
            name='email'
            label={t('all_user.table.email')}
            errors={errors}
            rule={registerValidationRules.email}
            control={control}
          />

          <ModalInput
            name='password'
            type='password'
            label={t('all_user.table.password')}
            errors={errors}
            rule={registerValidationRules.password}
            control={control}
          />

          <ModalInput
            name='role'
            type='select'
            label={t('all_user.table.role')}
            errors={errors}
            options={allRoles}
            control={control}
          />

          <ModalInput
            name='address'
            label={t('all_user.table.address')}
            errors={errors}
            control={control}
          />

          <ModalInput
            name='city'
            label={t('all_user.table.city')}
            errors={errors}
            control={control}
          />

          <ModalInput
            name='phone'
            label={t('all_user.table.phone')}
            errors={errors}
            control={control}
          />

          <Flex justify='flex-end' gap={10} style={{ margin: '1rem' }}>
            <Button key='back' onClick={handleClose}>
            {t('close')}
            </Button>
            <Button key='submit' type='primary' htmlType='submit'>
              {t('all_user.add_new_user')}
            </Button>
          </Flex>

        </Form>
      )}
    </CustomModal>
  )
}

export default CreateUserModal;
