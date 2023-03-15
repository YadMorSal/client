import { Container } from 'react-bootstrap'
import NewServiceForm from '../../components/NewServiceForm/NewServiceForm'
import '../NewServicePage/NewServicePage.css'
const NewServicePage = () => {

    return (
        <div className='NewService'>
            <h1 className='titleAdver'>Nuevo anuncio</h1>
            <Container className="my-Newcontainer">
                <hr />
                <NewServiceForm />
            </Container>
        </div>
    )
}

export default NewServicePage