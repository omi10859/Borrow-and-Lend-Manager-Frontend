import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Container from 'react-bootstrap/Container'

import NotFound from './pages/NotFound' 
import Login from './pages/Login' 
import AddTransaction from './pages/AddTransaction' 
import ListTransaction from './pages/ListTransaction' 
import Home from './pages/Home'

export default function BasicExample() {
	const isAuthenticated = window.localStorage.getItem('token')
	return (
		<div style={{height: '100vh'}}>
			<div style={{display:'table', height:'100%', width: '100%', backgroundColor: '#6f6f6f3b'}}>
			<Container style={{display: 'table-cell', verticalAlign: 'middle', textAlign:'center'}}>
				<Router>
					<Routes>
						<Route path="/add-transaction" element={<AddTransaction />} /> 
						<Route path="/list-transaction" element={<ListTransaction />} /> 
						<Route path="/" element={<Home />} /> 
						<Route path="/login" element={<Login />} /> 
						<Route path="*" element={<NotFound />} /> 
					</Routes>
				</Router>
			</Container>
			</div>
		</div>
	);
}
