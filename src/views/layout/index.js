import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="wrapper" style={{height: '100vh'}}>
      <Navbar />
      <Sidebar />

      <div className="content-wrapper" style={{height: '100vh'}}>
        {/* Content Header (Page header) */}
        <div>
          <div className="container-fluid">
            <div className="row"></div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">{children}</div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
