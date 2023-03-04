/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormContainer, Message } from '../../components/atoms';
import { Page } from '../../components/organisms';
import { singupUserSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createUser } from '../../redux/actions/authUserAction';
import { UseFormInputs } from '../../utilis/interfaces';
import { StoreStateType } from '../../utilis/types';
import { FullScreenLoaderContext } from '../../app/App';

const Singup = () => {

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const setfullScreenLoadingActive = useContext(FullScreenLoaderContext);
    const { isLoggedIn, error, loading } = useSelector((state: StoreStateType) => state.auth);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<UseFormInputs>({
        mode: 'all',
        resolver: yupResolver(singupUserSchema),
    });

    const handleSingupUser = handleSubmit((data: UseFormInputs) => {
      const { username, email, password } = data;
        
      dispatch(createUser({ username, email, password }));
    });

    useEffect(() => {
        if(isLoggedIn) {
            reset();
            navigate('/');
        }
        loading ? setfullScreenLoadingActive(true) : setfullScreenLoadingActive(false);
    }, [isLoggedIn, loading]);

  return (
    <Page className='min-vh-100'>
      <AuthFormContainer>
          <h1 className='py-2 text-center'>Registration</h1>
          <Form onSubmit={handleSingupUser}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              {...register("email")}
              required
            />
            {errors.email && <p>{String(errors.email?.message)}</p>}
          </Form.Group>
          <Form.Group className="my-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              {...register("username")}
              required
            />
            {errors.username && <p>{String(errors.username?.message)}</p>}
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
              required
            />
            {errors.password && <p>{String(errors.password?.message)}</p>}
          </Form.Group>
          <Form.Group className="my-2" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              required
            />
            {errors.confirmPassword && <p>{String(errors.confirmPassword?.message)}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I have read and agree to the Terms"  {...register("acceptTerms")} required/>
          </Form.Group>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button type="submit" variant="primary" className="mt-4 fw-bold">SUBMIT</Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button variant="warning" className="mt-4 fw-bold" onClick={() => reset()}>RESET</Button>
            </Col>
          </Row>
        </Form>
        {error && (
            <Row className='pt-4 text-center'>
                <Col>
                    <Message label={error?.code} variant='danger' />
                </Col>
            </Row>
        )}
        <Row className="p-3">
          <Col>
            Already Registered?{" "}
            <NavLink to={"/login"} className="link-register">
              Login
            </NavLink>
          </Col>
        </Row>
      </AuthFormContainer>
    </Page>
  );
};

export default Singup;