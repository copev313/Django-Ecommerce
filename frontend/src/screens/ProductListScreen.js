import React, { /*useState,*/ useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProduct } from '../actions/productActions';


function ProductListScreen({ history , match }) {

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList )
    const { loading, error, products } = productList

    const productDelete = useSelector( state => state.productDelete )
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin


    useEffect( () => {
        // [CASE] User is Admin:
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo, successDelete])

    const deleteProductHandler = (id) => {
        // Confirmation Message:
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch( deleteProduct(id) )
        }
    }

    const createProductHandler = (product) => {
        // Create product 
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1 className="my-4">Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3 mt-3 mr-2 py-2" onclick={ createProductHandler } variant="info">
                        <i className=" fas fa-plus"></i>
                        <span className="pl-2 h6">
                            <strong>Create Product</strong>
                        </span>
                    </Button>
                </Col>
            </Row>

            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant="danger">{ errorDelete }</Message> }

            { loading ? ( <Loader /> ) :
                error ? ( <Message variant='danger'>{ error }</Message> ) 
                    : (
                        <Table  stripped bordered hover responsive
                                className="table table-sm"
                        >
                            <thead>
                                <tr>
                                    <th className="pl-2">ID</th>
                                    <th className="pl-2">NAME</th>
                                    <th className="pl-2">PRICE</th>
                                    <th className="pl-2">CATEGORY</th>
                                    <th className="pl-2">BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                { products.map( product => (
                                    <tr key={ product._id }>
                                        <td className="pt-3 pl-2">{ product._id }</td>
                                        <td className="pt-3 pl-2">{ product.name }</td>
                                        <td className="pt-3 pl-2">${ product.price }</td>
                                        <td className="pt-3 pl-2">{ product.category }</td>
                                        <td className="pt-3 pl-2">{ product.brand }</td>

                                        <td className="">
                                            <LinkContainer to={`/admin/product/${ product._id }/edit`}>
                                                <Button variant="primary"
                                                        className="btn-sm mx-2 px-3">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant="danger"
                                                    className="btn-sm mx-2 px-3"
                                                    onClick={ () => deleteProductHandler(product._id) }>
                                                <i className="far fa-trash-alt"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}


export default ProductListScreen;
