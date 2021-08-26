import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { limpiaUbicaciones, selectCLIENTES, selectUBICACIONES } from '../actions/proyects.actions';
import BuscaCliente from '../components/BuscaCliente';
import BuscaUbicacion from '../components/BuscaUbicacion';

import Swal from 'sweetalert2'
import BuscaModelo from '../components/BuscaModelo';
import { ViewerScM } from './ViewerScM';
//import { ViewScreen1 } from './ViewScreen1'

const VisorModelos = () => {

    /*const [ItemSub, setItemSub] = useState({


    });*/

    const [show, setShow] = useState(false);
    const [showUb, setShowUb] = useState(false);
    const [showMdl, setShowMdl] = useState(false);

    const [historicoSel, setHistoricoSel] = useState("");
    const [historicos, setHistoricos] = useState([]);



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
                        <td>{filter.Descripcion}</td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        <td align="left">{filter.CodModelo} <div className="btn btn-outline-info" style={{ position:'absolute', right:'20px', color: '#3c8dbc', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></div></td>
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
            num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + ',' + cents);
    }

    function roundN(num, n) {
        return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    }


    const Selecciona = (dato) => {
        //alert(dato.CodSubpresupuesto);
            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                
                setShowMdl(true);
                dato.CodModelo=proyects.AuxModelo;
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
                        <td>{filter.Descripcion}</td>
                        <td align="right">{formatNumber(filter.Cantidad)}</td>
                        <td align="right">{formatNumber(filter.CostoOferta1)}</td>
                        <td align="left">{filter.CodModelo} <div className="btn btn-outline-info" style={{ position:'absolute', right:'20px', color: '#3c8dbc', width: "20px", height: '20px' }} onClick={() => { Selecciona(filter) }}><i class="far fa-edit" style={{ position: 'absolute', marginTop: '-5px', marginLeft: '-8px' }}></i></div></td>
                    </tr>
                    )
                }) : ''
        )
    }

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




    useEffect(() => {
        setHistoricos([]);
        setHistoricoSel('');

        if (proyects.seleccionado === 1) {
            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]) {
                if (proyects.DatosPresupuesto[0].HistoricoPrecios) {
                    let A_historicos = proyects.DatosPresupuesto[0].HistoricoPrecios.split("|");
                    setHistoricos(A_historicos);
                    setHistoricoSel(A_historicos[0]);
                    //alert(historicos[0]);
                    //proyects.DatosPresupuesto[0].HistoricoPrecios;
                }


            }



        }
        //if (selecOP === 1) setselecOP(2); else setselecOP(1);

    }, [proyects.DatosPresupuesto])

    const handlerOnChange = () => {


    }

    return (
        <div className="animate__animated animate__fadeIn" style={{ overflow: 'hidden', marginTop: '10px', height: '96%', width: '100%' }}>
            <BuscaCliente setShow={setShow} show={show} />
            <BuscaUbicacion setShow={setShowUb} show={showUb} />
            <BuscaModelo setShow={setShowMdl} show={showMdl} />
            
                    <Card className="animate__animated animate__fadeInUp">
                        <Card.Header className="">Modelos (NUBE BIM360)
                 
                        
                        
                                    <Form.Control type="File" placeholder="Subir Archivo"  style={{position:'absolute', right:'220px', top:'3px', width:'660px'}}/>
                                    <Button variant="outline-info" style={{position:'absolute', right:'80px', top:'3px'}} onClick={() => {
                                        
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No ha seleccionado archivo',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        
                                    }}><i class="far fa-save"></i>   Subir Modelo
                                    
                                    
                                    </Button>                       
                        </Card.Header>
                        <Card.Body>

                            <Form>
                                


                            

                                

                                <Card style={{ height: '100%', width: '100%' }}>
                                    {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                    <Card.Body >
                                        <Form.Group as={Row} className="mb-1" controlId="formHorizontalPassword">
                                            
                                            <Col sm={12} style={{ height: window.innerHeight - 150 }}>
                                                <ViewerScM />



                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>



                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        {/* <Button type="submit">Sign in</Button> */}

                                    </Col>
                                </Form.Group>
                            </Form>


                        </Card.Body>
                    </Card>

















                
            

        </div>
    )
}

export default VisorModelos
