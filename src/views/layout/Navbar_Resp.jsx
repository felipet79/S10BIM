import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { Breadcrumb, Dropdown, FormControl } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../actions/auth.action';

import avatar from '../../assets/img/avatar5.png'
import {useHistory} from 'react-router-dom';
import { SelectUrn } from "../../actions/proyects.actions";



const LPlanos = [{
  'CodPlano': 'n4VduC1mikKexAKq81VrPw==',
  'NombreArchivRvt': "OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT",
  'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT.rvt',
  'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.i-ZglBH8RtWEb5f-BZvgCA?version=1',
  'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x',
  'EmailUsuario': 'ctorres@s10peru.com',  
},{
  'CodPlano': 'au5cX016Pkq2F8FLjAqHeA==',
  'NombreArchivRvt': "Edificio colinas_felipet79XYRPT",
  'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\Edificio colinas_felipet79XYRPT.rvt',
  'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.eRzcm6VWTMy2VuycStaTdQ?version=1',
  'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmVSemNtNlZXVE15MlZ1eWNTdGFUZFE/dmVyc2lvbj0x',
  'EmailUsuario': 'ctorres@s10peru.com',  
}


];


const Navbar = () => {
	const history = useHistory();
	const proyects = useSelector(state => state.proyects);

  const [ Modelos, setModelos ] = useState(LPlanos);
  const [ ModActivo, setModActivo ] = useState('n4VduC1mikKexAKq81VrPw==');	
  
  const dispatch = useDispatch();
	
	let user = JSON.parse(localStorage.getItem("user-s10"));


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );


  const CambiarModelo = (ModeloCambiar) => {
    //alert(ModeloCambiar.NombreArchivRvt);

    if (ModeloCambiar.CodPlano!==ModActivo){
      setModActivo(ModeloCambiar.CodPlano);
      //alert(ModeloCambiar.UrnWeb);
      dispatch(SelectUrn(ModeloCambiar.UrnWeb));
    }

  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item" style={{marginLeft:'500px'}}>
          <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
            <i className="fas fa-bars"></i>
          </Link>
        </li>
        <li className="d-flex align-items-center">
          <p className="ml-3 mr-2 mb-0" style={{fontSize: 12}}>S10 BIM  |  </p>
        </li>
      </ul>

      <Breadcrumb>
        <Breadcrumb.Item href="#"> {proyects.titleProject} {proyects.titlePC ? ' - ' + proyects.titlePC : ''}</Breadcrumb.Item>
      </Breadcrumb>


      <div className="" style={{ position:'absolute', right:'200px' }}>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Modelos
    </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
            {
              Modelos.map((Modelo)=>{
                return(

                  Modelo.CodPlano===ModActivo ? 
                  (<Dropdown.Item eventKey={ Modelo.CodPlano } active onClick={()=>{CambiarModelo(Modelo)}}>{Modelo.NombreArchivRvt}</Dropdown.Item> )
                : (<Dropdown.Item eventKey={ Modelo.CodPlano } onClick={()=>{CambiarModelo(Modelo)}}>{Modelo.NombreArchivRvt}</Dropdown.Item>)

                )
              })



            }
        </Dropdown.Menu>
      </Dropdown>
       </div>
     
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="navbar-search-block">
       
          </div>
        </li>

        {/* <!-- Notifications Dropdown Menu --> */}
        <li className="nav-item dropdown">
          <Link className="nav-link d-flex" data-toggle="dropdown" to="#">
            <h6>{user.FullName}</h6>
			<img src={avatar} className="img-fluid rounded-circle ml-3" width="25" alt="avatar" />
          </Link>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">Colaborador</span>
            <div className="dropdown-divider"></div>
            
			<div className="text-center w-100">
				<img src={avatar} alt="avatar" className="img-fluid mt-4 mb-2" width="100"/>

				<h4>{user.FullName}</h4>
				<p className="text-secondary mb-3">
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
