import { Button, Flex, Modal } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useCreateSellerMutation } from '../../redux/features/management/sellerApi';
import toastMessage from '../../lib/toastMessage';
import { useTranslation } from 'react-i18next';

interface CreateSellerModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSellerModal = ({ openModal, setOpenModal }: CreateSellerModalProps) => {
  const { t } = useTranslation();
  const [createSeller] = useCreateSellerMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await createSeller(data).unwrap();
      if (res.statusCode === 201) {
        reset();
        toastMessage({ icon: 'success', text: res.message });
        setOpenModal(false);
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Modal
        title={t('products_view.create_seller')}
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key='back' onClick={() => setOpenModal(false)}>
            {t('close')}
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name='name'
            errors={errors}
            register={register}
            label={t('products_view.name')}
            required={true}
          />
          <CustomInput
            name='email'
            errors={errors}
            register={register}
            label={t('products_view.email')}
            required={true}
          />
          <CustomInput
            name='contactNo'
            errors={errors}
            register={register}
            label={t('products_view.contact')}
            required={true}
          />
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' htmlType='submit'>
              {t('products_view.create_seller')}
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default CreateSellerModal;
