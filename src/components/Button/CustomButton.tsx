import { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  children: ReactNode;
  style?: CSSProperties;
  handleClick: () => void;
}

const CustomButton = ({ children, style, handleClick }: CustomButtonProps) => {
  const defaultStyle = {
    paddingTop: 20,
    paddingBottom: 20,
  };

  return (
    <Button type='primary' style={{...defaultStyle, ...style}} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default CustomButton