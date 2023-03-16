import { useContext, useEffect } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ServiceCard.css'
import { AuthContext } from './../../contexts/auth.context'
import { useNavigate } from "react-router-dom"
import servicesService from '../../services/services.services'
import ListGroup from 'react-bootstrap/ListGroup';






const ServiceCard = ({ image, title, _id, owner, prize }) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const deleteService = (id) => {
        servicesService
            .deleteService(id)
            .then(() => {
                navigate('/servicios')
            })
    }

    return (




        <Card className="ServiceCard m-3" style={{ minWidth: '14rem', width: '100%' }}>

            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>


            </Card.Body>
            <ListGroup className="list-group-flush">

                <ListGroup.Item>{prize} €/hora</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <ButtonGroup style={{ width: '100%' }}>
                    <Link to={`/detalles/${_id}`} className="btn btn-dark btn-sm">Detalles</Link>
                    {
                        (user?._id === owner || user?.role === 'admin') &&
                        <>
                            <Link to={`/services/${_id}/edit`} className="btn btn-dark btn-sm">Editar</Link>
                            <Link to={`/services/${_id}/delete`} className="btn btn-dark btn-sm" onClick={() => deleteService(_id)}
                            >Borrar</Link>
                        </>
                    }
                </ButtonGroup>


            </Card.Body>
        </Card>

    );
}








export default (ServiceCard);