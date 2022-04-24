import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return <>
    <h1>404 Page Not Found!!</h1>
    <Button 
      className='m-3' 
      variant="outline-secondary" 
      size="lg" 
      onClick={()=> navigate("/home")}
    >Back to Home</Button>
    </>
}
