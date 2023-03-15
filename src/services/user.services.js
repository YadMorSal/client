import axios from 'axios'

class UserService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUsers() {
        return this.api.get('/getAllUsers')
    }
    getOneUser(user_id) {
        return this.api.get(`/getOneUser/${user_id}`)
    }
    editUser(user_id, data) {
        return this.api.put(`/editUser/${user_id}`, data)
    }
    addServiceToFav(service_id) {
        return this.api.put(`/addToFav/${service_id}`)
    }
    editProfile(user_id, data) {
        return this.api.put(`/editProfile/${user_id}`, data)
    }

    removeServiceFromFav(service_id) {
        return this.api.put(`/removeFromFav/${service_id}`)
    }
    deleteUser(user_id) {
        return this.api.delete(`/deleteUser/${user_id}`)
    }

}

const userService = new UserService()

export default userService