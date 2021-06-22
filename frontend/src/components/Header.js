import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';


function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const usernameTruncate = (username, maxLength) => {
        if(username.length > maxLength && maxLength > 0) {
            username = username.substr(0, maxLength) + "..."
        }
        return username
    }

    const logoutHandler = () => {
        dispatch( logout() )
    }

    return (
        <header>
            <Navbar className="pt-3 pb-4"
                    bg="dark"
                    variant="dark"
                    expand="lg"
                    collapseOnSelect
                >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="mb-n4 mt-n2">
                            <span className="ml-n3">
                                <svg height="20%" width="20%" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg"><g><path d="m92.382 45.859v-.259a20.1 20.1 0 0 0 -20.1-20.1 20.1 20.1 0 0 0 -20.1 20.1v.265a26.282 26.282 0 0 1 -3.891 13.77 28.147 28.147 0 1 0 48.168.293 27.464 27.464 0 0 1 -4.077-14.069z" fill="#20cb79"/><path d="m83.7 56.177.092-.232a19.7 19.7 0 0 0 -11.092-25.545 19.7 19.7 0 0 0 -25.552 11.089l-.1.242a25.746 25.746 0 0 1 -8.5 11.15 27.576 27.576 0 1 0 43.8 17.585 26.9 26.9 0 0 1 1.352-14.289z" fill="#9ee587"/><path d="m55.126 95.5a20.58 20.58 0 0 1 -12.369-37.02 32.726 32.726 0 0 0 10.807-14.18l.095-.239a12.7 12.7 0 1 1 23.62 9.316l-.091.23a33.995 33.995 0 0 0 -1.747 18 20.584 20.584 0 0 1 -20.314 23.893z" fill="#d7fb85"/><circle cx="54.866" cy="75.595" fill="#b1705d" r="13.031"/><path d="m102.5 104.25h-77a1.75 1.75 0 0 1 0-3.5h77a1.75 1.75 0 0 1 0 3.5z" fill="#19a966"/><path d="m48.77 74.94a1.752 1.752 0 0 1 -1.628-2.393 8.316 8.316 0 0 1 10.772-4.677 1.75 1.75 0 0 1 -1.285 3.256 4.81 4.81 0 0 0 -6.229 2.706 1.751 1.751 0 0 1 -1.63 1.108z" fill="#e2ebf0"/></g></svg>
                            </span>
                            <span className="h3" id="website-navbar-title">Boutsacado</span>
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto col-md-4 mr-n2 pt-3" id="right-side-nav">

                            <LinkContainer to="/cart" id="cart-link-container">
                                <Nav.Link className="ml-n2 text-right font-weight-light">
                                    <span className="h6" >
                                        <i className="fas fa-shopping-cart"></i>{' '}
                                        CART
                                    </span>
                                </Nav.Link>
                            </LinkContainer>

                            {/* [CASE] User is logged in. Show email/username. Don't show LOGIN. */}
                            { userInfo ? (
                                <NavDropdown title={ usernameTruncate(userInfo.name, 12) }
                                            className="h5 align-text-top px-4"
                                            id="username-nav-dropdown"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <span className="h6">
                                                <i class="fas fa-user-circle pr-1"></i>{' '}
                                                PROFILE
                                            </span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item className="h6 mb-n1" onClick={ logoutHandler }>
                                        <span className="h6">
                                            <i class="fas fa-sign-out-alt pr-1"></i>{' '}
                                            LOGOUT
                                        </span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) :
                            (
                                <LinkContainer to="/login">
                                    <Nav.Link className="text-right font-weight-light ml-1">
                                        <span className="h6">
                                            <i className="fas fa-user"></i>{' '}
                                            LOGIN
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown    title="Admin"
                                                className="h5 align-text-top"
                                                id="admin-dropdown-menu"
                                >
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            <span className="h6">
                                                <i class="fas fa-users pr-1"></i>{' '}
                                                Users
                                            </span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            <span className="h6">
                                                <i class="fas fa-tags pr-1"></i>{' '}
                                                Products
                                            </span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            <span className="h6">
                                                <i class="fas fa-hand-holding-usd pr-1"></i>{' '}
                                                Orders
                                            </span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
        </header>
    )
}


export default Header;
