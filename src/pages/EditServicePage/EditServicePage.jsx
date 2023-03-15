import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EditService from '../../components/EditService/EditService'
import '../EditServicePage/EditServicePage.css'

const EditServicePage = () => {

    const { service_id } = useParams()

    return (
        <div className='Editservice'>
            <Container className="my-container">

                <h1>Editar Anuncio</h1>
                <hr />
                <EditService service_id={service_id} />

            </Container>
        </div>
    )
}

export default EditServicePage