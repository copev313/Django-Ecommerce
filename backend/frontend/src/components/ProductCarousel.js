import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image, Container } from 'react-bootstrap';
import GrowingLoader from './GrowingLoader';
import { listFeaturedProducts } from '../actions/productActions';


function ProductCarousel() {

    const dispatch = useDispatch()

    const productFeatured = useSelector( state => state.productFeatured )
    const { error, loading, products } = productFeatured

    useEffect(() => {

        dispatch( listFeaturedProducts() )
    }, [dispatch])


    return  ( loading ? <Container><GrowingLoader /></Container>
                 :
                error ? 
                    <Container className="text-center my-3 p-2 opacity-75">
                        <svg id="Capa_1" enable-background="new 0 0 512 512" height="256" viewBox="0 0 512 512" width="256" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m148.07 103.614h21.444v-16.73c.001-47.985 38.9-86.884 86.884-86.884 47.244 0 85.653 37.715 86.828 84.676 22.255-15.853 53.338-13.811 73.302 6.152 17.878 17.878 21.38 44.675 10.534 66.063h24.693c33.272 0 60.245 26.973 60.245 60.245 0 33.272-26.973 60.245-60.245 60.245h-303.685c-47.984 0-86.884-38.899-86.884-86.884.001-47.984 38.9-86.883 86.884-86.883z" fill="#d6e8fd"/><path d="m363.93 261.277h-21.444v-16.73c0-47.985-38.899-86.884-86.884-86.884-47.244 0-85.653 37.715-86.828 84.676-22.255-15.853-53.338-13.811-73.302 6.152-17.878 17.878-21.38 44.675-10.534 66.063h-24.693c-33.273.001-60.245 26.973-60.245 60.245 0 33.272 26.972 60.245 60.245 60.245h303.685c47.984 0 86.884-38.899 86.884-86.884-.001-47.984-38.9-86.883-86.884-86.883z" fill="#edf5ff"/><g><path d="m451.755 156.892h-24.693c10.847-21.388 7.344-48.185-10.534-66.063-19.964-19.964-51.047-22.005-73.302-6.152-1.174-46.962-39.583-84.677-86.827-84.677-.133 0-.265.004-.398.005v277.377h195.755c33.272 0 60.245-26.973 60.245-60.245-.001-33.273-26.973-60.245-60.246-60.245z" fill="#b6dcfe"/></g><g><path d="m363.93 261.277h-21.444v-16.73c0-47.851-38.685-86.664-86.485-86.879v277.377h107.93c47.984 0 86.884-38.899 86.884-86.884-.002-47.985-38.901-86.884-86.885-86.884z" fill="#d6e8fd"/></g></g><g><g><path d="m256 512c-58.723 0-106.327-47.604-106.327-106.327s47.604-106.327 106.327-106.327 58.723 212.654 0 212.654z" fill="#fd657d"/></g><g><path d="m256 299.346v212.654c58.723 0 106.327-47.604 106.327-106.327s-47.604-106.327-106.327-106.327z" fill="#e43b54"/></g></g><path d="m256 384.46-18.007-18.056-21.154 21.213 18.007 18.056-18.007 18.057 21.154 21.212 18.007-18.056 8.176-21.213z" fill="#fed943"/><path d="m295.161 387.617-21.154-21.213-18.007 18.056v42.426l18.007 18.056 21.154-21.212-18.007-18.057z" fill="#fcbe2c"/></g></svg>
                    </Container>
                : (
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
