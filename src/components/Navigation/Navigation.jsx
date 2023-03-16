import { useContext, useEffect } from 'react'
import { Container, Navbar, Nav, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {


    const { user, logout } = useContext(AuthContext)

    return (


        <Navbar expand="md" className='mb-4' style={{ backgroundColor: '#639419', zIndex: 100, position: 'fixed', top: 0, left: 0, right: 0 }}>
            <Container>
                <Navbar.Brand >3DM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <Nav.Link as="span">Inicio</Nav.Link>
                        </Link>
                        <Link to="/info-pagina">
                            <Nav.Link as="span">Informacion 3DM</Nav.Link>
                        </Link>
                        <Link to="/servicios">
                            <Nav.Link as="span">Nuestros anuncios</Nav.Link>
                        </Link>
                        {
                            (user?.role === 'adver' || user?.role === 'admin')
                            &&
                            <Link to="/crear">
                                <Nav.Link as="span">Crear Anuncio</Nav.Link>
                            </Link>
                        }
                        {
                            user?.role === 'admin'
                            &&
                            <Link to="/list-usuarios ">
                                <Nav.Link as="span">Lista de Usuarios</Nav.Link>
                            </Link>
                        }

                        {
                            user
                                ?
                                <><Link to="/perfil">
                                    <Nav.Link as="span">Perfil</Nav.Link>
                                </Link>
                                    <Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link>


                                </>
                                :
                                <>
                                    <Link className="mr-auto" to="/iniciar-sesion">
                                        <Nav.Link as="span">Iniciar sesión</Nav.Link>
                                    </Link>
                                    <Link className="mr-auto" to="/registro">
                                        <Nav.Link as="span">Registrarme</Nav.Link>
                                    </Link>

                                </>
                        }
                    </Nav>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation