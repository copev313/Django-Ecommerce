import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
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
            { !keyword && <ProductCarousel /> }

            { loading ? (  

                <Container>
                    <br></br>
                    <Loader />
                </Container>

            ) : error ? ( 

                <Container>
                    <br></br>
                    <Message variant="danger">
                        { error }
                    </Message>
                </Container>

            ) : (products.length !== 0) ? ( 

                <Container className="px-5" >
                    <h2 id="home-screen-latest-title">
                        <ins>Latest Products</ins>
                    </h2>

                    <Row>
                        { products.map( (product) => (
                            <Col key={ product._id }
                                xs={12} sm={6} md={4} lg={3}
                            >
                                <Product product={ product } />
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex flex-row justify-content-center mt-3">
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                </Container>


            ) : (

                <Container>
                    <br></br>
                    <h2 id="home-screen-latest-title">
                        <ins>No Results</ins>
                    </h2>

                    <br></br>
                    <h4>
                        <span style={{fontWeight:500}}>No products found for search term: </span>
                         "{ keyword.substring(keyword.search("keyword=") + 8, keyword.search("&")) }"
                    </h4>
                </Container>

            )
        }

        </div>
    )
}


export default HomeScreen;
