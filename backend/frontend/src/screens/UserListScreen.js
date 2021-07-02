import React, { useEffect } from 'react';
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
            <h1 className="my-4 fw-500">Users</h1>

            { loading ? ( <Loader /> ) :
                error ? ( <Message variant='danger'>{ error }</Message> ) 
                    : (
                        <Table  striped bordered hover responsive
                                className="table-sm"
                        >
                            <thead className="thead-dark">
                                <tr>
                                {/* <th className="pl-2">ID</th>   */}
                                    <th className="pl-2">EMAIL</th>
                                    <th className="pl-2">NAME</th>
                                {/*     <th className="px-0 text-center">ADMIN</th> */}
                                    <th className="m-0 p-0"></th>
                                </tr>
                            </thead>

                            <tbody>
                                { users.map( user => (
                                    <tr key={ user._id }>
                                    {/* <td className="pt-3 pl-2">{ user._id }</td>  */}
                                        <td className="pt-3 pl-2">
                                            <a
                                                href={`#/admin/user/${ user._id }/edit`}
                                                className="text-info fw-500"
                                            >
                                                { user.email }
                                            </a>
                                        </td>
                                        <td className="pt-3 pl-2">
                                            { user.isAdmin ? (
                                                <i class="fas fa-crown" style={{ fontSize: "1.15em", color: "#ebd702", paddingRight: "5px"}}></i>
                                            ) : (
                                                <i class="fas fa-chess-pawn" style={{ fontSize: "1.15em", color: "#a1a1a1", padding: "0 7px 0 4px" }}></i>
                                            )} {' '}
                                            { user.name } 
                                        </td>
                                    {/* 
                                        <td className="h4 pt-2 px-0 text-center">{ user.isAdmin ? (
                                            <i className="fas fa-check" style={{ color: "#00CC00" }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                        </td>
                                    */}
                                        <td className="mx-0 text-center">
                                        {/*
                                            <LinkContainer to={`/admin/user/${ user._id }/edit`}>
                                                <Button variant="info"
                                                        className="btn-sm mx-2 px-3 border border-dark">
                                                    <i className="fas fa-user-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                        */}
                                            <Button variant="danger"
                                                    className="btn-sm mx-2 px-3 border border-dark"
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
