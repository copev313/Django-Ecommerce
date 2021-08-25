import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import GrowingLoader from './GrowingLoader';
import Message from './Message';
import { listFeaturedProducts } from '../actions/productActions';


function ProductCarousel() {

    const dispatch = useDispatch()

    const productFeatured = useSelector( state => state.productFeatured )
    const { error, loading, products } = productFeatured

    useEffect(() => {

        dispatch( listFeaturedProducts() )
    }, [dispatch])


    return  ( loading ? <GrowingLoader /> :
                error ? <Message variant="danger">{ error }</Message> :
                (
                    <Carousel
                        pause="hover"
                        indicators={false}
                        className="mb-3 pt-4"
                    >
                        { products.map( (product) => (
                            <Carousel.Item key={ product._id } >
                                    <Link to={`/product/${ product._id }`}>
                                        <Image 
                                            src={ product.image }
                                            alt={ product.name }
                                            fluid  thumbnail
                                            className="p-1 bg-primary border-0"
                                            style={{ borderRadius: '15px'}}
                                        />
                                        <Carousel.Caption className="carousel.caption " >
                                            <div 
                                                className="d-inline-block bg-dark text-white pt-1 px-2"
                                                style={{ borderRadius: '5px', marginBottom: '15px' }}>
                                                <h4>
                                                    { product.name }
                                                </h4>
                                            </div>
                                        </Carousel.Caption>
                                    </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    )
}


export default ProductCarousel;
