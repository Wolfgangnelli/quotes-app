/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from 'react-bootstrap';
import { Button, Message } from '../../atoms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { quoteSchema } from '../../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuote, getQuotes } from '../../../redux/actions/quoteAction';
import { StoreStateType } from '../../../utilis/types';

interface Props {
  isUpdating?: boolean
  textQuote?: string
  authorQuote?: string
}

const FormQuote = (props: Props) => {

  const { isUpdating, textQuote, authorQuote } = props;

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
        if(isUpdating) {
          console.log(data);
        } else {
          dispatch(addQuote(data));
          dispatch(getQuotes());
        }
        reset();
    });

  return (
      <Form onSubmit={handleSubmitQuote}>
        <Form.Group className="mb-3">
            <Form.Label>Quote</Form.Label>
            <Form.Control as="textarea" defaultValue={textQuote && textQuote} placeholder="Whatever you are, be a good one." {...register("text")} required />
            {errors.text && <p>{String(errors.text?.message)}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={authorQuote && authorQuote} placeholder="Abraham Lincoln" {...register("author")} />
            {errors.author && <p>{String(errors.author?.message)}</p>}
        </Form.Group>
        {error && <Message variant='danger' label={error} />}
        <Button variant="primary" type="submit" label='Submit' className='float-end fw-bold' />
      </Form>
  );
};

export default FormQuote;