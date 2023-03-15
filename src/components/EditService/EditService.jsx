import React, { useState, useEffect } from "react"
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import servicesServices from './../../services/services.services'
import { useNavigate } from "react-router-dom";
import uploadServices from "../../services/upload.services";
const EditService = ({ service_id }) => {

    const [service, setService] = useState({
        title: "",
        description: "",
        image: "",
        prize: "",
        location: "",
        annuncement: "",
        category: ""
    })
    const allowedCategories = ['Electricidad', 'Fontanería', 'Carpintería', 'Pequeños arreglos', 'Mantenimiento', 'Pintura', 'Montaje de muebles', 'Otros'];
    const [loadingImage, setLoadingImage] = useState(false)
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        servicesServices
            .getOneServices(service_id)
            .then(({ data }) => setService(data))
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()
    const handleInputChange = e => {
        const { value, name } = e.target
        setService({ ...service, [name]: value })
    }

    const handleServiceSubmit = e => {

        e.preventDefault()
        servicesServices
            .editService(service._id, service)
            .then(({ data }) => {
                navigate("/servicios")
            })
            .catch(err => console.log(err))
    }
    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setService({ ...service, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }


    return (
        < Container>
            <Form onSubmit={handleServiceSubmit}>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" name="title" value={service.title} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} className="form-control" />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control as="select" name="category" value={service.category} onChange={handleInputChange}>
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
                        <Form.Control type="text" name="location" value={service.location} onChange={handleInputChange} />
                    </Form.Group>
                </Row>

                <Form.Group as={Col} className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={service.description} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="prize">
                    <Form.Label>Precio/hora</Form.Label>
                    <Form.Control type="number" name="prize" value={service.prize} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="prize">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" name="phone" value={service.phone} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="dark" type="submit" > 'Editar Anuncio'</Button>
            </Form>
        </Container>

    )
}

export default EditService
