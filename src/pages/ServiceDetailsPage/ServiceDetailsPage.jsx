import { useEffect, useState, useContext } from "react"
import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import servicesService from "./../../services/services.services"
import userService from "../../services/user.services"
import { AuthContext } from "../../contexts/auth.context"
import NewComment from "../../components/NewComment/NewComment"
import CommentList from "../../components/ComentList/ComentList"
import commentsService from "../../services/comments.services"
import "./ServiceDetailsPage.css"

const ServiceDetailsPage = () => {
    const [service, setService] = useState({})
    const { user } = useContext(AuthContext)
    const { service_id } = useParams()
    const [isFav, setIsFav] = useState(false)
    const [comments, setComments] = useState({})

    useEffect(() => {
        loadServiceData()

        userService
            .getOneUser(user?._id)
            .then(({ data }) => {
                const favServices = data.favoriteServices.map(elm => elm._id)
                if (favServices.includes(service_id)) {
                    setIsFav(true)
                }
            })
            .catch((err) => console.error(err))

    }, [service_id, user])

    const loadServiceData = () => {
        servicesService
            .getOneServices(service_id)
            .then(({ data }) => {
                setService(data)
            })
            .catch((err) => console.error(err));
    }

    const addToFav = () => {
        userService
            .addServiceToFav(service_id)
            .then(({ data }) => {
                console.log(data);
                setIsFav(true);
            })
            .catch((err) => console.log(err));
    };

    const removeFromFav = () => {
        userService
            .removeServiceFromFav(service_id)
            .then(({ data }) => {
                console.log(data);
                setIsFav(false);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        const storage = window.localStorage;
        if (isFav) {
            storage.setItem(service_id, "true")
        } else {
            storage.removeItem(service_id);
        }
    }, [isFav, service_id])



    const handleNewComment = (newComment) => {
        setComments([...comments, newComment])
    }


    return (
        <div className="DetailService">

            {service ? (
                <>
                    <Row className='detailTitle'>
                        <Col md={{ span: 6, offset: 1 }}>
                            <h1 className="mb-4"> {service.title}</h1>
                            <hr />
                        </Col>
                    </Row>
                    <Row className='details-details'>
                        <Col md={{ span: 6, offset: 1 }}>
                            <h3>Descripción</h3>
                            <p>{service.description}</p>
                            <h3>Localización</h3>
                            <p>{service.location}</p>
                            <h3>Teléfono de contacto</h3>
                            <p>{service.phone}</p>
                            <h3>Precio/hora</h3>
                            <p>{service.prize}€</p>
                            <hr />
                            <Link to="/servicios">
                                <Button as="figure" variant="dark">
                                    Volver a Servicios
                                </Button>
                            </Link>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <img src={service.image} style={{ width: "100%" }} />
                        </Col>
                    </Row>
                </>

            ) : (
                <Row>
                    <p>No hay servicio seleccionado</p>
                </Row>
            )}
            <div className='bottonFav'>
                {isFav ?

                    <Button as="figure" variant="warning" onClick={removeFromFav}>
                        Quitar de Favoritos
                    </Button>
                    :
                    <Button as="figure" variant="dark" onClick={addToFav}>
                        Añadir a Favoritos
                    </Button>

                }
            </div>
            <Row className="comments-details">
                <Col md={{ span: 6, offset: 1 }}>
                    <NewComment service_id={service_id} onNewComment={handleNewComment} loadServiceData={loadServiceData} />

                    <CommentList comments={service.comments} service_id={service_id} loadServiceData={loadServiceData} />
                </Col>
            </Row>





        </div>
    )

}
export default ServiceDetailsPage;