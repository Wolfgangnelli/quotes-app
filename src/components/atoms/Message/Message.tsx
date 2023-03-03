import { Alert } from 'react-bootstrap';

interface Props {
    label: string
    variant?: string
}

const Message = (props: Props) => {

    const { label = '', variant = 'primary' } = props;

  return (
    <Alert variant={variant} >{label}</Alert>
  );
};

export default Message;