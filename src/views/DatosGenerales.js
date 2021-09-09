import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { actPresupuesto, cambiaSeleccion, limpiaUbicaciones, modificaGrupo1, modificarPresupuesto, ModificarSubPresupuesto, modificaSub, modificaSub1, selectCLIENTES, selectMODELOS, selectMONEDAS, selectUBICACIONES, SelectUrn } from '../actions/proyects.actions';
import BuscaCliente from '../components/BuscaCliente';
import BuscaUbicacion from '../components/BuscaUbicacion';
import { ViewerSc } from './ViewerSc';
import Swal from 'sweetalert2'
import BuscaModelo from '../components/BuscaModelo';
import BuscaMoneda from '../components/BuscaMoneda';
import { DateBox, SelectBox, TextBox } from 'devextreme-react';
import Button1 from 'devextreme-react/button';
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

const DatosGenerales = ({ setCambioSub }) => {

    /*const [ItemSub, setItemSub] = useState({ });*/

    const initialP = {
        CodPresupuesto: '',
        CodAlterno: '',
        Descripcion: '',
        CodCliente: '',
        Cliente: '',
        CodLugar: '',
        UbicacionGeografica: '',
        Fecha: hoy,
        HistoricoPrecios: '',
        Plazo: '0',
        Jornada: '8.00',
        JornadaSemana: '0.00',
        JornadaMes: '0.00',
        JornadaAno: '0.00',
        CodMoneda: '',
        Moneda: '',
        SimboloMoneda: '',
        CostoDirectoBase1: '0.00',
        CostoIndirectoBase1: '0.00',
        CostoBase1: '0.00',
        CostoDirectoOferta1: '0.00',
        CostoIndirectoOferta1: '0.00',
        CostoOferta1: '0.00',
        ERPCode: '',
        Fila: null,
        Nivel: null,
        PhantomId: '',
        PhantomParentId: ''
    }


    const [presupuestoN, setPresupuestoN] = useState(initialP);


    const [show, setShow] = useState(false);
    const [showUb, setShowUb] = useState(false);
    const [showMdl, setShowMdl] = useState(false);
    const [showMnd, setShowMnd] = useState(false);

    const [subseleccionado, setSubSeleccionado] = useState(null);


    const [historicoSel, setHistoricoSel] = useState("");
    const [historicos, setHistoricos] = useState([]);


    //VARIABLES PARA TAMAÑO DE PANTALLA
    const [titulos, setTitulos] = useState('100%');




    //let history = useHistory();
    //const classes = useStyles();
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);

    /*const [ allLevels, setAllLevels ] = useState(null)
    const [ itemSelected, setItemSelected ] = useState('')
    const [ lastLevel, setLastLevel ] = useState(0);

    const [ allLevels1, setAllLevels1 ] = useState(null)
    const [ itemSelected1, setItemSelected1 ] = useState('')
    const [ lastLevel1, setLastLevel1 ] = useState(0);*/


    //const [loading, setLoading] = useState(true);

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
                                        valueChangeEvent="keyup"
                                        onValueChanged={(e) => { CambiaDescripcionsub(e, filter) }}
                                    //rtlEnabled={true}
                                    //readOnly={true}
                                    />
                                </Col>
                                <Col sm={1}>
                                    <Button1 variant="outline-info" style={{ height: '25px', marginLeft: '-15px' }} onClick={() => {
                                        modifica_desc(filter)
                                    }}><i class="far fa-save" style={{ position: 'relative', top: '-5px' }}></i></Button1>
                                </Col>

                            </Form.Group>
                        </td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        <td align="left">{filter.NombreModelo ? filter.NombreModelo : 'No asignado'} <Button1 style={{ position: 'absolute', right: '40px', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></Button1>
                            <Button1 style={{ position: 'absolute', right: '10px', width: "20px", height: '20px' }} onClick={() => { Elimina(filter) }}><i class="far fa-trash-alt" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></Button1>
                        </td>
                    </tr>
                    )
                }) : ''
        )
    }


    function formatNumber(num) {
        if (!num || num == 'NaN') return '0.00';
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

    const CambiaDescripcionsub = (data, filter) => {
        setCambioSub(true);

        //console.log(filter);
        //console.log('ESTOS SON MIS SUBPRSUPUESTOS');
        //console.log(proyects.treeSubControl);
        const Modificado = [{
            CodSubpresupuesto: filter.CodSubpresupuesto,
            Descripcion: data.value,
            Cantidad: 1,
            CodAlterno: filter.CodAlterno,
            CodModelo: filter.CodModelo,
            CostoOferta1: filter.CostoOferta1,
            CostoOferta2: filter.CostoOferta2,
            NombreModelo: filter.NombreModelo,
            UrnWeb: filter.UrnWeb
        }];
        dispatch(modificaSub(Modificado));

        /*for (let i=0;i<proyects.treeSubControl.length;i++)
        {
            if (proyects.treeSubControl[i].CodSubpresupuesto === filter.CodSubpresupuesto){
                proyects.treeSubControl[i].Descripcion=data.value;
                alert(proyects.treeSubControl[i].Descripcion)      
            }
            
        }
        //treeSubControl.filter( (filtro1) => filtro1.PhantomParentId === Item.CodMedicion );
        
        //alert(data.value)
        //filter.Descripcion=data.value;
        //alert(filter.Descripcion)
        /*if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }*/
        //setPresupuestoN( (state) => ({...state,Descripcion:data.value}));
    }


    const modifica_desc = (dato) => {

        //alert(proyects.DatosPresupuesto[0].CodPresupuesto + " " + dato.CodSubpresupuesto + ' ' + dato.Descripcion + ' ' + dato.CodModelo );
        dispatch(ModificarSubPresupuesto(proyects.DatosPresupuesto[0].CodPresupuesto, dato.CodSubpresupuesto, dato.Descripcion, dato.CodModelo, ''));
        console.log(proyects.subPres);
        const Modificado1 = [{
            CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
            CodSubpresupuesto: dato.CodSubpresupuesto,
            Descripcion: dato.Descripcion,
        }];

        dispatch(modificaSub1(Modificado1));

        /*if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {


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
        }*/

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


    const Elimina = (dato) => {
        //alert(dato.CodSubpresupuesto);
        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {


            //setShowMdl(true);
            //setSubSeleccionado(dato);
            if (dato.CodModelo == null || dato.CodModelo == '') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Este Subpresupuesto no tiene un modelo asignado',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })


            } else {

                dato.CodModelo = '';
                dato.NombreModelo = '';
                dispatch(ModificarSubPresupuesto(proyects.DatosPresupuesto[0].CodPresupuesto, dato.CodSubpresupuesto, dato.Descripcion, '', ''));
                console.log(dato);
                console.log("DISPATCH");
                console.log(proyects.DatosPresupuesto[0].CodPresupuesto, dato.CodSubpresupuesto, dato.Descripcion, '', '');

                setShowMdl(true);
                setSubSeleccionado(dato);
                setTimeout(() => {
                    setShowMdl(false);
                }, 20);
                dispatch(SelectUrn(''));
                //drawerItems();

            }

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


    /*useEffect(() => {
       
    }, [proyects.DatosPresupuesto[0].CodModelo])*/


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
                                    valueChangeEvent="keyup"
                                    onValueChanged={(e) => { CambiaDescripcionsub(e, filter) }}

                                //rtlEnabled={true}
                                //readOnly={true}
                                />
                            </Col>
                            <Col sm={1}>
                                <Button1 variant="outline-info" style={{ height: '25px', marginLeft: '-15px' }} onClick={() => {
                                    modifica_desc(filter)
                                }}><i class="far fa-save" style={{ position: 'relative', top: '-5px' }}></i></Button1>
                            </Col>

                        </Form.Group></td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        {/* <td align="left">{filter.NombreModelo ? filter.NombreModelo : 'No asignado'} <div className="btn btn-outline-info" style={{ position: 'absolute', right: '20px', color: '#3c8dbc', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></div></td> */}
                        <td align="left">{filter.NombreModelo ? filter.NombreModelo : 'No asignado'} <Button1 style={{ position: 'absolute', right: '40px', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></Button1>
                            <Button1 style={{ position: 'absolute', right: '10px', width: "20px", height: '20px' }} onClick={() => { Elimina(filter) }}><i class="far fa-trash-alt" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></Button1>
                        </td>
                    </tr>
                    )
                }) : ''
        )
    }



    useEffect(() => {
        if (!proyects.DataModelos) {
            dispatch(selectMODELOS(''));
            //alert('');
        }
        //alert(proyects.treeSubControl.length);
        /*console.log("LOS SUBPRESUPUESTOS AHORA SON");
        console.log(proyects.treeSubControl);
        console.log("ACTUALMENTE LOS MODELOS");
        console.log(proyects.DataModelos);*/
        for (let i = 0; i < proyects.treeSubControl.length; i++) {
            const reg = proyects.DataModelos.find((filtro1) => filtro1.CodPlano === proyects.treeSubControl[i].CodModelo);
            if (reg) {
                proyects.treeSubControl[i].NombreModelo = reg.NombreArchivoRvt;
                //alert(proyects.treeSubControl[i].CodModelo);    
            } else
                proyects.treeSubControl[i].NombreModelo = null;
        }
    }, [proyects.treeSubControl])

    useEffect(() => {
        //console.log('datos de subProyectos actualizados')
        //alert(proyects.seleccionado+"");
        if (proyects.seleccionado === undefined) return;
        //if (proyects.treePartyControl == undefined) return;
        setselecOP(proyects.seleccionado)
        //alert(proyects.seleccionado);


        /* if (proyects.seleccionado === 1)
         {
             if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]){
                 if (proyects.DatosPresupuesto[0].HistoricoPrecios){
                     let A_historicos=proyects.DatosPresupuesto[0].HistoricoPrecios.split("|");
                     setHistoricos(A_historicos);
                     setHistoricoSel(historicos[0]);
                     alert(historicos[0]);
                     //proyects.DatosPresupuesto[0].HistoricoPrecios;
                 }
                 
                 
             }
             
 
 
         }*/
        //if (selecOP === 1) setselecOP(2); else setselecOP(1);

    }, [proyects.seleccionado])



    useEffect(() => {
        //if (proyects.seleccionado === undefined) return;
        //setselecOP(proyects.seleccionado)


        //alert(proyects.AuxModelo);
    }, [proyects.AuxModelo])


    //establecer tamaños y posiciones
    useEffect(() => {
        /*if (window.innerWidth >= 2000) {
            //alert('es de' + window.innerWidth)
            setTitulos('100%');
        } else if (window.innerWidth >= 1640) {
            //alert('2do caso es de' + window.innerWidth)
            setTitulos('90%');
        } else if (window.innerWidth >= 1440) {
            //alert('2do caso es de' + window.innerWidth)
            setTitulos('85%');
        } else if (window.innerWidth >= 1024) {
            //alert('3er caso es de' + window.innerWidth)
            setTitulos('80%');
        } else if (window.innerWidth >= 768) {
            //alert('4to caso es de' + window.innerWidth)        
            setTitulos('75%');
        } else if (window.innerWidth >= 425) {
            setTitulos('70%');
            //alert('5to caso es de' + window.innerWidth)        
        }*/
        console.log('ESTE ES MI PROJECTS. DATOPS PRESUPUESTO');
        console.log(proyects.DatosPresupuesto);

        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]) {


            const estadoI = {
                CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
                CodAlterno: proyects.DatosPresupuesto[0].CodAlterno,
                Descripcion: proyects.DatosPresupuesto[0].Descripcion,
                CodCliente: proyects.DatosPresupuesto[0].CodCliente,
                Cliente: proyects.DatosPresupuesto[0].Cliente,
                CodLugar: proyects.DatosPresupuesto[0].CodLugar,
                UbicacionGeografica: proyects.DatosPresupuesto[0].UbicacionGeografica,
                Fecha: proyects.DatosPresupuesto[0].Fecha.substring(0, 10),
                //HistoricoPrecios: proyects.DatosPresupuesto[0].CodPresupuesto,
                Plazo: proyects.DatosPresupuesto[0].Plazo,
                Jornada: formatNumber(proyects.DatosPresupuesto[0].Jornada),
                JornadaSemana: formatNumber(proyects.DatosPresupuesto[0].JornadaSemana),
                JornadaMes: formatNumber(proyects.DatosPresupuesto[0].JornadaMes),
                JornadaAno: formatNumber(proyects.DatosPresupuesto[0].JornadaAno),
                CodMoneda: proyects.DatosPresupuesto[0].CodMoneda,
                Moneda: proyects.DatosPresupuesto[0].Moneda,
                SimboloMoneda: proyects.DatosPresupuesto[0].SimboloMoneda,
                CostoDirectoBase1: formatNumber(proyects.DatosPresupuesto[0].CostoDirectoBase1),
                CostoIndirectoBase1: formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoBase1),
                CostoBase1: formatNumber(proyects.DatosPresupuesto[0].CostoBase1),
                CostoDirectoOferta1: formatNumber(proyects.DatosPresupuesto[0].CostoDirectoOferta1),
                CostoIndirectoOferta1: formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoOferta1),
                CostoOferta1: formatNumber(proyects.DatosPresupuesto[0].CostoOferta1),
                ERPCode: '',
                Fila: null,
                Nivel: null,
                PhantomId: '',
                PhantomParentId: ''
            }
            setPresupuestoN(estadoI);
        }
        dispatch(selectMONEDAS(''));
        dispatch(selectCLIENTES('', ''));


    }, [])



    useEffect(() => {
        setHistoricos([]);
        setHistoricoSel('');

        if (proyects.seleccionado === 1) {
            //alert('');
            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]) {
                if (proyects.DatosPresupuesto[0].HistoricoPrecios) {
                    let A_historicos = proyects.DatosPresupuesto[0].HistoricoPrecios.split("|");
                    setHistoricos(A_historicos);
                    //alert(A_historicos[0]);
                    setHistoricoSel(A_historicos[0]);
                    //alert(historicos[0]);
                    //proyects.DatosPresupuesto[0].HistoricoPrecios;
                }
            }
        }
        //if (selecOP === 1) setselecOP(2); else setselecOP(1);
    }, [proyects.DatosPresupuesto])









    const CambiaDescripcion = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        setPresupuestoN( (state) => ({...state,Descripcion:data.value}));
	}
   
   
  
    const CambiaCodigoAlterno = (data) => {
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
        if (data.value.length>20){
            data.value=data.value.substring(0,20);
        }
        setPresupuestoN( (state) => ({...state,CodAlterno:data.value}));
	}

    const CambiaCodigoCliente = (data) => {
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
        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }

        const regm = proyects.DataClientes.find((filtro1) => filtro1.CodIdentificador === data.value);
        if (regm)
            setPresupuestoN( (state) => ({...state,Cliente:regm.Descripcion }));
        else
            setPresupuestoN( (state) => ({...state,Cliente:'' }));
        
        setPresupuestoN( (state) => ({...state,CodCliente:data.value}));
	}


    const CambiaPlazo = (data) => {
       
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
        

        if (data.value.length>6){
            data.value=data.value.substring(0,6);
        }        
            
        if (data.value!=='')
        data.value=parseInt(data.value,10)+'';



        setPresupuestoN( (state) => ({...state,Plazo:data.value}));
	}

    const CambiaJornada = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPresupuestoN( (state) => ({...state,Jornada:data.value}));
	}

    const CambiaJornadaSemana = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPresupuestoN( (state) => ({...state,JornadaSemana:data.value}));
	}

    const CambiaJornadaMes = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPresupuestoN( (state) => ({...state,JornadaMes:data.value}));
	}

    const CambiaJornadaAno = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPresupuestoN( (state) => ({...state,JornadaAno:data.value}));
	}

    const CambiaCodigoMoneda = (data) => {
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

        const regm = proyects.DataMonedas.find((filtro1) => filtro1.CodMoneda === data.value);
        if (regm)
            setPresupuestoN( (state) => ({...state,Moneda:regm.Descripcion }));
        else
            setPresupuestoN( (state) => ({...state,Moneda:'' }));
        
        setPresupuestoN( (state) => ({...state,CodMoneda:data.value}));
	}

    const CambiaCDBase = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>16){
            data.value=data.value.substring(0,16);
        }
        let total=parseFloat(parseFloat(data.value) + parseFloat(presupuestoN.CostoIndirectoBase1));
        let total1=roundN(total,2);
        setPresupuestoN( (state) => ({...state,CostoDirectoBase1:data.value, CostoBase1:total1}));
	}

    const CambiaCIBase = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>16){
            data.value=data.value.substring(0,16);
        }
        let total=parseFloat(parseFloat(data.value) + parseFloat(presupuestoN.CostoDirectoBase1));
        let total1=roundN(total,2);
        setPresupuestoN( (state) => ({...state,CostoIndirectoBase1:data.value, CostoBase1:total1}));
	}



    const onCurrentValueChanged = (e) => {
        setPresupuestoN( (state) => ({...state, Fecha:e.value}));
        /*this.setState({
          currentValue: e.value
        });*/
      }






    const valida = (e) => {

        



        /*alert(presupuestoN.Fecha.substring(0,4));
        alert(presupuestoN.Fecha.substring(5,7));
        alert(presupuestoN.Fecha.substring(8,10));*/
        
        
        /*let dia=parseInt(fecha1.getDate(),10)+1;
        let mes=parseInt(fecha1.getMonth(),10)+1;*/
        //let fechaStr = dia + "/" + mes + '/' + fecha1.getFullYear();

        let fechaStr = presupuestoN.Fecha.substring(8,10) + "/" + presupuestoN.Fecha.substring(5,7) + '/' + presupuestoN.Fecha.substring(0,4);
        dispatch(modificarPresupuesto(presupuestoN.CodPresupuesto, presupuestoN.Descripcion, presupuestoN.Plazo,  fechaStr, presupuestoN.Jornada, '0' ,presupuestoN.CostoDirectoBase1,presupuestoN.CostoIndirectoBase1,presupuestoN.CostoBase1,presupuestoN.CostoDirectoOferta1,presupuestoN.CostoIndirectoOferta1,presupuestoN.CostoOferta1,presupuestoN.CodCliente,presupuestoN.CodLugar,presupuestoN.CodMoneda,'',presupuestoN.CodAlterno,presupuestoN.JornadaSemana,presupuestoN.JornadaMes,presupuestoN.JornadaAno,''));                
        dispatch(actPresupuesto(presupuestoN));
        
        Swal.fire(
            'Bien!',
            'Los datos de tu nuevo Presupuesto ' + presupuestoN.Descripcion + ' se modificaron Correctamente!',
            'success'
          )
        
          const filtro = proyects.treePartyControl.find((filtro1) => filtro1.CodPresupuesto === presupuestoN.CodPresupuesto);
          if (filtro) {
              //toca= parseInt(filtro[filtro.length-1].CodPresupuesto,10)+1;
              //setPresupuestoN( (state) => ({...state,ERPCode:filtro.ERPCode,Descripcion:filtro.Descripcion, Nivel:filtro.Nivel, Fila:filtro.Fila, PhantomId:filtro.PhantomId, PhantomParentId:filtro.PhantomParentId }));
              const Nuevo=[{
                ERPCode: filtro.ERPCode,
                CodPresupuesto: filtro.CodPresupuesto,
                Descripcion: presupuestoN.Descripcion,
                Fila: filtro.Fila,
                Nivel: filtro.Nivel,
                PhantomId: filtro.PhantomId,
                PhantomParentId: filtro.PhantomParentId,
            }];                  
                        
            dispatch(modificaGrupo1(Nuevo));
          
          
            }

          

        
        /*
        const Nuevo=[{
            CodPresupuesto: itemSelected+presupuestoN.CodPresupuesto,
            Descripcion: presupuestoN.Descripcion,
            ERPCode: itemSelected+presupuestoN.CodPresupuesto,
            Fila: presupuestoN.Fila,
            Nivel: 3,
            PhantomId: itemSelected+presupuestoN.CodPresupuesto,
            PhantomParentId: itemSelected
        }];            
        
        
        let fecha1=new Date(presupuestoN.Fecha);
        let mes=parseInt(fecha1.getMonth(),10)+1;
        let fechaStr =fecha1.getDate() + "/" + mes + '/' + fecha1.getFullYear();
        //dispatch(guardarGrupo(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 3, ''));
        
        //dispatch(guardarGrupo(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 3, ''));
        dispatch(agregaGrupo1(Nuevo));

        setTimeout(() => {            
            dispatch(guardarPresupuesto(presupuestoN.CodPresupuesto, presupuestoN.Descripcion, presupuestoN.Plazo,  fechaStr, presupuestoN.Jornada, '0' ,presupuestoN.CostoDirectoBase1,presupuestoN.CostoIndirectoBase1,presupuestoN.CostoBase1,presupuestoN.CostoDirectoOferta1,presupuestoN.CostoIndirectoOferta1,presupuestoN.CostoOferta1,presupuestoN.CodCliente,presupuestoN.CodLugar,presupuestoN.CodMoneda,'',presupuestoN.CodAlterno,presupuestoN.JornadaSemana,presupuestoN.JornadaMes,presupuestoN.JornadaAno,''));                
        }, 1000);
        

        const Modificado1=[{
            CodPresupuesto: itemSelected+presupuestoN.CodPresupuesto,
            CodSubpresupuesto: '001',
            Descripcion: presupuestoN.Descripcion,
        }];   
        
        dispatch(agregaSub1(Modificado1));



        console.log('LOS DATOS QUE SE GUARDARIAN')
        console.log(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, presupuestoN.Plazo,  fechaStr, presupuestoN.Jornada, '0' ,presupuestoN.CostoDirectoBase1,presupuestoN.CostoIndirectoBase1,presupuestoN.CostoBase1,presupuestoN.CostoDirectoOferta1,presupuestoN.CostoIndirectoOferta1,presupuestoN.CostoOferta1,presupuestoN.CodCliente,presupuestoN.CodLugar,presupuestoN.CodMoneda,'',presupuestoN.CodAlterno,presupuestoN.JornadaSemana,presupuestoN.JornadaMes,presupuestoN.JornadaAno,'')

        


          
          setNuevoPres(false);*/

        
          
          e.preventDefault();
    }


    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '0px', marginTop: '10px', height: '96%', width: '98%' }}>
            <BuscaCliente tipo="Modificar" presupuestoN={presupuestoN} setShow={setShow} show={show} />
            <BuscaUbicacion tipo="Modificar" presupuestoN={presupuestoN} setShow={setShowUb} show={showUb} />
            <BuscaModelo
                setShow={setShowMdl}
                subseleccionado={subseleccionado}
                setSubSeleccionado={setSubSeleccionado}
                CodPresupuesto={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''}
                show={showMdl}
            />
            <BuscaMoneda tipo="Modificar" presupuestoN={presupuestoN} setShow={setShowMnd} show={showMnd} />
            {selecOP === 1 ?
                (<Card className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: '92vh', padding: '15px' }}>
                    <Card.Header style={{fontSize:'1rem', background:'#398bf7', color:'white' }}>Datos Generales</Card.Header>
                    <Card.Body>

                    <Form onSubmit={valida}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: '210px', top: '25px' }} ><i class="far fa-save"></i>   Actualizar</Button1>
                            <Form.Group as={Row} className="mb-1" controlId="formCodigo">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Codigo
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.CodPresupuesto}
                                        value={presupuestoN.CodPresupuesto}
                                        readOnly={true}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formAlterno">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Alterno
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="Alterno" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodAlterno : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.CodAlterno}
                                        value={presupuestoN.CodAlterno}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaCodigoAlterno}
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Descripcion
                            </Form.Label>
                                <Col sm={10}>
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={presupuestoN.Descripcion}
                                        value={presupuestoN.Descripcion}
                                        onValueChanged={CambiaDescripcion}
                                    >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                    </TextBox>                                        
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formCliente">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Cliente
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="ID Cliente" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodCliente : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.CodCliente}
                                        value={presupuestoN.CodCliente}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaCodigoCliente}
                                    >
                                    <Validator>
                                        <RequiredRule message="Cliente es requerido" />
                                    </Validator>
                                    </TextBox>    
                                </Col>
                                <Col sm={8}>
                                    {/* <Form.Control type="Input" placeholder="Cliente" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Cliente : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.Cliente}
                                        value={presupuestoN.Cliente}
                                        readOnly={true}
                                        >
                                        <Validator>
                                            <RequiredRule message="Cliente es requerido" />
                                        </Validator>
                                    </TextBox>
                                </Col>

                                <Col sm={1}>
                                    <Button1 variant="outline-info" style={{ height: "35px" }} onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShow(true);
                                            //dispatch(selectCLIENTES('', ''));
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}>...</Button1>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Ubicación Geográfica
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="ID Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodLugar : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={presupuestoN.CodLugar}
                                        value={presupuestoN.CodLugar}
                                        readOnly={true}
                                        >
                                        <Validator>
                                            <RequiredRule message="Ubicación es requerida" />
                                        </Validator>
                                    </TextBox>
                                </Col>
                                <Col sm={7}>
                                    {/* <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.UbicacionGeografica}
                                        value={presupuestoN.UbicacionGeografica}
                                        readOnly={true}
                                        >
                                        <Validator>
                                            <RequiredRule message="Ubicación es requerida" />
                                        </Validator>
                                    </TextBox>
                                </Col>

                                <Col sm={1}>
                                    <Button1 variant="outline-info" style={{ height: "35px" }} onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShowUb(true); /*dispatch(limpiaUbicaciones());*/ dispatch(selectUBICACIONES('', '20', '1', ''));
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }

                                    }}>...</Button1>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formDF">
                                <Form.Label column sm={10}>

                                </Form.Label>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formFecha">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Fecha
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Date" placeholder="Fecha" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? (proyects.DatosPresupuesto[0].Fecha).substring(0, 10) : ''} onChange={handlerOnChange} /> */}



                                    <DateBox
                                        //defaultValue={this.now}
                                        defaultValue={presupuestoN.Fecha}
                                        value={presupuestoN.Fecha}
                                        onValueChanged={onCurrentValueChanged}
                                        type="date" />


                                </Col>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Histórico
                            </Form.Label>

                                <Col sm={3}>

                                    <SelectBox items={historicos}
                                        defaultValue={historicoSel}
                                        value={historicoSel}
                                    //readOnly={true} 
                                    />

                                    {/* <InputGroup className="mb-1">
                                        <FormControl aria-label="" value={historicoSel} />
                                        <DropdownButton
                                            variant="outline-secondary"
                                            title=""
                                            id="input-group-dropdown-2"
                                            align="end"
                                        >
                                            {
                                                historicos.map((ff) => {
                                                    return (<Dropdown.Item >{ff}</Dropdown.Item>)
                                                }
                                                )

                                            }
                                        </DropdownButton>
                                    </InputGroup> */}
                                </Col>

                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Plazo
                            </Form.Label>

                                <Col sm={2} style={{ fontSize: { titulos } }}>
                                    {/* <Form.Control type="Text" placeholder="Plazo" style={{ textAlign: 'right' }} value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].Plazo) : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.Plazo}
                                        value={presupuestoN.Plazo}
                                        rtlEnabled={true}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaPlazo}
                                        onFocusOut={()=>{
                                            if (presupuestoN.Plazo===''){
                                                setPresupuestoN( (state) => ({...state,Plazo:'0'}));
                                            }
                                        }}
                                    //readOnly={true}
                                    />
                                </Col>

                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    días
                            </Form.Label>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formJornada">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Jornada diaria
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].Jornada) : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.Jornada}
                                        value={presupuestoN.Jornada}
                                        rtlEnabled={true}
                                    //readOnly={true}
                                        valueChangeEvent="keyup"
                                            onValueChanged={CambiaJornada}
                                            onFocusOut={()=>{
                                                if (presupuestoN.Jornada.trim()===''){
                                                    setPresupuestoN( (state) => ({...state,Jornada:'0.00'}));
                                                }
                                            }}
                                    //readOnly={true}
                                    />

                                </Col>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    días
                            </Form.Label>



                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Semanal
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaSemana) : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.JornadaSemana}
                                        value={presupuestoN.JornadaSemana}
                                        rtlEnabled={true}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaJornadaSemana}
                                        onFocusOut={()=>{
                                            if (presupuestoN.JornadaSemana.trim()===''){
                                                setPresupuestoN( (state) => ({...state,JornadaSemana:'0.00'}));
                                            }
                                        }}

                                    //readOnly={true}
                                    />

                                </Col>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    horas
                            </Form.Label>


                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Mensual
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaMes) : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.JornadaMes}
                                        value={presupuestoN.JornadaMes}
                                        rtlEnabled={true}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaJornadaMes}
                                        onFocusOut={()=>{
                                            if (presupuestoN.JornadaMes.trim()===''){
                                                setPresupuestoN( (state) => ({...state,JornadaMes:'0.00'}));
                                            }
                                        }}

                                    //readOnly={true}
                                    />
                                </Col>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    horas
                            </Form.Label>

                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Año
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaAno) : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.JornadaAno}
                                        value={presupuestoN.JornadaAno}
                                        rtlEnabled={true}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaJornadaAno}
                                        onFocusOut={()=>{
                                            if (presupuestoN.JornadaAno.trim()===''){
                                                setPresupuestoN( (state) => ({...state,JornadaAno:'0.00'}));
                                            }
                                        }}

                                    //readOnly={true}
                                    />
                                </Col>
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    horas
                            </Form.Label>


                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formMoneda">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Moneda Principal
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="ID Moneda" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodMoneda : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.CodMoneda}
                                        value={presupuestoN.CodMoneda}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaCodigoMoneda}
                                        /*onFocusOut={()=>{
                                            if (presupuestoN.Plazo.trim()===''){
                                                setPresupuestoN( (state) => ({...state,Plazo:'0'}));
                                            }
                                        }}*/
                                    //readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Moneda es requerida" />
                                    </Validator>
                                    </TextBox> 
                                </Col>
                                <Col sm={4}>
                                    {/* <Form.Control type="Input" placeholder="Modeda" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Moneda : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={presupuestoN.Moneda}
                                        value={presupuestoN.Moneda}
                                        //stylingMode={'underlined'}                                    
                                        readOnly={true}
                                        >
                                        <Validator>
                                            <RequiredRule message="Moneda es requerida"/>
                                        </Validator>
                                        </TextBox>     
                                </Col>

                                <Col sm={1}>
                                    <Button1 variant="outline-info" style={{ height: "35px" }} onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShowMnd(true);
                                            //dispatch(selectMONEDAS(''));
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}>...</Button1>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>



                            <Card style={{ height: '100%', width: '100%', marginTop: '25px' }}>
                                <Card.Header style={{ height: '38px' }}> <div style={{ marginTop: '-5px' }}>Moneda Principal ({presupuestoN.SimboloMoneda}) </div> </Card.Header>
                                <Card.Body>

                                    <Form.Group as={Row} className="mb-1" controlId="formPrt2">


                                        <Col sm={6}>
                                            <Card style={{ height: '100%' }}>
                                                <Card.Header style={{ height: '30px' }}> <p style={{ marginTop: '-5px' }}>Presupuesto Base </p></Card.Header>
                                                <Card.Body column sm={5} >
                                                    <Form.Group as={Row} className="mb-1" controlId="formCD1">
                                                        <Form.Label column sm={1}>
                                                        </Form.Label>

                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            C.D.
                                                </Form.Label>
                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoDirectoBase1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoDirectoBase1}
                                                                value={presupuestoN.CostoDirectoBase1}
                                                                rtlEnabled={true}
                                                                valueChangeEvent="keyup"
                                                                onValueChanged={CambiaCDBase}
                                                                onFocusOut={()=>{
                                                                    if (presupuestoN.CostoDirectoBase1.trim()===''){
                                                                        setPresupuestoN( (state) => ({...state,CostoDirectoBase1:'0.00'}));
                                                                        let total=parseFloat(presupuestoN.CostoIndirectoBase1);
                                                                        let total1=roundN(total,2);
                                                                        setPresupuestoN( (state) => ({...state, CostoBase1:total1}));                                                                        
                                                                    }
                                                                }}
                                                                //readOnly={true}
                                                            />
                                                        </Col>
                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            C.I.
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoBase1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoIndirectoBase1}
                                                                value={presupuestoN.CostoIndirectoBase1}
                                                                rtlEnabled={true}
                                                                valueChangeEvent="keyup"
                                                                onValueChanged={CambiaCIBase}
                                                                onFocusOut={()=>{
                                                                    if (presupuestoN.CostoIndirectoBase1.trim()===''){
                                                                        setPresupuestoN( (state) => ({...state,CostoIndirectoBase1:'0.00'}));
                                                                        let total=parseFloat(presupuestoN.CostoDirectoBase1);
                                                                        let total1=roundN(total,2);
                                                                        setPresupuestoN( (state) => ({...state, CostoBase1:total1}));                                                                        

                                                                    }
                                                                }}

                                                               // readOnly={true}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1" controlId="formTot">
                                                        <Form.Label column sm={3}>

                                                        </Form.Label>
                                                        <Col sm={3}>

                                                        </Col>
                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            Total
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoBase1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoBase1}
                                                                value={presupuestoN.CostoBase1}
                                                                rtlEnabled={true}
                                                                readOnly={true}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>


                                        <Col sm={6}>
                                            <Card style={{ height: '100%' }}>
                                                <Card.Header style={{ height: '30px' }}> <p style={{ marginTop: '-5px' }}>Presupuesto Oferta </p></Card.Header>
                                                <Card.Body column sm={5} >
                                                    <Form.Group as={Row} className="mb-1" controlId="formOferta">
                                                        <Form.Label column sm={1}>
                                                        </Form.Label>

                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            C.D.
                                                </Form.Label>
                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoDirectoOferta1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoDirectoOferta1}
                                                                value={presupuestoN.CostoDirectoOferta1}
                                                                rtlEnabled={true}
                                                                readOnly={true}
                                                            />

                                                        </Col>
                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            C.I.
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoOferta1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoIndirectoOferta1}
                                                                value={presupuestoN.CostoIndirectoOferta1}
                                                                rtlEnabled={true}
                                                                readOnly={true}
                                                            />

                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1" controlId="formVOferta">
                                                        <Form.Label column sm={3}>

                                                        </Form.Label>
                                                        <Col sm={3}>

                                                        </Col>
                                                        <Form.Label column sm={2} style={{ fontSize: titulos }}>
                                                            Total
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            {/* <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoOferta1) : ''} onChange={handlerOnChange} /> */}
                                                            <TextBox
                                                                defaultValue={presupuestoN.CostoOferta1}
                                                                value={presupuestoN.CostoOferta1}
                                                                rtlEnabled={true}
                                                                readOnly={true}
                                                            />

                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </Form.Group>
                                </Card.Body>
                            </Card>



                            <Card style={{ height: '100%', width: '100%' }}>
                                {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                <Card.Body>
                                    <Form.Group as={Row} className="mb-1" controlId="formGridSub">

                                        <Col sm={12}>
                                            <Table
                                                striped
                                                bordered
                                                hover
                                                size="sm"
                                                className="mt-0 bg-white"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Codigo</th>
                                                        <th>Alterno</th>
                                                        <th>Descripcion</th>
                                                        <th>Cantidad</th>
                                                        <th>Costo Oferta</th>
                                                        <th>Modelo Asignado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <>
                                                        {

                                                            drawerItems()
                                                        }
                                                    </>


                                                </tbody>
                                            </Table>



                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>




                            <Form.Group as={Row} className="mb-3">
                                    <ValidationSummary id="summary" style={{ position:'relative', marginLeft:'45%'}}></ValidationSummary>                               
                            </Form.Group>
                        </Form>


                    </Card.Body>
                </Card>)
                :
                (
                    <Card className="animate__animated animate__fadeInUp" style={{ overflow: 'hidden', height: '100%', padding: '15px' }}>
                        <Card.Header className="" style={{ fontSize:'1rem', background:'#398bf7', color:'white'}}>Datos de SubPresupuesto</Card.Header>
                        <Card.Body>

                            <Form>
                                <Form.Group as={Row} className="mb-1" controlId="formPres">
                                    <Form.Label column sm={2}>

                                    </Form.Label>

                                    <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                        Presupuesto
                                    </Form.Label>
                                    <Col sm={2}>
                                        {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}
                                        <TextBox
                                            defaultValue={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''}
                                            value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''}
                                            rtlEnabled={true}
                                            readOnly={true}
                                        />
                                    </Col>

                                </Form.Group>



                                <Form.Group as={Row} className="mb-1" controlId="formV45">
                                    <Form.Label column sm={2}>
                                    </Form.Label>

                                    <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                        Descripcion
                                    </Form.Label>
                                    <Col sm={7}>
                                        {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}
                                        <TextBox
                                            defaultValue={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''}
                                            value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''}
                                            //rtlEnabled={true}
                                            readOnly={true}
                                        />
                                    </Col>
                                </Form.Group>



                                <Card style={{ height: '100%', width: '100%' }}>
                                    {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                    <Card.Body>
                                        <Form.Group as={Row} className="mb-1" controlId="formGrid2">

                                            <Col sm={12} >
                                                <Table
                                                    striped
                                                    bordered
                                                    hover
                                                    size="sm"
                                                    className="mt-0 bg-white"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Alterno</th>
                                                            <th>Descripcion</th>
                                                            <th>Cantidad</th>
                                                            <th>Costo Oferta</th>
                                                            <th>Modelo Asignado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <>
                                                            {

                                                                drawerItems1()
                                                            }
                                                        </>


                                                    </tbody>
                                                </Table>



                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>





                                {/* <Card style={{ height: '100%', width: '100%' }}>
                                    <Card.Body >
                                        <Form.Group as={Row} className="mb-1" controlId="formGrd3">
                                            
                                            <Col sm={12} style={{ height: window.innerHeight - 500 }}>
                                                <ViewerSc />



                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card> */}



                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        {/* <Button type="submit">Sign in</Button> */}

                                    </Col>
                                </Form.Group>
                            </Form>


                        </Card.Body>
                    </Card>

















                )
            }

        </div>
    )
}

export default DatosGenerales
