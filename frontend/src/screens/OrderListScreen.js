import React, { /*useState,*/ useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../actions/orderActions';
import { userLogin } from '../actions/userActions';


function OrderListScreen({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector( state => state.orderList )
    const { loading, error, orders } = orderList

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin


    useEffect( () => {
        // [CASE] User is Admin:
        if (userInfo && userInfo.isAdmin) {
            dispatch( listOrders() )
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])


    const formatTimestamp = (timestamp) => {
        const date = timestamp.substring(0, 10)
        const [year, month, day] = [date.substring(0, 4), date.substring(5,7), date.substring(8, 10)]
        const dateFormatted = `${month}-${day}-${year}`
        const time = timestamp.substring(11, 19)
        const hours = Number(time.substring(0,2))
        const hoursFormatted = (hours > 12) ? hours - 12 : hours
        const timeFormatted = `${hoursFormatted}${time.substring(2)}`
        return `${dateFormatted} @ ${timeFormatted} ${ (hours > 12) ? 'PM' : 'AM'} (UTC)`
    }

    const zeroPadding = (num) => ('00000'+num).slice(-5)


    return (
        <div>
            <h1 className="my-4 fw-500">Orders</h1>

            { loading ? ( <Loader /> ) :
                error ? ( <Message variant='danger'>{ error }</Message> ) 
                    : (
                        <Table  striped bordered hover responsive
                                className="table-sm"
                        >
                            <thead className="thead-light">
                                <tr>
                                    <th className="pl-2">NO.</th>
                                    <th className="pl-2">USER</th>
                                    <th className="pl-2">DATE</th>
                                    <th className="pl-2">TOTAL</th>
                                    <th className="text-center">PAID</th>
                                    <th className="text-center">DELIVERED</th>
                                    {/* <th className="m-0 p-0"></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                { orders.map( order => (
                                    <tr key={ order._id }>
                                        <td className="pt-3 pl-2 fw-500 custom-lime">
                                            <a 
                                                href={`/order/${ order._id }`}
                                                className="custom-lime"
                                                target="_blank" rel="noreferrer"
                                            >
                                                { zeroPadding( order._id ) }
                                            </a>
                                        </td>
                                        <td className="pt-3 pl-2">{ order.user && order.user.name }</td>
                                        <td className="pt-3 pl-2">{ formatTimestamp(order.createdAt) }</td>
                                        <td className="pt-3 pl-2">${ order.totalPrice }</td>
                                        <td className="h4 pt-2 px-4 text-center">{ order.isPaid ? (
                                            <i className="fas fa-handshake" style={{ color: "#00CC00" }}></i>
                                        ) : (
                                            <i className="fas fa-handshake-slash" style={{ color: "#C1121F" }}></i>
                                        )}
                                        </td>

                                        <td className="h4 pt-2 text-center">{ order.isDelivered ? (
                                            <i className="fas fa-box" style={{ color: "#008000" }}></i>
                                        ) : (
                                            <i className="fas fa-box-open" style={{ color: "#995609" }}></i>
                                        )}
                                        </td>
                                    {/*
                                        <td className="mx-0 text-center">
                                            <LinkContainer to={`/order/${ order._id }`}>
                                                <Button variant="outline-dark"
                                                        className="btn-sm mx-2 px-3">
                                                    <strong>Details</strong>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}


export default OrderListScreen;
