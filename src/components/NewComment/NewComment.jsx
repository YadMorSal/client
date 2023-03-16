import { useState, useContext, useEffect } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import commentsService from "../../services/comments.services"
import { AuthContext } from "../../contexts/auth.context"
const NewComment = ({ service_id, onNewComment, loadServiceData }) => {

    const [commentData, setCommentData] = useState({
        comment: ''
    })
    const { user } = useContext(AuthContext);
    useEffect(() => {
        loadServiceData()
    }, [commentData])

    const handleInputChange = e => {
        const { value, name } = e.target
        setCommentData({ ...commentData, [name]: value })
    }



    const handleSubmit = e => {

        e.preventDefault()

        commentsService
            .newComment(service_id, commentData)
            .then(({ data }) => {
                setCommentData({ comment: '' });
                onNewComment(data)
            })
            .catch(err => console.log(err))
    }

    if (!user) {
        return (
            <Alert variant="warning">
                Debe estar conectado para escribir un comentario
            </Alert>
        );
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Hacer un Comentario</Form.Label>
                <Form.Control type="text" value={commentData.comment} onChange={handleInputChange} name="comment" style={{ width: '80%' }} />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Enviar Comentario</Button>
            </div>

        </Form>
    )


}

export default NewComment