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
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                { users.map( user => (
                                    <tr key={ user._id }>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{ user.isAdmin ? (
                                            <i className="fas fa-check" style={{ color: "#00CC00" }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant="info" className="btn-sm mr-2">
                                                    <i className="fas fa-user-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant="danger" className="btn-sm" onClick={ () => deleteHandler(user._id)}>
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
