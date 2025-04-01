import {Button, Col, Flex, Row} from 'antd';
import {FieldValues, useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import {useGetAllBrandsQuery} from '../redux/features/management/brandApi';
import {useGetAllCategoriesQuery} from '../redux/features/management/categoryApi';
import {useCreateNewProductMutation} from '../redux/features/management/productApi';
import {useGetAllSellerQuery} from '../redux/features/management/sellerApi';
import {ICategory} from '../types/product.types';
import CreateSeller from '../components/product/CreateSeller';
import CreateCategory from '../components/product/CreateCategory';
import CreateBrand from '../components/product/CreateBrand';
import { useTranslation } from 'react-i18next';

const CreateProduct = () => {
  const { t } = useTranslation();
  const [createNewProduct] = useCreateNewProductMutation();
  const {data: categories} = useGetAllCategoriesQuery(undefined);
  const {data: sellers} = useGetAllSellerQuery(undefined);
  const {data: brands} = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = {...data};
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

    if (payload.size === '') {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({icon: 'success', text: res.message});
        reset();
      }
    } catch (error: any) {
      console.log(error);

      toastMessage({icon: 'error', text: error.data.message});
    }
  };

  return (
    <>
      <Row
        gutter={30}
        style={{
          height: 'calc(100vh - 6rem)',
          overflow: 'auto',
        }}
      >
        <Col
          xs={{span: 24}}
          lg={{span: 14}}
          style={{
            display: 'flex',
          }}
        >
          <Flex
            vertical
            style={{
              width: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
            }}
          >
            <h1
              style={{
                marginBottom: '.8rem',
                fontWeight: '900',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              {t('products_view.add_product')}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                name='name'
                errors={errors}
                label={t('products_view.name')}
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label={t('products_view.price')}
                type='number'
                name='price'
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label={t('products_view.stock')}
                type='number'
                name='stock'
                register={register}
                required={true}
              />
              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    {t('products_view.seller')}
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('seller', {required: true})}
                    className={`input-field ${errors['seller'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>{t('products_view.select_seller')}</option>
                    {sellers?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    {t('products_view.category')}
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('category', {required: true})}
                    className={`input-field ${errors['category'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>{t('products_view.select_category')}</option>
                    {categories?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    {t('products_view.brand')}
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('brand')}
                    className={`input-field ${errors['brand'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>{t('products_view.select_brand')}</option>
                    {brands?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <CustomInput label={t('products_view.description')} name='description' register={register} />

              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    {t('products_view.size')}
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select className={`input-field`} {...register('size')}>
                    <option value=''>{t('products_view.select_size')}</option>
                    <option value='SMALL'>{t('products_view.small_size')}</option>
                    <option value='MEDIUM'>{t('products_view.medium_size')}</option>
                    <option value='LARGE'>{t('products_view.large_size')}</option>
                  </select>
                </Col>
              </Row>
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                >
                  {t('products_view.add_product')}
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
        <Col xs={{span: 24}} lg={{span: 10}}>
          <Flex
            vertical
            style={{
              width: '100%',
              height: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
              justifyContent: 'space-around',
            }}
          >
            <CreateSeller />
            <CreateCategory />
            <CreateBrand />
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
