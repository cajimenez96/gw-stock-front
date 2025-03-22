import { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  children: ReactNode;
  style?: CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  handleClick?: () => void;
}

const CustomButton = ({
  children,
  style,
  htmlType,
  loading = false,
  handleClick
}: CustomButtonProps) => {
  const defaultStyle = {
    paddingTop: 20,
    paddingBottom: 20,
  };

  return (
    <Button
      type='primary'
      style={{...defaultStyle, ...style}}
      htmlType={htmlType}
      loading={loading}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export default CustomButton