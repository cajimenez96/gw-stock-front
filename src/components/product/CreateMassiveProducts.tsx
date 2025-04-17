import { useState } from 'react'
import { Button, Flex } from 'antd';
import toastMessage from '../../lib/toastMessage';
import { useTranslation } from 'react-i18next';
import { useCreateMassiveProductsMutation } from '../../redux/features/management/productApi';

const CreateMassiveProducts = () => {
  const { t } = useTranslation();
  const [createMassiveProducts] = useCreateMassiveProductsMutation();
  const [newFile, setNewFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (!validTypes.includes(file.type)) {
        toastMessage({ 
          icon: 'error', 
          text: t('products_view.invalid_file_type') 
        });
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      setNewFile(file);
    }
  };

  const handleClick = async () => {
    if (!newFile) {
      toastMessage({ icon: 'error', text: t('products_view.file_required') });
      return;
    }

    try {
      const res = await createMassiveProducts(newFile).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        setNewFile(undefined);
        // Limpiar el input file
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex
      vertical
      style={{
        padding: '1rem 2rem',
        border: '1px solid #b6cbd7',
        borderRadius: '.6rem',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '.6rem',
          fontWeight: '900',
          textTransform: 'uppercase',
        }}
      >
        {t('products_view.create_massive')}
      </h3>
      <input
        type='file'
        onChange={handleFileChange}
        className='input-field'
        accept=".xlsx,.xls,.csv"
      />
      <Button
        htmlType='button'
        onClick={handleClick}
        type='primary'
        style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        disabled={!newFile}
      >
        {t('products_view.btn_add')}
      </Button>
    </Flex>
  )
}

export default CreateMassiveProducts