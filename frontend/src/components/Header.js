import React from 'react'
import { Navbar, Nav, Container, Row, } from 'react-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Boutsacado</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart">
                                <i className="fas fa-shopping-cart pr-1"></i>
                                Cart
                            </Nav.Link>

                            <Nav.Link className="pl-3" href="/login">
                                <i className="fas fa-user pr-1"></i>
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
