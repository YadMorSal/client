import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import UsersList from "../../components/UserList/UserList"
import './UserListPage.css'

import userService from "../../services/user.services"


const UsersListPage = () => {

    // const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = () => {
        userService
            .getUsers()
            .then(({ data }) => {
                setUsers(data)
                setIsLoading(false)
                console.log(data)
            })

            .catch(err => console.log(err))
    }



    return (

        <div className="listUser">
            <UsersList users={users} />
        </div>
    )
}

export default UsersListPage