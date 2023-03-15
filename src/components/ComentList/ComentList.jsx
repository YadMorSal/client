import commentsService from "../../services/comments.services"
import './ComentList.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"


const CommentList = ({ comments, service_id, loadServiceData }) => {

    const { user } = useContext(AuthContext)


    const handleDeleteComment = (comment_id) => {
        commentsService
            .deleteComment(service_id, comment_id)
            .then(() => { loadServiceData() })
            .catch(err => console.log(err))
    }

    return (
        <section className="CommentList">
            {comments?.map(comment => (
                <div key={comment._id}>
                    <p>{comment.comment}</p>
                    {user?._id === comment.owner && <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>}
                </div>
            ))}
        </section>
    )
}

export default CommentList








