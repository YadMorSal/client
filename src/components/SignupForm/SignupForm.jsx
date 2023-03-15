import { useState, useContext, useEffect } from "react"
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import authService from "../../services/auth.services"
import FormError from "../FormError/FormError";
import { useNavigate } from 'react-router-dom'
// import './SignupForm.css'
import uploadServices from "../../services/upload.services";

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        image: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        description: '',
        hourlyRate: '',
        role: 'user',
    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: name === 'role' ? value : value.trim() })
    }


    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/iniciar-sesion'))
            .catch(({ response }) => setErrors(response.data.errorMessages))
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
        <div className="bg-image d-flex justify-content-center">
            <Container>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group as={Col} className="mb-3" controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="firstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={signupData.firstName} onChange={handleInputChange} name="firstName" required className="form-control-lg" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="lastName">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" required className="form-control-lg" />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" required className="form-control-lg" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" required className="form-control-lg" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" value={signupData.phone} onChange={handleInputChange} name="phone" required className="form-control-lg" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="role">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control as="select" value={signupData.role} onChange={handleInputChange} name="role" required className="form-control-lg">
                            <option value="user">Usuario</option>
                            <option value="adver">Anunciante</option>
                        </Form.Control>
                    </Form.Group>
                    {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                    <div className="d-grid mt-3">
                        <Button variant="dark" type="submit">Registrarme</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}


export default SignupForm