import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteUserStart, getUserStart } from '../../../redux/action/user.action';

const User = () => {
  let users = useSelector(state => state.user.users)
  const dispatch = useDispatch();

  const getUser = useCallback(() => {
    dispatch(getUserStart())
  }, [dispatch])

  
  const deleteUser = (id) => {
    dispatch(deleteUserStart(id))
  }

  useEffect(() => {
    getUser()
  }, [users?.length, getUser])

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>User</h5>
        <Link to="/admin/user/add" className='btn btn-primary btn-sm text-white'>Add User</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              users?.length>0&&users.map((user,index)=> (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th><img src={user.image} alt="" height={50} /></th>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.contactNumber}</th>
                    <th>{user.role}</th>
                    <td>{user.status === "active" ? "Active" : "Inactive"}</td>
                    <td>
                      <Link to={`/admin/user/edit/${user.id}`} className='btn btn-primary me-4'>Edit</Link>
                      <button onClick={() => deleteUser(user.id)}  className='btn btn-secondary '>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default User