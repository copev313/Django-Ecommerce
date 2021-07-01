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
                        className="rounded-bottom mb-3"
                    >
                        { products.map( (product) => (
                            <Carousel.Item key={ product._id }>
                                <Link to={`/product/${ product._id }`} >
                                    <Image 
                                        src={ product.image }
                                        alt={ product.name }
                                        fluid
                                    />
                                    <Carousel.Caption className="carousel.caption" >
                                        <h4>{ product.name }</h4>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}

                    </Carousel>
                )
    )
}


export default ProductCarousel;
