import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { agregaGrupo1, guardarGrupo, limpiaUbicaciones, modificaGrupo1, modificarGrupo, selectCLIENTES, selectMODELOS, selectMONEDAS, selectUBICACIONES } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import BuscaCliente from '../components/BuscaCliente';
import BuscaUbicacion from '../components/BuscaUbicacion';
import { ViewerSc } from './ViewerSc';
import Swal from 'sweetalert2'
import BuscaModelo from '../components/BuscaModelo';
import BuscaMoneda from '../components/BuscaMoneda';
import { DateBox, NumberBox, SelectBox, TextBox } from 'devextreme-react';
import { date } from 'yup/lib/locale';
//import { ViewScreen1 } from './ViewScreen1'

import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  RangeRule,
  AsyncRule
} from 'devextreme-react/validator';



const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);






const DatosGrupoAdd = ({ nivel, itemSelected, setNuevoGrupo, accion}) => {

    /*const [ItemSub, setItemSub] = useState({


    });*/


    const initialP={
        ERPCode:'',
        CodPresupuesto: '',
        Descripcion:'',
        Nivel:nivel,
        Fila:null,
        PhantomId:null,
        PhantomParentId:null
    }

    const [show, setShow] = useState(false);
    const [showUb, setShowUb] = useState(false);
    const [showMdl, setShowMdl] = useState(false);
    const [showMnd, setShowMnd] = useState(false);

    const [subseleccionado, setSubSeleccionado] = useState(null);


    const [historicoSel, setHistoricoSel] = useState("");
    const [historicos, setHistoricos] = useState([]);


    const [presupuestoN, setPresupuestoN] = useState(initialP);



    //VARIABLES PARA TAMAÑO DE PANTALLA
    const [titulos, setTitulos] = useState('100%');


    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);

 

    //const auth = useSelector((state) => state.auth);
    const proyects = useSelector((state) => state.proyects);
    //alert(' inicializando treeeee' );

    const [selecOP, setselecOP] = useState(1);

    //const subproyects = useSelector((state) => state.subproyects);


    const showFn = () => {
        setShow(true)
    }

    const drawerItems = () => {
        //console.log('datos de subProyectos actualizados')
        //console.log(allLevels1[0])


        return (
            proyects.treeSubControl ?
                proyects.treeSubControl.map(filter => {
                    return (<tr key={filter.CodSubpresupuesto}>
                        <td>{filter.CodSubpresupuesto}</td>
                        <td>{filter.CodAlterno}</td>
                        <td>
                            <Form.Group as={Row} className="mb-1" controlId="formDF">
                                <Col sm={11}>
                                    <TextBox
                                        defaultValue={filter.Descripcion}
                                        value={filter.Descripcion}
                                        height={'25px'}
                                        width={'90%'}
                                    //rtlEnabled={true}
                                    //readOnly={true}
                                    />
                                </Col>
                                <Col sm={1}>
                                    <Button variant="outline-info" style={{ height: '25px' }} onClick={() => {
                                        if (true) {

                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}><i class="far fa-save" style={{ position: 'relative', top: '-5px' }}></i></Button>
                                </Col>

                            </Form.Group>
                        </td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        <td align="left">{filter.NombreModelo ? filter.NombreModelo : 'No asignado'} <div className="btn btn-outline-info" style={{ position: 'absolute', right: '20px', color: '#3c8dbc', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></div></td>
                    </tr>
                    )
                }) : ''
        )
    }


    function formatNumber(num) {
        if (!num || num == 'NaN') return '-';
        if (num == 'Infinity') return '&#x221e;';
        var num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }

    function roundN(num, n) {
        return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    }




    const Selecciona = (dato) => {
        //alert(dato.CodSubpresupuesto);
        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {

            setShowMdl(true);
            setSubSeleccionado(dato);
            //dato.CodModelo=proyects.AuxModelo;
            //alert(proyects.AuxModelo);

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No tiene un Presupuesto seleccionado',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
       
    }

    const drawerItems1 = () => {
        //console.log('datos de subProyectos actualizados')
        //console.log(allLevels1[0])
        return (
            proyects.treeSubControl ?
                proyects.treeSubControl.filter((filtro1) => filtro1.CodSubpresupuesto === proyects.Sub_sel).map(filter => {
                    return (<tr key={filter.CodSubpresupuesto}>
                        <td>{filter.CodSubpresupuesto}</td>
                        <td>{filter.CodAlterno}</td>
                        <td><Form.Group as={Row} className="mb-1" controlId="formDF">
                            <Col sm={11}>
                                <TextBox
                                    defaultValue={filter.Descripcion}
                                    value={filter.Descripcion}
                                    height={'25px'}
                                    width={'90%'}
                                //rtlEnabled={true}
                                //readOnly={true}
                                />
                            </Col>
                            <Col sm={1}>
                                <Button variant="outline-info" style={{ height: '25px' }} onClick={() => {
                                    if (true) {

                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'No tiene un Presupuesto seleccionado',
                                            icon: 'error',
                                            confirmButtonText: 'Ok'
                                        })
                                    }
                                }}><i class="far fa-save" style={{ position: 'relative', top: '-5px' }}></i></Button>
                            </Col>

                        </Form.Group></td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        <td align="left">{filter.NombreModelo ? filter.NombreModelo : 'No asignado'} <div className="btn btn-outline-info" style={{ position: 'absolute', right: '20px', color: '#3c8dbc', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></div></td>
                    </tr>
                    )
                }) : ''
        )
    }



 

    useEffect(() => {
        if (proyects.seleccionado === undefined) return;
        setselecOP(proyects.seleccionado) 
    }, [proyects.seleccionado])



    //establecer tamaños y posiciones
    useEffect(() => {
  
        if (accion===1){
           /* console.log('MIS DATOS DE ARBOLLLLLL');
            console.log(proyects.treePartyControl);*/
            
            if (presupuestoN.Nivel===1){
                const filtro = proyects.treePartyControl.filter((filtro1) => filtro1.Nivel === 1);
                let toca=0;
                if (filtro.length!==0)
                {
                    toca= parseInt(filtro[filtro.length-1].CodPresupuesto,10)+1;
                }else
                    toca=1;
                
                let concat='0';
                if (toca>=10)
                    concat='';
                setPresupuestoN( (state) => ({...state,CodPresupuesto:concat+toca}));
            }else{
                const filtro = proyects.treePartyControl.filter((filtro1) => filtro1.PhantomParentId === itemSelected);
                let toca=0;
                if (filtro.length!==0)
                {
                    toca= parseInt(filtro[filtro.length-1].CodPresupuesto.substring(2,4),10)+1;
                    //alert(filtro[filtro.length-1].CodPresupuesto.substring(2,4));
                }else
                    toca=1;
        
                let concat='0';
                if (toca>=10)
                    concat='';
                setPresupuestoN( (state) => ({...state,CodPresupuesto:concat+toca}));
            }

        }else{
            //PARA MODIFICAR RECUPERAMOS DATOS

            const filtro = proyects.treePartyControl.find((filtro1) => filtro1.CodPresupuesto === itemSelected);
            if (filtro) {
                //toca= parseInt(filtro[filtro.length-1].CodPresupuesto,10)+1;
                setPresupuestoN( (state) => ({...state,ERPCode:filtro.ERPCode,Descripcion:filtro.Descripcion, Nivel:filtro.Nivel, Fila:filtro.Fila, PhantomId:filtro.PhantomId, PhantomParentId:filtro.PhantomParentId }));
            }
            
            

        }

        

      

        

    }, [])

 
    const CambiaDescripcion = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        setPresupuestoN( (state) => ({...state,Descripcion:data.value}));
	}
    
    const CambiaCodigo = (data) => {
		//console.log(data)        
        //alert(data.event.keyCode)
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='';
        }
        if (data.value.length>2){
            data.value=data.value.substring(0,2);
        }



        if (presupuestoN.Nivel===1){
            const filtro = proyects.treePartyControl.filter((filtro1) => filtro1.CodPresupuesto === data.value);       
            if (filtro.length!==0)
            {
                Swal.fire(
                    'Error!',
                    'Este Codigo ya está ocupado!',
                    'error'
                  )
                data.value='';
            }
            setPresupuestoN( (state) => ({...state,CodPresupuesto:data.value}));
    
        }else{

            const filtro = proyects.treePartyControl.filter((filtro1) => filtro1.CodPresupuesto === itemSelected+data.value);       
            if (filtro.length!==0)
            {
                Swal.fire(
                    'Error!',
                    'Este Codigo ya está ocupado!',
                    'error'
                  )
                data.value='';
            }
            setPresupuestoN( (state) => ({...state,CodPresupuesto:data.value}));


        }


	}

    


    const valida = (e) => {

        /*CodPresupuesto: "01"
        Descripcion: "ADMINISTRATIVO TRIADA"
        ERPCode: "01"
        Fila: 1
        Nivel: 1
        PhantomId: "01"
        PhantomParentId: null*/
        if (accion===1){
            if (presupuestoN.Nivel===1){
                const Nuevo=[{
                    CodPresupuesto: presupuestoN.CodPresupuesto,
                    Descripcion: presupuestoN.Descripcion,
                    ERPCode: presupuestoN.CodPresupuesto,
                    Fila: presupuestoN.Fila,
                    Nivel: presupuestoN.Nivel,
                    PhantomId: presupuestoN.CodPresupuesto,
                    PhantomParentId: null
                }];            
                dispatch(guardarGrupo(presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 1, ''));
                dispatch(agregaGrupo1(Nuevo));
            }else{
                const Nuevo=[{
                    CodPresupuesto: itemSelected+presupuestoN.CodPresupuesto,
                    Descripcion: presupuestoN.Descripcion,
                    ERPCode: itemSelected+presupuestoN.CodPresupuesto,
                    Fila: presupuestoN.Fila,
                    Nivel: presupuestoN.Nivel,
                    PhantomId: itemSelected+presupuestoN.CodPresupuesto,
                    PhantomParentId: itemSelected
                }];               
                dispatch(guardarGrupo(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 2, ''));
                dispatch(agregaGrupo1(Nuevo));
            }
            
    
            Swal.fire(
                'Bien!',
                'Los datos de tu nuevo Grupo ' + presupuestoN.Descripcion + ' se almacenaron Correctamente!',
                'success'
              )


        }else{
            // MODIFICAR EL REGISTRO EN BD Y EN MEMORIA
            const Nuevo=[{
                ERPCode: presupuestoN.ERPCode,
                CodPresupuesto: itemSelected,
                Descripcion: presupuestoN.Descripcion,
                Fila: presupuestoN.Fila,
                Nivel: presupuestoN.Nivel,
                PhantomId: presupuestoN.PhantomId,
                PhantomParentId: presupuestoN.PhantomParentId,
            }];                  
            
            dispatch(modificarGrupo(itemSelected, presupuestoN.Descripcion, presupuestoN.Nivel, ''));
            dispatch(modificaGrupo1(Nuevo));

            Swal.fire(
                'Bien!',
                'Los datos de tu Grupo ' + presupuestoN.Descripcion + ' se modificaron Correctamente!',
                'success'
              )
              
              

        }
          setNuevoGrupo(false);
          e.preventDefault();
          
    }
    
    
    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '0px', marginTop: '10px', height: '96%', width: '100%' }}>
            
            {selecOP === 1 ?
                (<Card className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: '20vh', padding: '15px' }}>
                    <Card.Header style={{fontSize:'1rem', marginLeft:'50px'}}>Nuevo Grupo (Nivel {presupuestoN.Nivel})
                            
                    </Card.Header>
                    <Card.Body>

                        <Form onSubmit={valida}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: '300px', top: '13px' }} 
                            /*onClick={() => {
                            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {

                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Ingrese todos los campos',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        }}*/><i class="far fa-save"></i>   Guardar</Button1>
                            <Form.Group as={Row} className="mb-1 mt-3" controlId="formCodigo" >
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    
                            </Form.Label>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Codigo
                            </Form.Label>
                                {presupuestoN.Nivel == 2 || accion===2 ?
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}
                                    
                                    <TextBox
                                        defaultValue={itemSelected ? itemSelected : ''}
                                        value={itemSelected ? itemSelected : ''}
                                        readOnly={true}
                                    >
                                    <Validator>
                                    <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </TextBox>
                                </Col>:''}
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}
                                    {accion===1 ?
                                    <TextBox
                                        defaultValue={presupuestoN.CodPresupuesto}
                                        value={presupuestoN.CodPresupuesto}
                                        readOnly={false}
                                        //onValueChanged={CambiaCodigo}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaCodigo}
                                        
                                    >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </TextBox> :''}

                                    {/* <NumberBox
                                    //showSpinButtons={true}
                                    //defaultValue="005"
                                    defaultValue={presupuestoN.CodPresupuesto}
                                    value={presupuestoN.CodPresupuesto}                                    
                                    valueChangeEvent="keyup"
                                    onValueChanged={CambiaCodigo}
                                    //rtlEnabled={this.state.rtlEnabled}
                                    >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </NumberBox> */}
                                </Col>
                            </Form.Group>

                            


                            <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                </Form.Label>

                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Descripcion
                                </Form.Label>
                                <Col sm={9}>
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={presupuestoN.Descripcion}
                                        value={presupuestoN.Descripcion}
                                        onValueChanged={CambiaDescripcion}
                                    //readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                    </TextBox>
                                </Col>
                            </Form.Group>


                            




                            <Form.Group as={Row} className="mb-3">
                                    <ValidationSummary id="summary" style={{ position:'relative', marginLeft:'45%'}}></ValidationSummary>                               
                            </Form.Group>
                        </Form>


                    </Card.Body>
                </Card>)
                :''
                
            }

        </div>
    )
}

export default DatosGrupoAdd
