import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container>

            <Row className="justify-content-center">

                <Col md={6}>

                    <h1>Registro</h1>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage