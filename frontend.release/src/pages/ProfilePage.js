import { useEffect } from 'react';

import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Alert,
} from 'react-bootstrap';

import { useForm } from 'react-hook-form';

import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import profileResolver from '../validations/profileResolver';

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: profileResolver,
  });

  const { user, setUser } = useAuth();

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('isLoyalty', user.isLoyalty);
    setValue('password', '');
  }, [setValue, user]);

  const onSubmit = (fromData) => {
    console.log('fromData:', fromData);
    const clone = {...fromData};
    if (user.role === roles.admin) {
      delete clone.isLoyalty;
    }
    clone.role = user.role;
    setUser(clone);
  }

  return (
    <Container>
      <Row className="my-2 justify-content-center d-flex">
        <div style={{ maxWidth: '25rem'}}>
          <h2 className="text-center my-4">Profile</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2" controlId="form-name">
              <Row>
                <Col md={2}>
                  <Form.Label>Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control type="text" {...register("name")} />
                  {errors?.name && <Alert variant="danger">The name cannot be empty</Alert>}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="form-email">
              <Row>
                <Col md={2}>
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col>
                  <Form.Control type="email" {...register("email")} />
                  {errors?.email && <Alert variant="danger">The email cannot be empty</Alert>}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="form-password">
              <Row>
                <Col md={2}>
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col>
                  <Form.Control type="password" {...register("password", { setValueAs: (v) => {
                    if (!v) return undefined;
                    return v;
                  }})} />
                  {errors?.password && <Alert variant="danger">The password cannot be empty</Alert>}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="my-3" controlId="form-check">
              <Col md={{ offset:2 }}>
                <Form.Check
                  type="checkbox"
                  readOnly={user.role === roles.admin}
                  label={`Have a loyalty card? ${user.role === roles.admin ? ' (only client)':''}`}
                  {...register("isLoyalty")}
                />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </Form>
        </div>
      </Row>
    </Container>
  );
}