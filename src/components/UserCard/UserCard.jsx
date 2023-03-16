import { useContext, useEffect } from 'react'
import { Card, ButtonGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UserCard.css'
import { AuthContext } from './../../contexts/auth.context'
import { useNavigate } from "react-router-dom"
import userService from '../../services/user.services'
import './UserCard.css'


const UserCard = ({ firstName, lastName, email, phone, description, hourlyRate, image, role, _id }) => {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext)

    const deleteUser = (id) => {
        userService
            .deleteUser(id)
            .then(() => {
                logout()
                navigate('/list-usuarios')
            })
    }

    useEffect(() => {
        console.log(user)
    }, [user])


    return (
        <Link to={`/detallesUsuario/${_id}`}>
            <Card className="mb-2 UserCard">
                <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img className='imageUser' src={image} alt="user avatar" />

                    </div>
                    <hr />
                    <Card.Title>{firstName} {lastName}</Card.Title>
                    <Card.Text>
                        Email: {email}
                    </Card.Text>
                    <Card.Text>
                        Phone: {phone}<br />
                    </Card.Text>
                    <Card.Text>
                        Precio/hora: {hourlyRate}<br />
                    </Card.Text>
                    <Card.Text>
                        Role:{role}
                    </Card.Text>



                    {
                        user &&
                        <div >
                            {
                                (user._id === _id || user.role === 'admin') &&

                                <Link className='d-grid' to={`/users/${_id}/edit`}>
                                    <Button variant="dark" className="btn-warning ">Editar</Button>
                                </Link>
                            }
                            <Link className='d-grid' to={`/users/${_id}/delete`}>
                                <ButtonGroup onClick={() => deleteUser(_id)} className="w-100" style={{ marginTop: '10px' }}>
                                    {(user._id === _id || user.role === 'admin') && <Button variant="danger" >Eliminar</Button>}
                                </ButtonGroup>
                            </Link>
                        </div>
                    }
                </Card.Body>
            </Card>
        </Link >
    )
}





export default (UserCard);