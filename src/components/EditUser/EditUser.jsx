import { useState, useContext, useEffect } from "react"
import { Form, Button, Col, Row } from "react-bootstrap"
import authService from "../../services/auth.services"
import FormError from "../FormError/FormError";
import { useNavigate } from 'react-router-dom'
import userServices from "./../../services/user.services"
import uploadServices from "../../services/upload.services";
const EditUser = ({ user_id }) => {

    const [currentUser, setCurrentUser] = useState({})
    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        description: '',
        hourlyRate: '',
        role: 'user',
        image: '',
    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [])

    // useEffect(() => {
    //     console.log("QUIEN ES ESTE SEÑOR??", user_id)
    // }, [user_id])

    const loadData = () => {
        userServices
            .getOneUser(user_id)
            .then(({ data }) => {
                setSignupData(data)
                setCurrentUser(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        if (currentUser._id === user_id || currentUser.role === 'admin') {
            userServices
                .editUser(user_id, signupData)
                .then(() => navigate('/list-usuarios'))
                .catch(({ response }) => setErrors(response.data.errorMessages))
        } else {
            console.log("No tiene permiso para editar este usuario.")
        }
    }
    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} className="mb-3" controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} className="form-control" />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="firstName">
                    <Form.Label>Nombre </Form.Label>
                    <Form.Control type="text" value={signupData.firstName} onChange={handleInputChange} name="firstName" required />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="lastName">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" required />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" required />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="phone">

                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" value={signupData.phone} onChange={handleInputChange} name="phone" required />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="phone">
                <Form.Label>Precio/hora</Form.Label>
                <Form.Control type="number" value={signupData.hourlyRate} onChange={handleInputChange} name="hourlyRate" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
                <Form.Label>Rol</Form.Label>
                <Form.Control as="select" value={signupData.role} onChange={handleInputChange} name="role" required>
                    <option value="user">Usuario</option>
                    <option value="adver">Anunciante</option>
                </Form.Control>
            </Form.Group>


            {errors?.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit">Editar mi perfil</Button>
            </div>

        </Form>
    )
}

export default EditUser