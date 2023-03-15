import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = () => {

    return (
        <div className='loginwall'>
            <Container>

                <Row>

                    <Col xs={12} md={{ offset: 2, span: 10 }} className="ml-auto" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
                        <div className="w-100 text-center">
                            <h1>Inicio sesión</h1>

                            <hr />


                            <LoginForm className="mx-auto" />
                        </div>

                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default LoginPage