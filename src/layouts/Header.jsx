import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Header = () => {
    let currentUser = useSelector((state) => state.user.currentUser);
    let currentCart = useSelector((state) => state.cart.currentCart);
  return (
    <><nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

    <div className="container">
        <Link className="navbar-brand" to="index.html">Furni<span>.</span></Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                {!currentUser.name&&<>
                    <li><Link className="nav-link" to="/register">Register</Link></li>
                    <li><Link className="nav-link" to="/login">Login</Link></li></>}
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            {currentUser.name&&<>

                {
                    currentCart.items.length>0&&<li><Link className="nav-link" to="/cart"><img src="/images/cart.svg"alt='images'  style={{
                        top: "-5px", left: "15px", height: "20px", minWidth: "20px"}}/>
                        {currentCart.items.length}
                    </Link></li>
                }
                
                <li><Link className="nav-link" to="/admin/dashboard"><img src="/images/user.svg" alt='images'/></Link></li></>}
               
            </ul>
        </div>
    </div>
        
</nav></>
  )
}

export default Header