import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      <div className="container relative">
        <div className="sofa-img mt-5">
          <img src="/images/sofa-gtm.png" alt="Images" className="img-fluid mt-4" />
        </div>

        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-6">
              <p className="mb-2 text-center text-lg-start">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script>. All
                Rights Reserved. &mdash; Designed with love by{" "}
                <Link to="/">tanuja</Link> email{" "}
                <Link to="https://themewagon.com">bhatttanuja@123</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
