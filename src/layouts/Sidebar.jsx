import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../redux/action/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.config';

const Sidebar = () => {
  let currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
      try {
          await signOut(auth)

          dispatch(logoutUserStart());

          setTimeout(() => {
              navigate("/login")
          }, 1000)
      } catch (error) {

      }
  }
  return (
    <ul className="list-group">
              <li className="list-group-item active"  style={{backgroundColor:"#3b5d50"}}>
               Sidebar
              </li>
              <li className="list-group-item"><Link to='/admin/dashboard'>Dashboard</Link></li>
              <li className="list-group-item"><Link to='/admin/order'>Order</Link></li>
              <li className="list-group-item"><Link to='/admin/product'>Product</Link></li>
              <li className="list-group-item"><Link to='/admin/category'>category</Link></li>
              <li className="list-group-item"><Link to='/admin/user'>User</Link></li>
              <li className="list-group-item">
                <Link to="#"  onClick={logout}>Logout</Link>
            </li>
              
            </ul>
  )
}

export default Sidebar