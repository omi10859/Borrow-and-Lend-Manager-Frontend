import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'

const AddTransaction = () => {
    const [transactiondetail, setTransactiondetail] = useState({});
    const [userlist, setUserlist] = useState();
    const [transactiondetailError, setTransactiondetailError] = useState({});
    const navigate = useNavigate();

    function transaction(){
        let token = window.localStorage.getItem('token')
        axios.post('https://blm-test1232.herokuapp.com/transactions/get_transactions/', transactiondetail, {headers: {"Authorization": `Token ${token}`}})
        .then(res => {
            navigate("/list-transaction");        
        }).catch(error => {
            if (error.response && error.response.status == 400) {
                setTransactiondetailError(error.response.data)
            } else {
                // todo
                // show user error  
                console.log('Error', error.message);}
        })
    }

    useEffect(() => { 
        let token = window.localStorage.getItem('token')
        axios.get(`https://blm-test1232.herokuapp.com/accounts/get_users/`, {headers: {"Authorization": `Token ${token}`}})
        .then(res => {
            setUserlist(res['data'])
        }).catch(error => {
                navigate("/");                
        })
    }, [])

    return (
        <div>
            <Row>
            <h1 className='mt-3'>Add Transaction</h1>
                <Col className='p-3' lg='6' sm='10' xs='12' style={{backgroundColor: 'white', margin: 'auto', borderRadius: '5px', background: 'white', boxShadow: 'rgba(149, 140, 141, 0.1) 0px 4px 16px, rgba(149, 140, 141,0.1) 0px 8px 24px, rgba(149, 140, 141, 0.1) 0px 16px 56px'}}>
                    
                    <div style={{padding: '40px'}}>
                        <Row className='mb-3'>
                            <Col lg='6' sm='6' xs='6'>
                                <Form.Floating className="mb-3">
                                    <Form.Select aria-label="Default select example" onChange={e => setTransactiondetail(prev => ({...prev, ['from_user']: e.target.value}))}>
                                        <option>Select User</option>
                                        {userlist &&  Object.keys(userlist).map((key, index) => ( 
                                            <option value={userlist[key]['id']}>{userlist[key]['username']}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <label htmlFor="floatingInputCustom">Transaction With</label>
                                    <small style={{color: 'red'}}>{transactiondetailError['from_user']?transactiondetailError['from_user'][0]: "" }</small>
                                </Form.Floating>
                            </Col>
                            <Col lg='6' sm='6' xs='6'>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        value={transactiondetail['user']} onInput={e => setTransactiondetail(prev => ({...prev, ['date']: e.target.value}))}
                                        id="floatingInputCustom"
                                        type="date"
                                    />
                                    <label htmlFor="floatingInputCustom">Date</label>
                                    <small style={{color: 'red'}}>{transactiondetailError['date']?transactiondetailError['date'][0]: "" }</small>
                                </Form.Floating>
                            </Col>
                            <Col lg='6' sm='6' xs='6'>
                                <Form.Select aria-label="Default select example" onChange={e => setTransactiondetail(prev => ({...prev, ['type']: e.target.value}))}>
                                    <option>Type of Transaction</option>
                                    <option value="b">Borrows</option>
                                    <option value="l">Lendes</option>
                                </Form.Select>
                                <small style={{color: 'red'}}>{transactiondetailError['type']?transactiondetailError['type'][0]: "" }</small>
                            </Col>
                            <Col lg='6' sm='6' xs='6'>
                                <Form.Select aria-label="Default select example" onChange={e => setTransactiondetail(prev => ({...prev, ['status']: e.target.value}))}>>
                                    <option>Transaction Status</option>
                                    <option value="u">UnPaid</option>
                                    <option value="p">Paid</option>
                                </Form.Select>
                                <small style={{color: 'red'}}>{transactiondetailError['status']?transactiondetailError['status'][0]: "" }</small>
                            </Col>
                        </Row>
                        <Form.Floating>
                            <Form.Control
                                value={transactiondetail['reason']} onInput={e => setTransactiondetail(prev => ({...prev, ['reason']: e.target.value}))}
                                id="floatingPasswordCustom"
                                type="Detail"
                                placeholder="Reason"
                                as="textarea"
                                style={{ height: '100px' }}
                            />
                            <label htmlFor="floatingPasswordCustom">Reason</label>
                            <small style={{color: 'red'}}>{transactiondetailError['reason']?transactiondetailError['reason'][0]: "" }</small>
                            <small style={{color: 'red'}}>{transactiondetailError['non_field_errors']?"Incorrect username or password": "" }</small>
                        </Form.Floating>
                        <div className='mt-3'>
                            <Button variant="primary" onClick={transaction}>Transaction</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/")}>Home</Button>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/list-transaction")}>List Transaction</Button>
    </div>
    )
}
export default AddTransaction;