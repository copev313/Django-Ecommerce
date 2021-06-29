import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';


function HomeScreen({ history }) {

    const productList = useSelector( state => state.productList )
    const { 
        error,
        loading,
        products,
        page,
        pages,

    } = productList

    const dispatch = useDispatch()

    let keyword = history.location.search

    useEffect(() => { 
        dispatch(listProducts(keyword)) 

    }, [dispatch, keyword] )


    return (
        <div>
            <h2 id="home-screen-latest-title">
                <ins>Latest Products</ins>
            </h2>
            { loading ? (  
                <div>
                    <br></br>
                    <Loader />
                </div>

            ) : error ? ( 
                <div>
                    <br></br>
                    <Message variant="danger">
                        { error }
                    </Message>
                </div>

            ) : ( 
                <div>
                    <Row>
                        { products.map( (product) => (
                            <Col key={ product._id }
                                sm={12} md={6} lg={4} xl={3}
                            >
                                <Product product={ product } />
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex flex-row justify-content-center mt-3">
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                </div>
            )}
        </div>
    )
}


export default HomeScreen;
