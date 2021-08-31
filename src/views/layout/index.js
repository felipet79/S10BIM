import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import $ from 'jquery';


// import Footer from "./Footer";
const Layout = ({ children }) => {

  const proyects = useSelector((state) => state.proyects);
  const [ancho, setAncho] = useState('-48px');
  const [ancho1, setAncho1] = useState('');
  useEffect(() => {
		
    
    if(proyects.Avisa===undefined){
      setAncho('-48px');
      setAncho1(window.innerWidth - 210 );  
      //$("#CC1").width=
      


    }
    
    if(proyects.Avisa===0){
      setAncho('0px');
      setAncho1(window.innerWidth - 40);
      //setAncho1('1320px');
    }
		if(proyects.Avisa===1){
      setAncho('-48px');
      setAncho1(window.innerWidth - 210);
      //$("#CC1").width=
      //setAncho1('1800px');
    }
		
	}, [ proyects.Avisa])


  return (
    <div className="wrapper" style={{height: '100vh'}}>
      <Navbar />
      <Sidebar />

      <div className="content-wrapper" style={{height: '100vh'}}>
        {/* Content Header (Page header) */}
        <div>
          <div className="container-fluid" >
            <div className="row"></div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div id="CC1" className="container-fluid" style={{marginLeft:ancho, width:ancho1 }}>{children}</div>
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
