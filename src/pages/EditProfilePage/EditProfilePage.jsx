import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EditProfileForm from '../../components/EditPofileForm/EditProfileForm'

const EditProfilePage = () => {

    const { user_id } = useParams()


    return (
        <div className='EditUser mt-5'>
            <Container className='Container-Edit d-flex align-items-center justify-content-center'>
                <div className='Form-Container'>
                    <h1>Editar mi perfil</h1>
                    <hr />
                    <EditProfileForm user_id={user_id} />
                </div>

            </Container>
        </div>
    )
}

export default EditProfilePage