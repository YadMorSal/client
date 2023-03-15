
import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import UserService from "./../../services/user.services"
import "./UserDetailsPage.css";

const UserDetailsPage = () => {

    const [user, setUser] = useState({})

    const { user_id } = useParams()

    useEffect(() => {
        UserService
            .getOneUser(user_id)
            .then(({ data }) => setUser(data))
            .catch(err => console.error(err))
    }, [])


    return (

        <Container>
            <div className='detailsUser'>
                <Col md={{ span: 7, offset: 3 }}>
                    <img src={user.image || '/images/usuario.jpg'} style={{ width: '40%', textAlign: 'center' }} />
                </Col>
                <h1 className="mb-4">Detalles de {user.firstName} {user.lastName}</h1>
                <hr />

                <Row>

                    <Col md={{ span: 7, offset: 3 }}>
                        <h3>Email: </h3>
                        <p>{user.email}</p>
                        <h3>Telefono: </h3>
                        <p>{user.phone}</p>
                        <h3>Rol: </h3>
                        <p>{user.role}</p>

                    </Col>


                    <Col md={{ span: 8, offset: 3 }}>
                        <Link to="/list-usuarios">
                            <Button as="figure" variant="dark">Volver a usuarios</Button>
                        </Link>
                    </Col>



                </Row>
            </div >

        </Container >
    )
}

export default UserDetailsPage