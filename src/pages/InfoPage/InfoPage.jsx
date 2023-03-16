import { Container, Row, Col } from 'react-bootstrap';
import CreateUserButton from '../../components/CreateUserButton/CreateUserButton';
import './InfoPage.css'
const InfoPage = () => {
    return (
        <div className="fondo-pagina">
            <Container>
                <Row className="InfoPage">

                    <Col md={6} className="text-center">
                        <h1 style={{ fontSize: "3em" }}>SI ERES CLIENTE</h1>
                        <hr />
                        <ul>
                            <li>Busca el servicio que más te convenga</li>
                            <li>Añade a tus favoritos los anuncios que más te gusten</li>
                            <li>Este listado siempre estará disponible en tu perfil, para futuras necesidades</li>
                            <li>Ponte en contacto con los anunciantes elegidos</li>
                        </ul>

                    </Col>
                    <Col md={6} className="text-center">
                        <h1 style={{ fontSize: "3em" }}>SI ERES ANUNCIANTE</h1>
                        <hr />
                        <ul>
                            <li>Registrate</li>
                            <li>Crea tu anuncio</li>
                            <li>Disfruta de todas las ventajas que te ofrece ser usuario de 3DM</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <CreateUserButton className="create-user-button" />
                    </Col>
                </Row>



            </Container>
        </div>
    )
}


export default InfoPage



