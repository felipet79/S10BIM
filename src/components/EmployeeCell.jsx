import React from 'react';

export default function EmployeeCell(options) {
  const employee = options.data;
 /* console.log(' Esta es la da en Employeeee');
  console.log(options.data);*/
  if (!employee) {
    return <span className="name">not assigned</span>;
  }

  return (
    <React.Fragment>
      <div style={{ padding:'7px'}}>
      {/* <div className="img" style={{ backgroundImage: `url(${employee.Picture})` }} /> */}
      { employee.Tipo === 'Proyecto' ?
      <div className="img" style={{  backgroundImage: `url('img/manager.png')` }} />
      : employee.Tipo === 'Folder' ?
      <div className="img" style={{  backgroundSize:'25px', backgroundImage: `url('img/project.png')` }} />
      : employee.Tipo === 'Modelo' ?
      <div className="img" style={{  backgroundSize:'25px', backgroundImage: `url('img/subproject.png')` }} />
      : employee.Tipo === 'Version' ?
      ''
    //   <div className="img" style={{ backgroundImage: `url('manager3.png')` }} />
      : ''
    
     }
      
      &nbsp;
      <span className="name">{employee.Descripcion}</span>
      </div>
    </React.Fragment>
  );
}
