import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Login = () => {
    const [logindetail, setLogindetail] = useState({username: '', password: ''});
    const [logindetailError, setLogindetailError] = useState({username: '', password: ''});
    const navigate = useNavigate();

    function login(){
        let formData = new FormData();  
        formData.append('username', logindetail['username']); 
        formData.append('password', logindetail['password']);

        axios.post(`http://127.0.0.1:8000/accounts/api-token-auth/`, formData)
        .then(res => {
            window.localStorage.setItem('token', res.data['token']);
            // console.log(window.localStorage.getItem('token'))
            navigate("/");    
        }).catch(error => {
            if (error.response && error.response.status == 400) {
                setLogindetailError(error.response.data)
            } else {
                // todo
                // show user error  
                console.log('Error', error.message);}
        })
    }
    return(
      <div style={{display:'table', height:'100%', width: '100%', backgroundColor: '#6f6f6f3b'}}>
        <Container style={{display: 'table-cell', verticalAlign: 'middle', textAlign:'center'}}>
            <Row>
                <Col className='p-3' lg='4' sm='8' xs='10' style={{backgroundColor: 'white', margin: 'auto', borderRadius: '5px', background: 'white', boxShadow: 'rgba(149, 140, 141, 0.1) 0px 4px 16px, rgba(149, 140, 141,0.1) 0px 8px 24px, rgba(149, 140, 141, 0.1) 0px 16px 56px'}}>
                    <h1 className='mt-3'>Login</h1>
                    <div style={{padding: '40px'}}>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                value={logindetail['username']} onInput={e => setLogindetail(prev => ({...prev, ['username']: e.target.value}))}
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputCustom">Username</label>
                            <small style={{color: 'red'}}>{logindetailError['username']?logindetailError['username'][0]: "" }</small>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                value={logindetail['password']} onInput={e => setLogindetail(prev => ({...prev, ['password']: e.target.value}))}
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Password</label>
                            <small style={{color: 'red'}}>{logindetailError['password']?logindetailError['password'][0]: "" }</small>
                            <small style={{color: 'red'}}>{logindetailError['non_field_errors']?"Incorrect username or password": "" }</small>
                        </Form.Floating>
                        <div className='mt-3'>
                            <Button variant="primary" onClick={login}>Login</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    )
  }

export default Login;