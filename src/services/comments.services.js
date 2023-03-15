import axios from 'axios'

class CommentsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    newComment(service_id, commentData) {
        return this.api.post(`/newComment/${service_id}`, commentData)
    }

    deleteComment(service_id, comment_id) {
        return this.api.delete(`/delete/${service_id}/${comment_id}`)
    }


}

const commentsService = new CommentsService()

export default commentsService