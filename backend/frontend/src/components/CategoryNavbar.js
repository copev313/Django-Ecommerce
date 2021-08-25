import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav } from 'react-bootstrap';
//import { listProducts } from '../actions/productActions';


function CategoryNavbar() {
    return (
            <Navbar 
                expand="lg"
                bg="primary"
                variant="dark"
                
                className="my-0 py-0 ml-auto"
            >

                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="text-right"/>

                    <div className="mx-auto">
                    <Navbar.Collapse id="responsive-navbar-nav ">
                        <Nav>
                            <Nav.Link href="#" className="mx-2" >
                                <span className="cat-link">
                                    Featured
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#" className="mx-2" >
                                <span className="cat-link">
                                    New
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#home" className="mx-2" disabled>
                                <span className="cat-link">
                                    Home & Living
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#electronics" className="mx-2" disabled>
                                <span className="cat-link">
                                    Electronics
                                </span>
                            </Nav.Link>

                            <Nav.Link eventKey={2} href="#jewelry" className="mx-2" disabled>
                                <span className="cat-link">
                                    Jewelry
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#food" className="mx-2" disabled>
                                <span className="cat-link">
                                    Food & Drink
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#apparel" className="mx-2" disabled>
                                <span className="cat-link">
                                    Apparel
                                </span>
                            </Nav.Link>

                            <Nav.Link href="#beauty" className="mx-2" disabled>
                                <span className="cat-link">
                                    Beauty & Wellness
                                </span>
                            </Nav.Link>

                        {/*
                            <Nav.Link href="#" className="mx-2 ">
                                <span className="cat-link">
                                    Kids
                                </span>
                            </Nav.Link>
                        */}
                            <Nav.Link href="#" className="mx-2" disabled>
                                <span className="cat-link">
                                    Pets
                                </span>
                            </Nav.Link>

                        {/*
                            <Nav.Link href="#" className="mx-2 ">
                                <span className="cat-link">
                                    Party & Paper
                                </span>
                            </Nav.Link>
                        */}

                            <Nav.Link href="#other" className="mx-2" disabled>
                                <span className="cat-link">
                                    Other
                                </span>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
    )
}


export default CategoryNavbar
