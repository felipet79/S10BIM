import {useState} from "react";

import { useDispatch } from "react-redux";
import logo from "../assets/img/logo.png";
import { signIn } from "../actions/auth.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Form, Container, Button, Image } from "react-bootstrap";

// import { Link } from "react-router-dom";
import '../styles/auth.css';
import SelectCompany from "../components/SelectCompany";

export default function SignIn() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const showFn = () =>{
	  setShow(true)
  }
  // Formulario y validación con formik y Yup
  const formik = useFormik({
    initialValues: {
      UserName: 'ctorres@s10peru.com',
      Password: 'uT9pLH4V',
    },
    validationSchema: Yup.object({
      UserName: Yup.string()
        .email("El email no es válido")
        .required("El Email es Obligatorio"),
      Password: Yup.string().required("El password no puede ir vacio"),
    }),
    onSubmit: (data) => {
    //   console.log("enviando...");
      dispatch(signIn(data, showFn));
    },
  });

  
  return (
    <div className="auth">
	  <SelectCompany setShow={setShow} show={show} />
      <Container className="d-flex justify-content-center">
      <Form method="POST" onSubmit={formik.handleSubmit}>
        <Card style={{ width: 400 }} className="mt-5">
          <Card.Header className="text-center bg-dark">
            <Image src={logo} fluid width="140" />
          </Card.Header>

          <Card.Body className="d-flex justify-content-center">
            <div className="w-75">
              <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control 
					className="border-top-0 border-left-0 border-right-0" 
					type="text" 
					placeholder="example@gmail.com" 
					value={formik.values.UserName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.errors.UserName ? true : false}
					name="UserName"
					autoFocus
				/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control 
					type="password" 
					className="border-top-0 border-left-0 border-right-0" 
					value={formik.values.Password}
          //value="uT9pLH4V"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={formik.errors.UserName ? true : false}
					name="Password"
				/>
              </Form.Group>
             
            </div>
          </Card.Body>
            <Card.Footer className="p-0 mt-5">
              <Button type="submit" variant="primary" block className="py-3 rounded-0" style={{
background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'


              }}>
              	<i className="fas fa-sign-out-alt"></i> INICIAR SESIÓN
              </Button>
            </Card.Footer>
        </Card>
      </Form>
    </Container>
    </div>
  );
}
