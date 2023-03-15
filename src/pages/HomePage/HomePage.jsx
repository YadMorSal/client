import { Row, Col, Container } from 'react-bootstrap'
import CreateUserButton from '../../components/CreateUserButton/CreateUserButton';
import './HomePage.css'

const HomePage = () => {

    return (

        <div className="Home">
            <Container>
                <Row >
                    <Col md={{ span: 6, offset: 4 }} className="my-5">
                        <img src="https://images.squarespace-cdn.com/content/v1/5e3d94f256433716ce077ce8/1581094878625-AMCRVHZDPERNX47PGIJX/3dm_logo-crop.png" alt="" />
                    </Col>
                    <Col md={{ span: 7, offset: 3 }} className=" my-9">
                        <h2 className="titulo" >Tu red de anuncios de servicios para el hogar</h2>
                    </Col>




                    <div>
                        <CreateUserButton className="createUser" />
                    </div>
                </Row >
            </Container>
        </div>


    )
}

export default HomePage