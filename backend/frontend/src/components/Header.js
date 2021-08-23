import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
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
                        <Navbar.Brand className="mr-5">
                            <img src="/images/default-monochrome-min.svg" alt="logo" id="main-logo" className="ml-2 mr-5" />
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-inline-block mx-auto">
                            <SearchBox className="ml-5" />
                        </div>
                        

                        <Nav className="ml-auto col-md-4 pt-3 text-right" id="right-side-nav">

                            <LinkContainer to="/cart" id="cart-link-container">
                                <Nav.Link className="ml-n2">
                                    <span className="h6">
                                        <i className="fas fa-shopping-cart"></i>{' '}
                                        <span className="fw-500">CART</span>
                                    </span>
                                </Nav.Link>
                            </LinkContainer>

                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown    title="Admin"
                                                className="h5"
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

                            {/* [CASE] User is logged in. Show email/username. Don't show LOGIN. */}
                            { userInfo ? (
                                <NavDropdown 
                                    title={ usernameTruncate(userInfo.name, 12) }
                                    className="h5"
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

                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="text-right font-weight-light ml-1">
                                        <span className="h6">
                                            <i className="fas fa-user"></i>{' '}
                                            LOGIN
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}


export default Header;
