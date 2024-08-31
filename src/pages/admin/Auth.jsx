import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../../layouts/Sidebar'
import Breadcrumb from '../../components/Breadcrumb'
import { useSelector } from 'react-redux'

const customerPath = [
  "order",
  "dashboard",
  "edit-profile"
];

const Auth = () => {
  const navigate = useNavigate();

  let path = useLocation()

  let currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if(!currentUser.name) {
      navigate("/login")
    }

    let authenticatePath = false;

    if(currentUser.role === "Customer") {
      for (const userPath  of customerPath) {
        if(!path.pathname.includes(userPath)) {
          authenticatePath = true
          break;
        }
      }
    }

    if(!authenticatePath && currentUser.role === "Customer") {
      navigate("/admin/dashboard")
    }
  }, [path.pathname, currentUser.role, currentUser.name, navigate])

  return (
    <>
      <Breadcrumb marginTop={"150px"} />

      <div className='container mt-4'>
        <div className='row'>
          <div className='col-sm-3'>
            <Sidebar />
          </div>
          <div className='col-sm-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </>

  )
}

export default Auth