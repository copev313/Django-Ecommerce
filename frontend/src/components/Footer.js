import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">
                            <div>Copyright &copy; 2021 Boutsacado.</div>
                            <div>Logo and flavicon made by {' '}
                                <a href="https://www.flaticon.com/authors/darius-dan"
                                                  title="Darius Dan">Darius Dan</a> {/* and {' '}
                                <a href="https://www.flaticon.com/authors/good-ware"
                                   title="Good Ware">Good Ware</a> */} from {' '}
                                <a href="https://www.flaticon.com/" 
                                   title="Flaticon">flaticon.com</a>.
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default Footer
