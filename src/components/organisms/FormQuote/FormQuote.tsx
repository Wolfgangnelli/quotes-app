import { Form } from 'react-bootstrap';
import { Button } from '../../atoms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { quoteSchema } from '../../../schemas/quote';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuote, getQuotes } from '../../../redux/actions/quoteAction';

const FormQuote = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm({
        mode: "all",
        resolver: yupResolver(quoteSchema),
      });

    const handleSubmitQuote = handleSubmit((data: any) => {
        dispatch(addQuote(data));
        dispatch(getQuotes());
        reset();
    });

  return (
      <Form onSubmit={handleSubmitQuote}>
        <Form.Group className="mb-3">
            <Form.Label>Quote</Form.Label>
            <Form.Control as="textarea" placeholder="Whatever you are, be a good one." {...register("text")} required />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Abraham Lincoln" {...register("author")} />
        </Form.Group>

        <Button variant="primary" type="submit" label='Submit' className='float-end fw-bold' />
      </Form>
  );
};

export default FormQuote;