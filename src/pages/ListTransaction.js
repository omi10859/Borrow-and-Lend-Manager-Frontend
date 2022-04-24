import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

const token = window.localStorage.getItem('token')
const AddTransaction = () => {
    const [transactiondetail, setTransactiondetail] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => { 
        get_list()
    }, [])

    function get_list(){
        // todo: use base urls
        axios.get(`https://blm-test1232.herokuapp.com/transactions/get_transactions/`, {headers: {"Authorization": `Token ${token}`}})
        .then(res => {
            setTransactiondetail(res['data'])
        }).catch(error => {
            navigate("/");                
        })
    }

    function updateTransaction(id){
        let url = 'https://blm-test1232.herokuapp.com/transactions/mark_paid/' + String(id) + '/'
        axios.put(url, null, {headers: {"Authorization": `Token ${token}`}})
        .then(res => {
            get_list()
        }).catch(error => {
            navigate("/");                
        })
    }

    return (
        <div>
            <div><h1>Transaction List</h1></div>
            <Row><Col className='p-3' lg='10' sm='12' xs='12' style={{minHeight: '80vh', backgroundColor: 'white', margin: 'auto', borderRadius: '5px', background: 'white', boxShadow: 'rgba(149, 140, 141, 0.1) 0px 4px 16px, rgba(149, 140, 141,0.1) 0px 8px 24px, rgba(149, 140, 141, 0.1) 0px 16px 56px'}}>
                <Table striped borderless hover variant="white">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>From User</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactiondetail &&  Object.keys(transactiondetail).map((row, row_index) => ( 
                                <tr>
                                    <td>{transactiondetail[row]['id']}</td>
                                    <td>{transactiondetail[row]['type']=='b'? 'Borrows': 'Lendes'}</td>
                                    <td>{transactiondetail[row]['from_user']['username']}</td>
                                    <td>{transactiondetail[row]['status']=='p'? <Badge pill bg="primary">Paid</Badge>: <Badge pill bg="secondary">UnPaid</Badge>}</td>
                                    <td>{transactiondetail[row]['reason']}</td>
                                    {transactiondetail[row]['status']=='u'?
                                        <td><Button 
                                            variant="primary" 
                                            size="sm" 
                                            onClick={() => updateTransaction(transactiondetail[row]['id'])}
                                        >
                                            Mark paid
                                        </Button></td>
                                        : 
                                        <td></td>
                                    }
                                </tr>
                        ))}
                    </tbody>
                </Table>
            </Col></Row>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/")}>Home</Button>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/add-transaction")}>Add Transaction</Button>
    </div>
    )
}
export default AddTransaction;