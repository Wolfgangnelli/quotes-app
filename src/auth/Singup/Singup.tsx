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
    const { data, loading } = useSelector((state: any) => state.auth);

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
      const { username, email, password } = data;
        
      dispatch(createUser({ username, email, password }));
    });

    useEffect(() => {
        if(data && !!Object.keys(data).length) {
            console.log(data);
            reset();
            navigate('/');
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
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm assword"
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
            <Button type="submit" variant="primary" className="mt-4">SUBMIT</Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button type="button" variant="warning" className="mt-4" onClick={reset}>RESET</Button>
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
  );
};

export default Singup;