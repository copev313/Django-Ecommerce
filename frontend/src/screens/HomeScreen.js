import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList );
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());

    }, [dispatch]);

    return (
        <div>
            <h2 className="mt-5">Latest Products</h2>

            { loading ? (  <div>
                                <br></br>
                                <h4>Loading . . .</h4>
                            </div>
            ) : error ? (   <div>
                                <br></br>
                                <h4>{error}</h4>
                            </div>
            ) : (   <Row>
                        {products.map( (product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                )
            }
        </div>
    );
}

export default HomeScreen;
