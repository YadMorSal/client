import { useContext } from "react"
import userServices from "../../services/user.services"
import React, { useState, useEffect } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Card, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ServiceCard from "../../components/ServiceCard/ServiceCard"
import userService from '../../services/user.services'
import { useNavigate } from "react-router-dom"
import './ProfilePage.css'
import EditProfileForm from '../../components/EditPofileForm/EditProfileForm'
const ProfilePage = ({ user_id }) => {
    const { user, logout } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();

    const deleteUser = (id) => {
        userService
            .deleteUser(id)
            .then(() => {
                logout()
                navigate('/iniciar-sesion')
            })
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        userServices
            .getOneUser(user._id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }

    const getServiceName = (service_Id) => {
        const services = [];
        const service = services.find((s) => s._id === service_Id);
        return service ? service.name : 'Servicio desconocido';
    };

    console.log(userData.favoriteServices)

    return (

        <div className="profile-container" style={{ textAlign: " center" }}>
            < h1 > Bienvenido {user.firstName}, este es tu perfil</h1 >
            <Container>
                <Row>
                    <div className="row profiled">
                        <div className="col">
                            <div className="mx-auto">
                                <Card className=" text-center">
                                    <Card.Body>
                                        <Card.Title>TU INFORMACIÓN DE CONTACTO</Card.Title>
                                        <hr />
                                        <Card.Text className='perfil'>
                                            <img src={userData.image} alt="" />
                                            <hr />
                                            <h5>Nombre:</h5>
                                            <p> {userData.firstName} {userData.lastName}</p>
                                            <h5> Correo electrónico:</h5>
                                            <p> {userData.email}</p>
                                            <h5>Teléfono:</h5>
                                            <p> {userData.phone}</p>
                                            <h5>Role:</h5>
                                            <p> {userData.role}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="d-grid">
                                            <Link className='d-grid' to={`/users/${user._id}/edit`}>
                                                <Button variant="dark">Editar mi perfil</Button>
                                            </Link>
                                        </div>
                                        <div className="d-grid">
                                            <Button variant="danger" onClick={() => deleteUser(userData._id)}>Eliminar mi cuenta</Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Row>
                <hr />
                <Row>
                    <h3 className=" text-center">Favoritos</h3>
                    <hr />
                    <div className="row favorites ">

                        <div className="col text-favorite">
                            {userData.favoriteServices && userData.favoriteServices.length > 0 ? (
                                <>

                                    <div className="row">
                                        {userData.favoriteServices.map((service) => (
                                            <div className="col  mb-2  ">
                                                <ServiceCard {...service} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p>No tienes servicios favoritos aún.</p>
                            )}

                        </div>
                    </div>
                </Row>
            </Container >
        </div >
    );

};

export default ProfilePage;