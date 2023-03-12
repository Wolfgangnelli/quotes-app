import { Form } from 'react-bootstrap';
import { Button, Message } from '../../atoms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { quoteSchema } from '../../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuote, getQuotes } from '../../../redux/actions/quoteAction';
import { StoreStateType } from '../../../utilis/types';

const FormQuote = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const { error } = useSelector((state: StoreStateType) => state.quoteAdd);

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
            {errors.text && <p>{String(errors.text?.message)}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Abraham Lincoln" {...register("author")} />
            {errors.author && <p>{String(errors.author?.message)}</p>}
        </Form.Group>
        {error && <Message variant='danger' label={error} />}
        <Button variant="primary" type="submit" label='Submit' className='float-end fw-bold' />
      </Form>
  );
};

export default FormQuote;