import {Col, Flex, Row, Slider} from 'antd';
import React from 'react';
import {useGetAllCategoriesQuery} from '../../redux/features/management/categoryApi';
import {useGetAllBrandsQuery} from '../../redux/features/management/brandApi';
import { useTranslation } from 'react-i18next';

interface ProductManagementFilterProps {
  query: {name: string; category: string; brand: string; limit: number};
  setQuery: React.Dispatch<
    React.SetStateAction<{name: string; category: string; brand: string; limit: number}>
  >;
}

const ProductManagementFilter = ({query, setQuery}: ProductManagementFilterProps) => {
  const { t } = useTranslation();
  const {data: categories} = useGetAllCategoriesQuery(undefined);
  const {data: brands} = useGetAllBrandsQuery(undefined);

  return (
    <Flex
      style={{
        border: '1px solid grey',
        padding: '1rem',
        marginBottom: '.5rem',
        borderRadius: '1rem',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4) inset',
      }}
    >
      <Row gutter={2} style={{width: '100%'}}>
        <Col xs={{span: 24}} md={{span: 8}}>
          <label style={{fontWeight: 700}}>{t('product_management_view.price_range')}</label>
          <Slider
            range
            step={100}
            max={20000}
            defaultValue={[1000, 5000]}
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
          />
        </Col>
        <Col xs={{span: 24}} md={{span: 8}}>
          <label style={{fontWeight: 700}}>{t('product_management_view.search_name')}</label>
          <input
            type='text'
            value={query.name}
            className={`input-field`}
            placeholder={t('product_management_view.name')}
            onChange={(e) => setQuery((prev) => ({...prev, name: e.target.value}))}
          />
        </Col>
        <Col xs={{span: 24}} md={{span: 4}}>
          <label style={{fontWeight: 700}}>{t('product_management_view.search_category')}</label>
          <select
            name='category'
            className={`input-field`}
            defaultValue={query.category}
            onChange={(e) => setQuery((prev) => ({...prev, category: e.target.value}))}
            onBlur={(e) => setQuery((prev) => ({...prev, category: e.target.value}))}
          >
            <option value=''>{t('product_management_view.category')}</option>
            {categories?.data?.map((category: {_id: string; name: string}) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Col>
        <Col xs={{span: 24}} md={{span: 4}}>
          <label style={{fontWeight: 700}}>{t('product_management_view.search_brand')}</label>
          <select
            name='Brand'
            className={`input-field`}
            defaultValue={query.brand}
            onChange={(e) => setQuery((prev) => ({...prev, brand: e.target.value}))}
            onBlur={(e) => setQuery((prev) => ({...prev, brand: e.target.value}))}
          >
            <option value=''>{t('product_management_view.brand')}</option>
            {brands?.data?.map((brand: {_id: string; name: string}) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </Flex>
  );
};

export default ProductManagementFilter;
