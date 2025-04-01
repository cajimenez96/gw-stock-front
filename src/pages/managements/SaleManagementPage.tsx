import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import SearchInput from '../../components/SearchInput';
import toastMessage from '../../lib/toastMessage';
import { useDeleteSaleMutation, useGetAllSaleQuery } from '../../redux/features/management/saleApi';
import { IProduct } from '../../types/product.types';
import { ITableSale } from '../../types/sale.type';
import formatDate from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';

const SaleManagementPage = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isFetching } = useGetAllSaleQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page: page }));
  };

  const tableData = data?.data?.map((sale: ITableSale) => ({
    key: sale._id,
    productName: sale.productName,
    productPrice: sale.productPrice,
    buyerName: sale.buyerName,
    quantity: sale.quantity,
    totalPrice: sale.totalPrice,
    date: formatDate(sale.date),
  }));

  const columns: TableColumnsType<any> = [
    {
      title: t('management_sells_view.name'),
      key: 'productName',
      dataIndex: 'productName',
    },
    {
      title: t('management_sells_view.price'),
      key: 'productPrice',
      dataIndex: 'productPrice',
      align: 'center',
    },
    {
      title: t('management_sells_view.buyer_name'),
      key: 'buyerName',
      dataIndex: 'buyerName',
      align: 'center',
    },
    {
      title: t('management_sells_view.quantity'),
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: t('management_sells_view.total_price'),
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      align: 'center',
    },
    {
      title: t('management_sells_view.date'),
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: t('management_sells_view.action'),
      key: 'x',
      align: 'center',
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            <UpdateModal product={item} />
            <DeleteModal id={item.key} />
          </div>
        );
      },
      width: '1%',
    },
  ];

  // const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
  //   setDate(dateString as string);
  // };

  return (
    <>
      <Flex justify='end' style={{ margin: '5px', gap: 4 }}>
        {/* <DatePicker
          onChange={onDateChange}
          placeholder='Search by Selling date...'
          style={{ minWidth: '250px' }}
        /> */}
        <SearchInput setQuery={setQuery} placeholder={t('search')} />
      </Flex>
      <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};

/**
 * Update Modal
 */
const UpdateModal = ({ product }: { product: IProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log({ product, data });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ! Remove the first return to work on this component
  return;

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'green' }}
      >
        <EditFilled />
      </Button>
      <Modal title='Update Product Info' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Working on it...!!!</h1>
          <Button htmlType='submit'>Submit</Button>
        </form>
      </Modal>
    </>
  );
};

/**
 * Delete Modal
 */
const DeleteModal = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSale] = useDeleteSaleMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSale(id).unwrap();
      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        handleCancel();
      }
    } catch (error: any) {
      handleCancel();
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>
      <Modal title={t('delete_modal.title')} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>{t('management_sells_views.delete_modal.delete_product')}</h3>
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Button
              onClick={handleCancel}
              type='primary'
              style={{ backgroundColor: 'lightseagreen' }}
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              type='primary'
              style={{ backgroundColor: 'red' }}
            >
              {t('accept')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SaleManagementPage;
