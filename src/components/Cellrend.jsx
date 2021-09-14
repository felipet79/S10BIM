import { CheckBox } from 'devextreme-react';




export const CellCheck = (options) => {
  const datos = options.data;
  console.log(' Esta es la da en CelllCheck');
  console.log(options);
  //console.log(options.data);
  /*if (!employee) {
    return <span className="name">not assigned</span>;
  }*/

  return (
    <>
      {/* <div className="img" style={{ backgroundImage: `url(${employee.Picture})` }} /> */}
      { options.rowIndex % 2 ?
      <div style={{ height:'100%', width:'100%', background: 'white' }} >
        <CheckBox
          defaultValue={options.displayValue==='true' ? true:false}
          //value={options.displayValue==='true' ? true:false}
          onValueChange={(e)=>{
           console.log(e)
           //e tiene true o false aqui modificar state del campo que corresponde
            
          }}
          
        />
        </div>

      : <div style={{ height:'100%', width:'100%', background: '#f8f9fa' }} >
        <CheckBox
          defaultValue={options.displayValue==='true' ? true:false}
          //value={options.displayValue==='true' ? true:false}
        />
        </div>
     }      
      
    </>
  );
}


export function CellRend_Items(options) {
  const employee = options.data;
  /*console.log(' Esta es la da en CelllRend');
  console.log(options);
  console.log(options.data);*/
  
  let alto='34px';
  let color='rgba(0,0,0,0.03)'
  //const [alto, setAlto] = useState('20px');
  let pading='7px';
  let fsize='12px';
  /*if (!employee) {
    return <span className="name">not assigned</span>;
  }*/
    if (options.data.Descripcion.length>10)
      alto='34px';
    if (options.data.Descripcion.length>25)
      alto='43px';
    if (options.data.Descripcion.length>50)
      alto='52px';
    if (options.data.Descripcion.length>65)
      alto='63px';
    if (options.data.Descripcion.length>90)
      alto='82px';

  if (options.columnIndex===0){
    //border-radis
    //bordes='80px 30px 0px 0px;'
    pading='0px';
    fsize='10px';
    //color='transparent'
  }



  return (
    <>
      {/* <div className="img" style={{ backgroundImage: `url(${employee.Picture})` }} /> */}
      {/* { options.data.Unidad === null ?
      <div style={{ background: 'rgba(0,0,0,0.05)', backgroundSize:'cover' }} >
      &nbsp;<span >{options.displayValue}</span></div>: */}
      {/* {options.rowIndex % 2 ?
      <div style={{ background: 'transparent', backgroundSize:'cover', height:alto, padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>
      : <div style={{ background: 'rgba(0,0,0,0.03)', backgroundSize:'cover', height:alto, padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>      
      }       */}

      
      { options.data.Unidad !== null ?
      <div style={{ background: 'transparent', backgroundSize:'cover', /*height:alto,*/ padding:'7px', boxShadow:'0.0px 0.05px 0.0px 0.0px rgba(0,0,0,0.02) inset', paddingLeft:pading, fontSize:fsize }} >
        &nbsp;<span >{options.displayValue}</span></div>
      : <div style={{ background: color,  height:alto, padding:'7px', borderRadius:'4px', boxShadow:'0.0px 0.5px 0.5px 0.0px rgba(0,0,0,0.06) inset', paddingLeft:pading, fontSize:fsize }} >
        &nbsp;<span >{options.displayValue}</span></div>      
      }      


    </>
  );
}



export function CellRend_Metrados(options) {
  const employee = options.data;
  /*console.log(' Esta es la da en CelllRend');
  console.log(options);
  console.log(options.data);*/
  
  let alto='34px';
  let margen='0px';
  let color='rgba(0,0,0,0.03)'
  //const [alto, setAlto] = useState('20px');
  let pading='7px';
  let fsize='12px';
  /*if (!employee) {
    return <span className="name">not assigned</span>;
  }*/
    /*if (options.data.Descripcion.length>10)
      alto='34px';
    if (options.data.Descripcion.length>25)
      alto='43px';
    if (options.data.Descripcion.length>50)
      alto='52px';
    if (options.data.Descripcion.length>65)
      alto='63px';
    if (options.data.Descripcion.length>90)
      alto='82px';*/

  if (options.columnIndex===0){
    //border-radis
    //bordes='80px 30px 0px 0px;'
    //pading='0px';
    //fsize='10px';
    //color='transparent'
    margen='8px'
  }



  return (
    <>
      {/* <div className="img" style={{ backgroundImage: `url(${employee.Picture})` }} /> */}
      {/* { options.data.Unidad === null ?
      <div style={{ background: 'rgba(0,0,0,0.05)', backgroundSize:'cover' }} >
      &nbsp;<span >{options.displayValue}</span></div>: */}
      {/* {options.rowIndex % 2 ?
      <div style={{ background: 'transparent', backgroundSize:'cover', height:alto, padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>
      : <div style={{ background: 'rgba(0,0,0,0.03)', backgroundSize:'cover', height:alto, padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>      
      }       */}

      
      { options.data.Tipo === "Medicion" ?
      <div style={{ background: 'transparent', backgroundSize:'cover', /*height:alto,*/ padding:'7px', boxShadow:'0.0px 0.05px 0.0px 0.0px rgba(0,0,0,0.02) inset', paddingLeft:pading, fontSize:fsize }} >
        &nbsp;<span >{options.displayValue}</span></div>
      : <div style={{ marginLeft:margen, background: color,  height:alto, padding:'7px', borderRadius:'4px', boxShadow:'0.0px 0.5px 0.5px 0.0px rgba(0,0,0,0.06) inset', paddingLeft:pading, fontSize:fsize }} >
        &nbsp;<span >{options.displayValue}</span></div>      
      }      


    </>
  );
}


export default function CellRend(options) {
  const employee = options.data;
  /*console.log(' Esta es la da en CelllRend');
  console.log(options);
  console.log(options.data);*/
  /*if (!employee) {
    return <span className="name">not assigned</span>;
  }*/

  return (
    <>
      {/* <div className="img" style={{ backgroundImage: `url(${employee.Picture})` }} /> */}
      { options.rowIndex % 2 ?
      <div style={{ background: 'transparent', backgroundSize:'cover', padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>
      : <div style={{ background: 'rgba(0,0,0,0.03)', backgroundSize:'cover', padding:'7px' }} >
        &nbsp;<span >{options.displayValue}</span></div>      
     }      
      
    </>
  );
}