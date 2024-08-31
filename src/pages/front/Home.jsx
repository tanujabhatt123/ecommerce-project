import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/product/ProductItem';
import styles from "./Home.module.css"
import { getProductStart } from '../../redux/action/product.action';
import { getCategoryStart } from '../../redux/action/category.action';


const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector(state => state.product.products);
	const categories = useSelector(state => state.category.categories);
	let [tab, setTab] = useState("tab-1");
  
	useEffect(() => {
	  dispatch(getProductStart())
	  dispatch(getCategoryStart());
	}, [dispatch, products.length, categories.length])
  return (
    <>		
		
		
			<div className="hero">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Modern Interior <span clsas="d-block">Design Studio</span></h1>
								<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
								<p><Link to="" className="btn btn-secondary me-2">Shop Now</Link><Link to="#" className="btn btn-white-outline">Explore</Link></p>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="hero-img-wrap">
								<img src="images/couch.png" className="img-fluid" alt='images'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		

		
			<div className="container-fluid fruite py-5 hero-header">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start ">
                <h1>Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <Link 
                      className={tab === `tab-1` ? `d-flex py-2 m-2 bg-light rounded-pill  ${styles.active}` : "d-flex py-2 m-2 bg-light rounded-pill"}
                      data-bs-toggle="pill" onClick={() => setTab("tab-1")}>
                      <span className="text-dark" style={{
                        width: "130px"
                      }}>All Products</span>
                    </Link>
                  </li>
                  {
                    categories.length > 0 && categories.map((category, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          className={tab === `tab-${index + 2}` ? `d-flex py-2 m-2 bg-light rounded-pill ${styles.active}` : "d-flex py-2 m-2 bg-light rounded-pill"}
                          data-bs-toggle="pill">
                          <span className="text-dark" style={{
                            width: "130px"
                          }} onClick={() => setTab(`tab-${index + 2}`)}>{category.name}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className={tab === `tab-1` ? "tab-pane fade show p-0 active" : "tab-pane fade show p-0"} >
                <div className="row g-4 text-black">
                  <div className="col-lg-12">
                    <div className="row g-4 ">
                      {
                        products.length > 0 && products.map((product, index) => (
                          <ProductItem key={index} product={product} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              {
                categories.length > 0 && categories.map((category, index) => (
                  <div key={index} id={`tab-${index + 2}`} className={tab === `tab-${index + 2}` ? "tab-pane fade show p-0 active" : "tab-pane fade show p-0"} >
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="row g-4">
                          {products.length > 0 && products.map((product, index1) => {

                            if(product.category && product.category.toLowerCase() === category.name.toLowerCase()) {
                              return <ProductItem key={index} product={product} />
                            }

                            return null;
                          })}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }


            </div>
          </div>
        </div>
      </div>

		
		<div className="why-choose-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-6">
						<h2 className="section-title">Why Choose Us</h2>
						<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="images/truck.svg" alt="Images" className="imf-fluid"/>
									</div>
									<h3>Fast &amp; Free Shipping</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="images/bag.svg" alt="Images" className="imf-fluid"/>
									</div>
									<h3>Easy to Shop</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="images/support.svg" alt="Images" className="imf-fluid"/>
									</div>
									<h3>24/7 Support</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="images/return.svg" alt="Images" className="imf-fluid"/>
									</div>
									<h3>Hassle Free Returns</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

						</div>
					</div>

					<div className="col-lg-5">
						<div className="img-wrap">
							<img src="images/why-choose-us-img.jpg" alt="Images" className="img-fluid"/>
						</div>
					</div>

				</div>
			</div>
		</div>
		

		
		<div className="we-help-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-7 mb-5 mb-lg-0">
						<div className="imgs-grid">
							<div className="grid grid-1"><img src="images/img-grid-1.jpg" alt="Untree.co"/></div>
							<div className="grid grid-2"><img src="images/img-grid-2.jpg" alt="Untree.co"/></div>
							<div className="grid grid-3"><img src="images/img-grid-3.jpg" alt="Untree.co"/></div>
						</div>
					</div>
					<div className="col-lg-5 ps-lg-5">
						<h2 className="section-title mb-4">We Help You Make Modern Interior Design</h2>
						<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>

						<ul className="list-unstyled custom-list my-4">
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
							<li>Donec vitae odio quis nisl dapibus malesuada</li>
						</ul>
						<p><Link to="#" className="btn">Explore</Link></p>
					</div>
				</div>
			</div>
		</div>
		

		
		<div className="popular-product">
			<div className="container">
				<div className="row">

					<div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div className="product-item-sm d-flex">
							<div className="thumbnail">
								<img src="images/product-1.png" alt="Images" className="img-fluid"/>
							</div>
							<div className="pt-3">
								<h3>Nordic Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><Link to="#">Read More</Link></p>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div className="product-item-sm d-flex">
							<div className="thumbnail">
								<img src="images/product-2.png" alt="Images" className="img-fluid"/>
							</div>
							<div className="pt-3">
								<h3>Kruzo Aero Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><Link to="#">Read More</Link></p>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div className="product-item-sm d-flex">
							<div className="thumbnail">
								<img src="images/product-3.png" alt="Images" className="img-fluid"/>
							</div>
							<div className="pt-3">
								<h3>Ergonomic Chair</h3>
								<p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
								<p><Link to="#">Read More</Link></p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		

		
		
		<div className="blog-section">
			<div className="container">
				<div className="row mb-5">
					<div className="col-md-6">
						<h2 className="section-title">Recent Blog</h2>
					</div>
					<div className="col-md-6 text-start text-md-end">
						<Link to="#" className="more">View All Posts</Link>
					</div>
				</div>

				<div className="row">

					<div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div className="post-entry">
							<Link to="#" className="post-thumbnail"><img src="images/post-1.jpg" alt="Images" className="img-fluid"/></Link>
							<div className="post-content-entry">
								<h3><Link to="#">First Time Home Owner Ideas</Link></h3>
								<div className="meta">
									<span>by <Link to="#">Kristin Watson</Link></span> <span>on <Link to="#">Dec 19, 2021</Link></span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div className="post-entry">
							<Link to="#" className="post-thumbnail"><img src="images/post-2.jpg" alt="Images" className="img-fluid"/></Link>
							<div className="post-content-entry">
								<h3><Link to="#">How To Keep Your Furniture Clean</Link></h3>
								<div className="meta">
									<span>by <Link to="#">Robert Fox</Link></span> <span>on <Link to="#">Dec 15, 2021</Link></span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
						<div className="post-entry">
							<Link to="#" className="post-thumbnail"><img src="images/post-3.jpg" alt="Images" className="img-fluid"/></Link>
							<div className="post-content-entry">
								<h3><Link to="#">Small Space Furniture Apartment Ideas</Link></h3>
								<div className="meta">
									<span>by <Link to="#">Kristin Watson</Link></span> <span>on <Link to="#">Dec 12, 2021</Link></span>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		
		
		
</>
  )
}

export default Home