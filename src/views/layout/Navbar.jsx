import React from "react";
import {Link} from 'react-router-dom';
import { Breadcrumb } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../actions/auth.action';

import avatar from '../../assets/img/avatar5.png'
import {useHistory} from 'react-router-dom';
import { RefrescarV } from "../ViewerSc";

const Navbar = () => {
	const history = useHistory();
	const proyects = useSelector(state => state.proyects);
	const dispatch = useDispatch();
	

	let user = JSON.parse(localStorage.getItem("user-s10"));
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ /*background:'#3c8dbc',*/ color:'white', height:'37px', marginLeft:'200px',
    
    /*background: 'rgb(30,87,153)',
    background: '-moz-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(32,124,202,1) 51%, rgba(125,185,232,1) 100%)',
    background: '-webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%,rgba(125,185,232,1) 100%)',
    background: 'linear-gradient(to bottom, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(32,124,202,1) 51%,rgba(125,185,232,1) 100%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#1e5799", endColorstr="#7db9e8",GradientType=0 )',*/

    /*background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
    background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
    background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'*/
    background:'#398bf7'
    
    }}>
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item"  onClick={()=>{
            
          
            
          if (proyects.Avisa===0)proyects.Avisa=1;
          else
            proyects.Avisa=0;


            

            setTimeout(() => {
							RefrescarV();
						}, 150);


            }}>
          <Link className="nav-link" data-widget="pushmenu" to="#" role="button" style={{color:'white'}}>
            <i className="fas fa-bars"></i>
          </Link>
        </li>
        <li className="d-flex align-items-center">
          <p className="ml-3 mr-2 mb-0" style={{fontSize: 12}}>Presupuestos S10  |</p>
        </li>
      </ul>

      <Breadcrumb>
        <Breadcrumb.Item href="#" ><p style={{color:'white', marginTop:'18px', fontSize:'0.7rem'}}> {proyects.titleProject} {proyects.titlePC ? ' ≫ ' + proyects.titlePC : ''} </p></Breadcrumb.Item>
      </Breadcrumb>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="navbar-search-block">
       
          </div>
        </li>

        {/* <!-- Notifications Dropdown Menu --> */}
        <li className="nav-item dropdown">
          <Link className="nav-link d-flex" data-toggle="dropdown" to="#">
            
			<img src={avatar} className="img-fluid rounded-circle ml-3" width="25" alt="avatar" />
      <h6 style={{color:'white'}}>{user.FullName}</h6>
          </Link>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
          style={{
            /*background: 'rgb(242,245,246)',
            background: '-moz-linear-gradient(top, rgba(242,245,246,1) 0%, rgba(227,234,237,1) 37%, rgba(200,215,220,1) 100%)',
            background: '-webkit-linear-gradient(top, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
            background: 'linear-gradient(to bottom, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f2f5f6", endColorstr="#c8d7dc",GradientType=0 )',*/

          }}
          
          >
            <span className="dropdown-item dropdown-header">Colaborador</span>
            <div className="dropdown-divider"></div>
            
			<div className="text-center w-100" style={{color:'white'}}>
				<img src={avatar} alt="avatar" className="img-fluid mt-4 mb-2" width="100"/>

				<h4>{user.FullName}</h4>
				<p className="text-secondary mb-3" >
					{user.UserName}
				</p>
			</div>

			<button 
			className="btn btn-primary btn-block py-2 px-4 rounded-0"
			onClick={() => dispatch(logOut(history))}
      style={{
       /* background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
        background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
        background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'*/
        background:'#398bf7'
      }}
			>Cerrar sesión</button>
          </div>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
