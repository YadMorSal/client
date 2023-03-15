import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import InfoPage from "../pages/InfoPage/InfoPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import NewServicePage from "../pages/NewServicePage/NewServicePage"
import ServiceDetailsPage from "../pages/ServiceDetailsPage/ServiceDetailsPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import ServiceListPage from "../pages/ServicesListPage/ServiceListPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import EditServicePage from "../pages/EditServicePage/EditServicePage"
import UserListPage from "../pages/UsersListPage/UserListPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import UserDetailsPage from "../pages/UserDetailsPage/UserDetailsPage"
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/info-pagina" element={<InfoPage />} />
            <Route path="/servicios" element={<ServiceListPage />} />
            <Route path="/detalles/:service_id" element={<ServiceDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/crear" element={<NewServicePage />} />
                <Route exact path="/services/:service_id/edit" element={<EditServicePage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/list-usuarios" element={<UserListPage />} />
                <Route path="/detallesUsuario/:user_id" element={<UserDetailsPage />} />
                <Route path="/users/:user_id/edit" element={<EditUserPage />} />
                <Route path="/editar_perfil/:perfil_id" element={<EditProfilePage />} />
            </Route>

            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes