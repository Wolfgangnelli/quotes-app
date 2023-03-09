import React from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';
import './Button.scss';

interface Props {
    variant?: 'primary' | 'secondary' | 'danger'
    label?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    type?: 'button' | 'submit'
    href?: string | object
    className?: string
    icon?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const Button = (props: Props) => {

    const { 
        label = '',
        type = 'button',
        variant = 'primary',
        className = '',
    } = props;

  return (
    <BootstrapButton variant={variant} type={type} className={className}>{label}</BootstrapButton>
  );
};

export default Button;