import { Row, Col, Container } from 'react-bootstrap'
import CreateUserButton from '../../components/CreateUserButton/CreateUserButton';
import './HomePage.css'
import ControlledCarousel from '../../components/Carousel/Carousel'

const HomePage = () => {

    return (
        <div className="general">
            <div className="home">
                <div className="row-container" style={{ position: 'relative', zIndex: 2 }}>
                    <Row className="my-5">
                        <Col md={{ span: 6, offset: 4 }}>
                            <h1 className="titleh13D">3DM</h1>
                        </Col>
                        <Col md={{ span: 7, offset: 3 }} className="my-9">
                            <h2 className="titulo">Tu red de anuncios de servicios para el hogar</h2>
                        </Col>
                        <div>
                            <CreateUserButton className="createUser" />
                        </div>
                    </Row>
                </div>
                <div className="picturesCarousel" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                    <ControlledCarousel />
                </div>
            </div>
        </div>


    )
}

export default HomePage





