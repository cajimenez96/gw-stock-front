import { Flex, Modal } from 'antd';
import { ReactNode } from 'react';

interface CustomModalProps {
  title: string;
  show: boolean;
  center?: boolean
  children: ReactNode;
  footer?: ReactNode;
  closable?: boolean;
  handleOk?: ((e: React.MouseEvent<HTMLButtonElement>) => void);
  handleCancel?: ((e: React.MouseEvent<HTMLButtonElement>) => void);
}

const CustomModal = ({
  title,
  show,
  center = true,
  footer,
  children,
  closable = false,
  handleOk,
  handleCancel,
}: CustomModalProps) => {
  return (
    <Modal
    title={title}
    centered={center}
    open={show}
    closable={closable}
    // onClose={handleClose}
    onOk={handleOk}
    onCancel={handleCancel}
    footer={footer ? footer : null}
  >
    <Flex align='center' justify='center' style={{ padding: 20, minHeight: 300 }}>
      {children}
    </Flex>
  </Modal>
  )
}

export default CustomModal