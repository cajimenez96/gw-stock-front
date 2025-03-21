import React, { CSSProperties, ReactNode } from 'react'
import { Flex, FlexProps } from 'antd';

interface ContainerProps extends FlexProps {
  children: ReactNode;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingRight?: string | number;
  paddingLeft?: string | number;
  padding?: string | number;
  width?: string | number;
  style?: CSSProperties,
}


const Container = ({ 
  children,
  style,
  ...rest
}: ContainerProps) => {

  const defaultStyles = {
    backgroundColor: 'var(--bg-white)',
    border: '1px solid var(--border)',
    borderRadius: 12,
  };

  return (
    <Flex style={{...defaultStyles, ...style}} {...rest}>
      {children}
    </Flex>
  )
}

export default Container;