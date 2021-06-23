import React, { /*useState,*/ useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions';


function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const userList = useSelector( state => state.userList )
    const { loading, error, users } = userList

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const userDelete = useSelector( state => state.userDelete )
    const { success: successDelete } = userDelete

    useEffect( () => {
        // [CASE] User is Admin:
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        // Confirmation Message:
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch( deleteUser(id) )
        }
    }

    return (
        <div>
            <h2 id="admin-user-list-title">Users</h2>

            { loading ? ( <Loader /> ) :
                error ? ( <Message variant='danger'>{ error }</Message> ) 
                    : (
                        <Table  stripped bordered hover responsive
                                className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th className="pl-2">ID</th>
                                    <th className="pl-2">NAME</th>
                                    <th className="pl-2">EMAIL</th>
                                    <th className="pl-2">ADMIN</th>
                                    <th className="m-0 p-0"></th>
                                </tr>
                            </thead>

                            <tbody>
                                { users.map( user => (
                                    <tr key={ user._id }>
                                        <td className="pt-3 pl-2">{ user._id }</td>
                                        <td className="pt-3 pl-2">{ user.name }</td>
                                        <td className="pt-3 pl-2">{ user.email }</td>
                                        <td className="h4 pl-3 pt-2">{ user.isAdmin ? (
                                            <i className="fas fa-check" style={{ color: "#00CC00" }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                        </td>

                                        <td className="">
                                            <LinkContainer to={`/admin/user/${ user._id }/edit`}>
                                                <Button variant="info"
                                                        className="btn-sm mx-2">
                                                    <i className="fas fa-user-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant="danger"
                                                    className="btn-sm mx-2"
                                                    onClick={ () => deleteHandler(user._id) }>
                                                <i className="fas fa-user-slash"></i>
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


export default UserListScreen;
