import { useContext, useEffect } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ServiceCard.css'
import { AuthContext } from './../../contexts/auth.context'
import { useNavigate } from "react-router-dom"
import servicesService from '../../services/services.services'






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

        <Link to={`/detalles/${_id}`}>
            <Card className="mb-3 ServiceCard">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Title>{prize} €/hora</Card.Title>
                    {
                        user &&
                        <div className="d-flex flex-column align-items-center">
                            <Link to={`/services/${_id}/edit`}>
                                <ButtonGroup className="w-100" style={{ marginBottom: '10px' }}>
                                    {user._id === owner && <Button variant="warning" size="sm" className="btn-warning">Editar</Button>}
                                </ButtonGroup>
                            </Link>
                            <Link to={`/services/${_id}/delete`}>
                                <ButtonGroup onClick={() => deleteService(_id)} className="w-100" style={{ marginTop: '10px' }}>
                                    {user._id === owner && <Button variant="dark" size="sm">Eliminar</Button>}
                                </ButtonGroup>
                            </Link>
                        </div>
                    }
                </Card.Body>
            </Card>
        </Link >
    )

}





export default (ServiceCard);