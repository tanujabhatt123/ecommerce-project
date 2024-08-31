import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/front/Home'
import ProductDetails from '../pages/front/ProductDetails'
import Cart from '../pages/front/Cart'
import Checkout from '../pages/front/Checkout'
import Auth from '../pages/admin/Auth'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ProfileEdit from '../pages/admin/dashboard/ProfileEdit'
import Order from '../pages/admin/order/Order'
import OrderView from '../pages/admin/order/OrderView'
import Product from '../pages/admin/product/Product'
import AddProduct from '../pages/admin/product/AddProduct'
import EditProduct from '../pages/admin/product/EditProduct'
import Category from '../pages/admin/category/Category'
import AddCategory from '../pages/admin/category/AddCategory'
import EditCategory from '../pages/admin/category/EditCategory'
import User from '../pages/admin/user/User'
import AddUser from '../pages/admin/user/AddUser'
import EditUser from '../pages/admin/user/EditUser'
import Login from '../pages/front/Login'
import Register from '../pages/front/Register'
import NotFound from '../pages/front/NotFound'
import Thank from '../pages/front/Thank'

const Router = () => {
    return (
        <Routes>
            {/* front routes */}

            {/* home page */}
            <Route path='/' element={<Home />} />

            {/* product details page */}
            <Route path='/product-details/:slug' element={<ProductDetails />} />

            {/* cart page  */}
            <Route path='/cart' element={<Cart />} />

            {/* checkout page  */}
            <Route path='/checkout' element={<Checkout />} />

            {/* login page */}
            <Route path='/login' element={<Login />} />

            {/* register page */}
            <Route path='/register' element={<Register />} />

            {/* thank you page */}
            <Route path='/thank-you' element={<Thank />} />

            {/* Admin Route */}
            <Route path='/admin' element={<Auth />}>
                {/* dashboard page */}
                <Route path='dashboard' element={<Dashboard />} />

                {/* profile edit page */}
                <Route path='edit-profile' element={<ProfileEdit />} />

                {/* order page */}
                <Route path='order'>
                    {/* order list page */}
                    <Route path='' element={<Order />} />

                    {/* order view page */}
                    <Route path='view/:id' element={<OrderView />} />
                </Route>

                {/* product pages*/}
                <Route path='product'>
                    {/* product list page */}
                    <Route path='' element={<Product />} />

                    {/* product add page */}
                    <Route path='add' element={<AddProduct />} />

                    {/* product edit page */}
                    <Route path='edit/:id' element={<EditProduct />} />
                </Route>

                {/* category pages*/}
                <Route path='category'>
                    {/* category list page */}
                    <Route path='' element={<Category />} />

                    {/* category add page */}
                    <Route path='add' element={<AddCategory />} />

                    {/* category edit page */}
                    <Route path='edit/:id' element={<EditCategory />} />
                </Route>

                {/* user pages*/}
                <Route path='user'>
                    {/* user list page */}
                    <Route path='' element={<User />} />

                    {/* user add page */}
                    <Route path='add' element={<AddUser />} />

                    {/* user edit page */}
                    <Route path='edit/:id' element={<EditUser />} />
                </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router