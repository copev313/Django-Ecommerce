import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {

    return (
        <div>
            <hr></hr>
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center mb-3 mt-0">
                            <div><strong>Copyright &copy; 2021 Boutsacado</strong></div> 
                            <div>Logo created by {' '}
                                <a  href="https://www.flaticon.com/authors/darius-dan"
                                    style={{ color: "#8e8c84", fontWeight: "bold" }}
                                    title="Darius Dan">Darius Dan</a> from {' '}
                                <a  href="https://www.flaticon.com/"
                                    style={{ color: "#8e8c84" }}
                                    title="Flaticon">flaticon.com</a>.
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}


export default Footer;
