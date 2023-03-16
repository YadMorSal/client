import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'
import './SignupPage.css'

const SignupPage = () => {

    return (



        <div className="register">



            <h1 className='titleRegister'>Registro</h1>
            <Container className="container-register">
                <SignupForm />
            </Container>


        </div>


    )
}

export default SignupPage