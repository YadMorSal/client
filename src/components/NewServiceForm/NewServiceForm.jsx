import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import uploadServices from "../../services/upload.services";
import FormError from "../FormError/FormError";
import servicesServices from './../../services/services.services';
import './NewServiceForm.css'



const NewServiceForm = () => {
    const allowedCategories = ['Electricidad', 'Fontanería', 'Carpintería', 'Pequeños arreglos', 'Mantenimiento', 'Pintura', 'Montaje de muebles', 'Otros'];
    const [serviceData, setServiceData] = useState({
        title: '',
        description: '',
        prize: 0,
        location: '',
        category: [],
        image: '',
        phone: '',


    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()


    const handleInputChange = e => {
        const { value, name } = e.target
        setServiceData({ ...serviceData, [name]: value })
    }

    const handleServiceSubmit = e => {

        e.preventDefault()

        servicesServices
            .saveService(serviceData)
            .then(({ data }) => {
                navigate("/servicios")
            })
            .catch(err => {
                setErrors(err.response.data.errorMessage)
            })
    }
    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setServiceData({ ...serviceData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }

    return (
        <div className="FormService">
            <Form onSubmit={handleServiceSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-2" controlId="title">
                        <Form.Label className="col-sm-12 col-form-label">Titulo</Form.Label>
                        <Form.Control type="text" name="title" value={serviceData.title} onChange={handleInputChange} className="form-control" />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} className="form-control" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control as="select" name="category" value={serviceData.category} onChange={handleInputChange} className="form-control">
                            <option value="">Selecciona una categoría</option>
                            {allowedCategories.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="location">
                        <Form.Label>Localización </Form.Label>
                        <Form.Control type="text" name="location" value={serviceData.location} onChange={handleInputChange} className="form-control" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="text" name="phone" value={serviceData.phone} onChange={handleInputChange} className="col-12" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="prize">
                        <Form.Label>Precio/hora</Form.Label>
                        <Form.Control type="number" name="prize" value={serviceData.prize} onChange={handleInputChange} className="col-8" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="description">
                        <Form.Label className="col-sm-12 col-form-label"> Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={serviceData.description} onChange={handleInputChange} className="form-control" />
                    </Form.Group>
                </Row>
                {errors?.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                <Button variant="dark" type="submit" disable={!loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Crear Anuncio'}</Button>
            </Form>
        </div >
    );
}

export default NewServiceForm