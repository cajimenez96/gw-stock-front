import { Col, Flex, Modal, Row, Table, Typography } from "antd";
import Container from "../components/Container/Container";
import { useState } from "react";
import CustomSearch from "../components/CustomSearch";
import { useTranslation } from "react-i18next";
import CustomButton from "../components/Button/CustomButton";
import { UserAddOutlined } from '@ant-design/icons';
import { useGetAllUsersQuery } from "../redux/features/authApi";
import Loader from "../components/Loader";
import { allUsersColumns } from "../constant/constants";

const { Title } = Typography;

const AllUsersPage = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const { t } = useTranslation();
  const [searchUser ,setSearchUser] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const showModal = () => setOpenModal(!openModal);

  console.log(searchUser);

  return (
    <Flex vertical gap={20}>
      <Container justify="space-between" style={{ padding: 20 }}>
        <Title level={3}>
          {t('all_user.users')}
        </Title>
        <Flex gap={30} align="center">
          <div style={{ width: 300 }}>
            <CustomSearch placeholder={t('search')} setQuery={setSearchUser} />
          </div>
            <CustomButton handleClick={showModal}>
              <UserAddOutlined />
              {t('all_user.add_user')}
            </CustomButton>
        </Flex>
      </Container>
      <Container style={{ height: '80vh' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Row>
            <Col>
              <Table
                virtual
                scroll={{ x: 100, y: 500 }}
                style={{ tableLayout: 'auto' }}
                dataSource={data?.data}
                columns={allUsersColumns}
                
              />
            </Col>
          </Row>
        )}
      </Container>

      <Modal
        centered
        open={openModal}
        onOk={showModal}
        onCancel={showModal}
      >
        <div>Agregar usuario</div>
      </Modal>
    </Flex>
  )
}

export default AllUsersPage;