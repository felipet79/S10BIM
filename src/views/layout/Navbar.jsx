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
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{background:'#3c8dbc', color:'white', height:'40px'}}>
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
        <Breadcrumb.Item href="#" ><p style={{color:'white', marginTop:'18px'}}> {proyects.titleProject} {proyects.titlePC ? ' / ' + proyects.titlePC : ''} </p></Breadcrumb.Item>
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

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
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
			>Cerrar sesión</button>
          </div>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
