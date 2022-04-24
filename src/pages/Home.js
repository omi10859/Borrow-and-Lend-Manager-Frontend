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

const Home = () => {
    const [transactiondetail, setTransactiondetail] = useState({});
    const navigate = useNavigate();

    useEffect(() => { 
        let token = window.localStorage.getItem('token')
        if (!token){
            navigate("/login");
        }
    }, [])

    return ( 
        <>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/add-transaction")}>Add Transaction</Button>
            <Button className='m-3' variant="outline-secondary" size="lg" onClick={()=> navigate("/list-transaction")}>List Transaction</Button>
        </>
    )
}
export default Home;