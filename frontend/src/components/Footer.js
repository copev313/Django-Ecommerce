import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {

    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <hr></hr>
                        <Col className="text-center py-3">
                            <hr></hr>
                            <div>Copyright &copy; 2021 Boutsacado.</div> 
                            <div>Logo created by {' '}
                                <a  href="https://www.flaticon.com/authors/darius-dan"
                                    title="Darius Dan">Darius Dan</a> from {' '}
                                <a  href="https://www.flaticon.com/" 
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
