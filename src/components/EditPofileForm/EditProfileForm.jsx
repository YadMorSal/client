import { useState, } from "react"
import { Form, Button, Col, Row, InputGroup, Alert } from "react-bootstrap"

import { useNavigate } from 'react-router-dom'
import userServices from "./../../services/user.services"


const EditProfileForm = ({ user, onClose }) => {
    const [signupData, setSignupData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        phone: user.phone,
        description: user.description || '',
        hourlyRate: user.hourlyRate || '',
        role: user.role,
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = e => {
        const { value, name } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        userServices
            .editUser(user._id, signupData)
            .then(() => {
                onClose();
                navigate('/list-usuarios');
            })
            .catch(({ response }) => setErrors(response.data.errorMessages));
    };

    return (
        <div className="edit-profile-container">
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="firstName">
                        <Form.Label>Nombre </Form.Label>
                        <Form.Control type="text" value={signupData.firstName} onChange={handleInputChange} name="firstName" required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="lastName">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="text" value={signupData.phone} onChange={handleInputChange} name="phone" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control type="password" name="confirmPassword" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" value={signupData.description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="hourlyRate">
                        <Form.Label>Tarifa Hora</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control type="number" min="0" step="0.01" value={signupData.hourlyRate} onChange={handleInputChange} name="hourlyRate" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="role">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select value={signupData.role} onChange={handleInputChange} name="role" required>
                            <option value="">Seleccionar Rol</option>
                            <option value="USER">Usuario</option>
                            <option value="ADMIN">Administrador</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <div className="text-end">
                    <Button variant="secondary" onClick={onClose} className="me-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar Cambios
                    </Button>
                </div>

                {errors.length > 0 && (
                    <Alert variant="danger" className="mt-3">
                        <Alert.Heading>Error al guardar los cambios:</Alert.Heading>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}
            </Form>
        </div>
    )
}
export default EditProfileForm