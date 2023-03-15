import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import ServicesList from "../../components/ServicesList/ServicesList"
import servicesService from "../../services/services.services"
import './ServiceListPage.css'
const ServicesListPage = () => {

    // const [showModal, setShowModal] = useState(false)
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
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="button-container" style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Electricidad')} >Electricidad</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Fontanería')} >Fontanería</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Carpintería')} >Carpintería</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Pequeños arreglos')} >Pequeños arreglos</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Mantenimiento')} >Mantenimiento</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Pintura')} >Pintura</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Montaje de muebles')} >Montaje de muebles</Button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Button style={{ backgroundColor: 'rgb(62, 61, 3)' }} onClick={() => displayCategorySearch('Otros')} >Otros</Button>
                    </div>
                </div>
                <div className="Services">
                    <ServicesList services={services} />
                </div>
            </div>
        </div>
    )

}

export default ServicesListPage


