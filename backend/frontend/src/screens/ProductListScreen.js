import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {
    listProducts,
    deleteProduct,
    createProduct 
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';


function ProductListScreen({ history , match }) {

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList )
    const {
        loading,
        error,
        products,
        pages,
        page
    } = productList

    const productDelete = useSelector( state => state.productDelete )
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete

    const productCreate = useSelector( state => state.productCreate )
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    let keyword = history.location.search


    useEffect( () => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        // [CASE] User is NOT Admin:
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        // [CASE] Product was created:
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        // [CASE] A new product was not created:
        else {
            dispatch( listProducts(keyword) )
        }

    }, [dispatch, history, userInfo, successDelete,
        successCreate, createdProduct, keyword])

    const deleteProductHandler = (id) => {
        // Confirmation Message:
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch( deleteProduct(id) )
        }
    }

    const createProductHandler = () => {
        dispatch( createProduct() )
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1 className="my-4 fw-500">Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3 mt-3 mr-2 py-2" onClick={ createProductHandler } variant="info">
                        <i className=" fas fa-plus"></i>
                        <span className="pl-2 h6">
                            <strong>Create Product</strong>
                        </span>
                    </Button>
                </Col>
            </Row>

            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant="danger">{ errorDelete }</Message> }

            { loadingCreate && <Loader /> }
            { errorCreate && <Message variant="danger">{ errorCreate }</Message> }

            { loading ? ( <Loader /> ) :
                error ? ( <Message variant='danger'>{ error }</Message> ) 
                    : (
                        <div>
                            <Table  bordered hover responsive
                                    className="table table-sm"
                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th className="pl-2">ID</th>
                                        <th className="pl-2">NAME</th>
                                        <th className="pl-2">PRICE</th>
                                        <th className="pl-2">STOCK</th>
                                        <th className="pl-2">CATEGORY</th>
                                        <th className="pl-2">BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { products.map( product => (
                                        <tr key={ product._id }>
                                            <td className="pt-3 pl-2">{ product._id }</td>
                                            <td className="pt-3 pl-2">
                                                <a 
                                                    href={`#/admin/product/${ product._id }/edit`}
                                                    className="custom-lime fw-500"
                                                >
                                                    { product.name }
                                                </a>
                                            </td>
                                            <td className="pt-3 pl-2">${ product.price }</td>
                                            <td className="pt-3 pl-2">{ product.countInStock }</td>
                                            <td className="pt-3 pl-2">{ product.category }</td>
                                            <td className="pt-3 pl-2">{ product.brand }</td>

                                            <td className="mx-0 text-center">
                                                <a href={`#/product/${ product._id }`} target="_blank" rel="noreferrer" >
                                                    <Button variant="outline-secondary"
                                                            className="btn-sm mx-2 px-3"
                                                    >
                                                        <i className="fas fa-eye" style={{ fontSize: "1.2em", paddingTop: "5px" }}></i>
                                                    </Button>
                                                </a>

                                                <Button variant="outline-danger"
                                                        className="btn-sm px-3"
                                                        onClick={ () => deleteProductHandler(product._id) }>
                                                    <i className="far fa-trash-alt" style={{ fontSize: "1.2em", paddingTop: "5px" }}></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex flex-row justify-content-center mt-3">                            
                                <Paginate pages={pages} page={page} isAdmin={true} />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}


export default ProductListScreen;
