

import { Height } from "@material-ui/icons";
import React from "react";
import {Link} from 'react-router-dom';
//import AdminLTELogo from '../../assets/img/AdminLTELogo.png';
import logo from "../../assets/img/logo.png";
import TreeCP from "../../components/TreeCP";


const Sidebar = () => {
  return (
    <aside id="ContenedorSide" className="main-sidebar sidebar-dark-primary elevation-3" style={{opacity: 1.0,
      /*background: '-moz-linear-gradient(top, rgba(53,53,42,1) 4%, rgba(53,53,42,1) 29%, rgba(53,53,42,0.97) 35%, rgba(122,155,141,0.91) 48%, rgba(78,99,78,0.86) 61%, rgba(116,135,117,0.8) 74%, rgba(165,183,169,0.8) 91%)',
      background: '-webkit-linear-gradient(top, rgba(53,53,42,1) 4%,rgba(53,53,42,1) 29%,rgba(53,53,42,0.97) 35%,rgba(122,155,141,0.91) 48%,rgba(78,99,78,0.86) 61%,rgba(116,135,117,0.8) 74%,rgba(165,183,169,0.8) 91%)',
      background: 'linear-gradient(to bottom, rgba(53,53,42,1) 4%,rgba(53,53,42,1) 29%,rgba(53,53,42,0.97) 35%,rgba(122,155,141,0.91) 48%,rgba(78,99,78,0.86) 61%,rgba(116,135,117,0.8) 74%,rgba(165,183,169,0.8) 91%)',
      filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#35352a", endColorstr="#cca5b7a9",GradientType=0 )'    */
      background:'#1e282c'
    }}>
      {/* <!-- Brand Logo --> */}
      <Link to="/presupuesto" className="brand-link"  style={{ background:'#3c8dbc', height:'35px', 
        /*background: 'rgb(30,87,153)',
        background: '-moz-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%)',
        background: '-webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%,rgba(125,185,232,1) 100%)',
        background: 'linear-gradient(to bottom, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%,rgba(125,185,232,1) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#1e5799", endColorstr="#7db9e8",GradientType=0 )',    */
       /* background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
        background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
        background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'        */
       background:'#398bf7'

    }}>
        <img
          src={logo}
          alt="s10 Logo"
          className="brand-image img-circle elevation-3"
          style={{opacity: 0.8, marginLeft:'-8px', marginTop:'-2px', width:'35px'}}
        />
        <span className="brand-text font-weight-light" style={{ position:'absolute', top:'2px', height:'40px' }} >Presupuestos</span>
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar" style={{
        /*background: 'rgb(206,220,231)',
        background: '-moz-linear-gradient(top, rgba(206,220,231,1) 0%, rgba(89,106,114,1) 100%)',
        background: '-webkit-linear-gradient(top, rgba(206,220,231,1) 0%,rgba(89,106,114,1) 100%)',
        background: 'linear-gradient(to bottom, rgba(206,220,231,1) 0%,rgba(89,106,114,1) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#cedce7", endColorstr="#596a72",GradientType=0 )',*/

        /*background: 'rgb(31,48,58)',
        background: '-moz-linear-gradient(top, rgba(31,48,58,1) 16%, rgba(31,48,58,1) 33%, rgba(181,189,200,1) 82%, rgba(181,189,200,1) 82%, rgba(181,189,200,1) 86%)',
        background: '-webkit-linear-gradient(top, rgba(31,48,58,1) 16%,rgba(31,48,58,1) 33%,rgba(181,189,200,1) 82%,rgba(181,189,200,1) 82%,rgba(181,189,200,1) 86%)',
        background: 'linear-gradient(to bottom, rgba(31,48,58,1) 16%,rgba(31,48,58,1) 33%,rgba(181,189,200,1) 82%,rgba(181,189,200,1) 82%,rgba(181,189,200,1) 86%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#1f303a", endColorstr="#b5bdc8",GradientType=0 )'*/
        

        /*background: '-moz-linear-gradient(top, rgba(53,53,42,1) 4%, rgba(53,53,42,1) 29%, rgba(53,53,42,0.97) 35%, rgba(122,155,141,0.91) 48%, rgba(78,99,78,0.86) 61%, rgba(116,135,117,0.8) 74%, rgba(165,183,169,0.8) 91%)',
        background: '-webkit-linear-gradient(top, rgba(53,53,42,1) 4%,rgba(53,53,42,1) 29%,rgba(53,53,42,0.97) 35%,rgba(122,155,141,0.91) 48%,rgba(78,99,78,0.86) 61%,rgba(116,135,117,0.8) 74%,rgba(165,183,169,0.8) 91%)',
        background: 'linear-gradient(to bottom, rgba(53,53,42,1) 4%,rgba(53,53,42,1) 29%,rgba(53,53,42,0.97) 35%,rgba(122,155,141,0.91) 48%,rgba(78,99,78,0.86) 61%,rgba(116,135,117,0.8) 74%,rgba(165,183,169,0.8) 91%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#35352a", endColorstr="#cca5b7a9",GradientType=0 )'*/
        background:'#1e282c',
        color:'white'

      }} >
     

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
        
        
        
        
    
       
        
        <nav className="" style={{marginTop:'30px'}}>
          <ul
            className="nav nav-pills nav-sidebar flex-column mt-0"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className */}
            {/* with font-awesome or any other icon font library --> */}
           
            <li className="nav-item">
              <Link to="/presupuesto" className="nav-link font-12">
                <i className="nav-icon fas fa-th" style={{fontSize: 15, marginLeft:'-20px', color:'white'}}></i>
                <p style={{color:'white',fontWeight:'550'}}>
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
                <i className="nav-icon far fa-calendar-alt" style={{position:'absolute', fontSize: 15, marginLeft:'-50px', color:'white'}}></i>
                <p style={{marginLeft:'-25px', fontWeight:'550'}}>
                  Hoja del Presupuesto
                </p>
              </Link>
            </li>
            </ul>



            <li className="nav-item">
              <Link to="/modelos" className="nav-link font-12">
                <i className="nav-icon fas fa-th" style={{fontSize: 15, marginLeft:'-20px', color:'white'}}></i>
                <p style={{color:'white',fontWeight:'550'}}>
                  General
                </p>
              </Link>
            </li>
            <ul style={{listStyle:'none'}}>
            <li className="nav-item">
              <Link to="/modelos" className="nav-link font-12">
                <i className="nav-icon far fa-calendar-alt" style={{position:'absolute', fontSize: 15, marginLeft:'-50px', color:'white' }}></i>
                <p style={{ marginLeft:'-25px',fontWeight:'550'}}>
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
