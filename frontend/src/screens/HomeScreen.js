import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';


function HomeScreen() {
    const productList = useSelector( state => state.productList )
    const { error, loading, products } = productList
    const dispatch = useDispatch()

    useEffect( () => { dispatch(listProducts()) }, [dispatch] )


    return (
        <div>
            <h2 id="home-screen-latest-title">
                <ins>Latest Products</ins>
            </h2>
            { loading ? (  <div>
                                <br></br>
                                <Loader />
                            </div>
            )
            : error ? ( <div>
                            <br></br>
                            <Message variant="danger">
                                { error }
                            </Message>
                        </div>
            )
            : ( <Row>
                    { products.map( (product) => (
                        <Col key={ product._id }
                             sm={12} md={6} lg={4} xl={3}
                        >
                            <Product product={ product } />
                        </Col>
                    ))
                    }
                </Row>
            )}
        </div>
    )
}


export default HomeScreen;
