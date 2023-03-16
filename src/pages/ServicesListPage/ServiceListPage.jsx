import { useEffect, useState } from "react"
import { Button, Dropdown, DropdownButton, Row, Col, ButtonGroup } from "react-bootstrap"
import ServicesList from "../../components/ServicesList/ServicesList"
import servicesService from "../../services/services.services"
import './ServiceListPage.css'

const ServicesListPage = () => {

    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = () => {
        servicesService
            .getServices()
            .then(({ data }) => {
                setServices(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const displayCategorySearch = (query) => {
        servicesService
            .getCategoryServices(query)
            .then(({ data }) => {
                setServices(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="page-container">
            <Row className="button-container" style={{ marginTop: '80px' }} sm={{ span: 12 }}>
                <Col xs={12} md={3}>
                    <DropdownButton as={ButtonGroup} variant="dark" title="Categorías">
                        <Dropdown.Item onClick={() => displayCategorySearch('Mantenimiento')} >Mantenimiento</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Carpintería')} >Carpintería</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Electricidad')} >Electricidad</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Fontanería')} >Fontanería</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Pintura')} >Pintura</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Montaje de muebles')} >Montaje de muebles</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Pequeños arreglos')} >Pequeños arreglos</Dropdown.Item>
                        <Dropdown.Item onClick={() => displayCategorySearch('Otros')} >Otros</Dropdown.Item>
                    </DropdownButton>
                </Col>

                <Col xs={10} md={7} className="Services">
                    <ServicesList services={services} />
                </Col>
            </Row>
        </div>
    )
}

export default ServicesListPage
