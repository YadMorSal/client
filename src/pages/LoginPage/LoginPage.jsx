import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = () => {

    return (

        <Container>
            <div className='loginwall'>

                <Row>

                    <div md={{ offset: 5, span: 5 }} style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
                        <div className="w-100 text-center">
                            <h1>Inicio sesión</h1>

                            <hr />

                            <LoginForm className="mx-auto" style={{ width: '70%' }} />

                        </div>

                    </div>
                </Row>
            </div>
        </Container>

    )
}

export default LoginPage