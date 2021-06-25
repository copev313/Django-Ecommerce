import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';


function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    useEffect( () => {
        if (!product.name || product._id !== Number(productId)) {
                dispatch( listProductDetails(productId) )
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [dispatch, product, productId, history])

    const submitHandler = (e) => {
        e.preventDefault()
        // Update product
    }


    return ( 
            <div>
                <Link to="/admin/productlist" className="btn btn-dark my-4">
                    Go Back
                </Link>

                <FormContainer>
                    <h2 className="m-0 p-0" id="edit-user-title">Edit Product</h2>

                    { loading ? ( <Loader /> ) :
                        error ? ( <Message variant="danger">{ error }</Message> 
                    ) : (
                            <Form onSubmit={ submitHandler }>
                                <Form.Group controlId="name" className="mt-4" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        className={ name ? "is-valid" : "is-invalid" }
                                        value={ name }
                                        onChange={ (e) => setName(e.target.value) }
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Product name is required.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="price" className="mt-4">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter price"
                                        className={ price >= 0 ? "is-valid" : "is-invalid" }
                                        value={ price }
                                        onChange={ (e) => setPrice(e.target.value) }
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        A valid price is required.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="image" className="mt-4">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter an image"
                                        value={ image }
                                        onChange={ (e) => setImage(e.target.value) }
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="category" className="mt-4">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        className={ category ? "is-valid" : "is-invalid" }
                                        value={ category }
                                        onChange={ (e) => setCategory(e.target.value) }
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a category.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="brand" className="mt-4">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter brand"
                                        value={ brand }
                                        onChange={ (e) => setBrand(e.target.value) }
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group controlId="countInStock" className="mt-4">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter stock level"
                                        className={ countInStock >= 0 ? "is-valid" : "is-invalid" }
                                        value={ countInStock }
                                        onChange={ (e) => setCountInStock(e.target.value) }
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        A valid stock level is required.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="description" className="mt-4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={ description }
                                        onChange={ (e) => setDescription(e.target.value) }
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Row className="d-flex flex-row-reverse mr-2 mb-2">
                                    <Button 
                                        type="submit"
                                        variant="success"
                                        className="btn ml-4 mt-2 px-3"
                                    >
                                        <span className="h6">
                                            <strong>Save</strong>
                                        </span>
                                    </Button>
                                </Row>
                            </Form>
                    )
                }
                </FormContainer>
            </div>
    )
}


export default ProductEditScreen;
