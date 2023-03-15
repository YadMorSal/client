import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EditUser from '../../components/EditUser/EditUser'
import './EditUserPage.css'
const EditUserPage = () => {

    const { user_id } = useParams()


    return (
        <div className='EditUser mt-5'>
            <Container className='Container-Edit d-flex align-items-center justify-content-center'>
                <div className='Form-Container'>
                    <h1>Editar Usuario</h1>
                    <hr />
                    <EditUser user_id={user_id} />
                </div>

            </Container>
        </div>
    )
}

export default EditUserPage