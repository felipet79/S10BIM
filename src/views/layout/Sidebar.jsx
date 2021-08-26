

import { Height } from "@material-ui/icons";
import React from "react";
import {Link} from 'react-router-dom';
//import AdminLTELogo from '../../assets/img/AdminLTELogo.png';
import logo from "../../assets/img/logo.png";
import TreeCP from "../../components/TreeCP";


const Sidebar = () => {
  return (
    <aside id="ContenedorSide" className="main-sidebar sidebar-dark-primary elevation-3" style={{opacity: 1.0}}>
      {/* <!-- Brand Logo --> */}
      <Link to="/inicio" className="brand-link"  style={{ background:'#3c8dbc', height:'40px' }}>
        <img
          src={logo}
          alt="s10 Logo"
          className="brand-image img-circle elevation-3"
          style={{opacity: 0.8, marginLeft:'-3px', marginTop:'-10px'}}
        />
        <span className="brand-text font-weight-light" style={{ postition:'relative', height:'40px' }} >Presupuestos</span>
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar" >
     

        {/* <!-- SidebarSearch Form --> */}
        {/*<div className="form-inline mt-3">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
  </div>*/}



        {/* <!-- Sidebar Menu --> */}
        
        
        
        
    
       
        
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className */}
            {/* with font-awesome or any other icon font library --> */}
           
            <li className="nav-item">
              <Link to="/presupuesto" className="nav-link font-12">
                <i className="nav-icon fas fa-th" style={{fontSize: 15}}></i>
                <p>
                  Presupuesto
                </p>
              </Link>
            </li>
            <ul style={{listStyle:'none'}}>
            {/* <li className="nav-item">
              <Link to="/inicio" className="nav-link font-12">
                <i className="nav-icon far fa-calendar-alt" style={{position:'absolute',fontSize: 15, marginLeft:'-30px'}}></i>
                <p>
                  Datos Generales
                </p>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to="/presupuesto" className="nav-link font-12">
                <i className="nav-icon far fa-calendar-alt" style={{position:'absolute', fontSize: 15, marginLeft:'-30px'}}></i>
                <p>
                  Hoja del Presupuesto
                </p>
              </Link>
            </li>
            </ul>



            <li className="nav-item">
              <Link to="/modelos" className="nav-link font-12">
                <i className="nav-icon fas fa-th" style={{fontSize: 15}}></i>
                <p>
                  General
                </p>
              </Link>
            </li>
            <ul style={{listStyle:'none'}}>
            <li className="nav-item">
              <Link to="/modelos" className="nav-link font-12">
                <i className="nav-icon far fa-calendar-alt" style={{position:'absolute', fontSize: 15, marginLeft:'-30px'}}></i>
                <p>
                  Modelos
                </p>
              </Link>
            </li>

            </ul>


              {/*<div className="input-group" data-widget="sidebar-search"  style={{fontSize: 15, color:'white', overflow:'hidden', height:'85vh', top:'10px', left:'70px', width:'85%'}}>
              <TreeCP
									levelStart={1}
              idProject=""/>
              </div>*/}

            
            
            
         
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
    
  );
};

export default Sidebar;
