/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthFormContainer, Message } from '../../components/atoms';
import { Page } from '../../components/organisms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUserSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { loginUser } from '../../redux/actions/authUserAction';
import { StoreStateType } from '../../utilis/types';
import { UseFormInputs } from '../../utilis/interfaces';
import {  FullScreenLoaderContext} from '../../app/App';

const Login = () => {

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const setfullScreenLoadingActive = useContext(FullScreenLoaderContext);
    const { isLoggedIn, error, loading } = useSelector((state: StoreStateType) => state.auth);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm<UseFormInputs>({
        mode: "all",
        resolver: yupResolver(loginUserSchema)
    });

    const errorMessage = () => {
        if(error.code.includes("user-not-found")) {
            return "User Not Found!";
        } else if (error.code.includes("wrong-password")) {
            return "Wrong Password!";
        } else {
            return error.code;
        }
    };

    const handleLoginUser = handleSubmit((data: UseFormInputs) => {
        const { email, password } = data;

        dispatch(loginUser({ email, password }));
    });

    useEffect(() => {
        if(isLoggedIn) {
            setfullScreenLoadingActive(false);
            reset();
            navigate('/');
        }
        if(loading) {
            setfullScreenLoadingActive(true);
        } else {
            setfullScreenLoadingActive(false);
        }
    }, [isLoggedIn, loading]);
    
  return (
    <Page className='min-vh-100'>
        <AuthFormContainer>
            <h1 className="py-2 text-center">Login</h1>
            <Form onSubmit={handleLoginUser}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="text"
                placeholder="example@gmail.com"
                {...register("email")}
                required
                />
                {errors.email && <p>{String(errors.email?.message)}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                required
                />
                {errors.password && <p>{String(errors.password?.message)}</p>}
            </Form.Group>
        {error && (
            <Row className='pt-4 text-center'>
                <Col>
                    <Message label={errorMessage()} variant='danger' />
                </Col>
            </Row>
        )}
            <Row>
                <Col className="d-flex justify-content-center">
                <Button type="submit" variant="primary" className="mt-4 fw-bold">
                    SUBMIT
                </Button>
                </Col>
            </Row>
            </Form>
            <Row className="p-3">
            <Col>
                New Customer?{" "}
                <NavLink to={"/singup"} className="link-register">
                Register
                </NavLink>
            </Col>
        </Row>
        </AuthFormContainer>
    </Page>
  );
};

export default Login;