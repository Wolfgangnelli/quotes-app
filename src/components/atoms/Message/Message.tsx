import { Alert } from 'react-bootstrap';
import './Message.scss';

interface Props {
    label: string
    variant?: string
    className?: string
}

const Message = (props: Props) => {

    const { label = '', variant = 'primary', className = '' } = props;

  return (
    <Alert className={`fw-bold ${className}`} variant={variant} >{label}</Alert>
  );
};

export default Message;