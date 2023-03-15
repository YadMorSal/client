import axios from 'axios'

class ServicesService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/services`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getServices() {
        return this.api.get('/getAllServices')
    }

    getCategoryServices(category) {
        return this.api.get(`/getCategoryServices?query=${category}`)
    }

    getOneServices(service_id) {
        return this.api.get(`/getOneService/${service_id}`)
    }

    saveService(serviceData) {
        return this.api.post('/saveService', serviceData)
    }
    editService(service_id, data) {
        return this.api.put(`/editService/${service_id}`, data)
    }
    deleteService(service_id) {
        return this.api.delete(`/deleteService/${service_id}`)
    }
}

const servicesService = new ServicesService()

export default servicesService