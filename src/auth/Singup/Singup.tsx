/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormContainer } from '../../components/atoms';
import { singupUserSchema } from '../../schemas/singupUser';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createUser } from '../../redux/actions/authUserAction';

const Singup = () => {

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const { data, loading } = useSelector((state: any) => state.user);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'all',
        resolver: yupResolver(singupUserSchema),
    });

    const handleSingupUser = handleSubmit(async (data: any) => {
        dispatch(createUser(data));
    });

    useEffect(() => {
        if(!!Object.keys(data).length) {
            console.log(data);
            navigate('/');
            reset();
        }
    }, [data]);

  return (
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
          {errors.email && <p>Email is required</p>}
        </Form.Group>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("username")}
            required
          />
          {errors.username && <p>Password is requried</p>}
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            required
          />
          {errors.password && <p>Password is required</p>}
        </Form.Group>
 {/*        {error && (
          <Row className="mt-1">
            <Col>
              <Message variant="danger">{error.message}</Message>
            </Col>
          </Row>
        )} */}
        <Row>
          <Col className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="mt-4">SUBMIT</Button>
          </Col>
        </Row>
      </Form>
      <Row className="p-3">
        <Col>
          Already Registered?{" "}
          <NavLink to={"/login"} className="link-register">
            Login
          </NavLink>
        </Col>
      </Row>
    </AuthFormContainer>
  )
}

export default Singup;