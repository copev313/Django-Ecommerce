import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import GrowingLoader from '../components/GrowingLoader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [featured, setFeatured] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector( state => state.productDetails )
    const { error, loading, product } = productDetails

    const productUpdate = useSelector( state => state.productUpdate )
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate
    } = productUpdate

    useEffect( () => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            setMessage("Product successfully updated")
            /* history.push('/admin/productlist') */
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch( listProductDetails(productId) )
            }
            else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setFeatured(product.featured)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            featured,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (error) {
            setUploading(false)
        }
    }


    return ( 
            <div>
                <Link to="/admin/productlist" className="btn btn-dark mt-3">
                    Go Back
                </Link>

                <FormContainer>
                    {/* Handle Error Messages & Successful Updates*/}
                    { message &&
                        <Alert 
                            variant="success"
                            onClose={() => setMessage('')}
                            dismissible
                            className="text-center fw-500"
                        >
                            { message }
                        </Alert>
                    }

                    <h2 className="p-0" id="edit-user-title">
                    <i className="fas fa-edit" style={{ fontSize: "1.25em", padding: "10px" }}></i> {' '}
                        Edit Product
                    </h2>

                    { loadingUpdate && <Loader /> }
                    { errorUpdate && <Message variant="danger">{ errorUpdate }</Message>}

                    { loading ? ( <Loader /> ) :
                        error ? ( <Message variant="danger">{ error }</Message> 
                    ) : (
                            <Form onSubmit={ submitHandler } >

                                <Form.Group controlId="name" className="mt-4" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        className={ name ? "" : "is-invalid" }
                                        value={ name }
                                        onChange={ (e) => setName(e.target.value) }
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Product name is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            <Row>
                                <Col>
                                    <Form.Group controlId="price" className="pr-2 mr-auto">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter price"
                                            className={ price >= 0 ? "" : "is-invalid" }
                                            value={ price }
                                            onChange={ (e) => setPrice(e.target.value) }
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            A positive price value is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="countInStock" className="mx-auto">
                                        <Form.Label>Stock Level</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter stock level"
                                            className={ countInStock >= 0 ? "" : "is-invalid" }
                                            value={ countInStock }
                                            onChange={ (e) => setCountInStock(e.target.value) }
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            A valid stock level is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        

                                <Form.Group controlId="image" >
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter an image"
                                        value={ image }
                                        onChange={ (e) => setImage(e.target.value) }
                                    >
                                    </Form.Control>

                                    <Form.File
                                        id="image-file"
                                        label="Choose File"
                                        custom
                                        onChange={ uploadFileHandler }
                                    >
                                    </Form.File>

                                    { uploading && <GrowingLoader /> }

                                </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="category" className="pr-2 mr-2">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            aria-label="Select product category"
                                            value={ category }
                                            className={ category ? "" : "is-invalid" }
                                            onChange={ (e) => setCategory(e.target.value) }
                                        >   
                                            <option>Select a category...</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Home">Home</option>
                                            <option value="Jewelry">Jewelry</option>
                                            <option value="Kitchen">Kitchen</option>
                                            <option value="Apparel">Apparel</option>
                                            <option value="Other">Other</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a category.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="brand" className="mx-auto">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter brand"
                                            value={ brand }
                                            onChange={ (e) => setBrand(e.target.value) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                                <Form.Group controlId="featured" className="">
                                    <Form.Check
                                        className="mt-4 mr-4 text-right text-info font-weight-bold"
                                        type="switch"
                                        label="Featured Product"
                                        checked={ featured }
                                        onChange={ () => setFeatured(!featured) }
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Form.Group controlId="description" className="mt-4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter a description"
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
