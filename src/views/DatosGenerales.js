import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { limpiaUbicaciones, selectCLIENTES, selectMONEDAS, selectUBICACIONES } from '../actions/proyects.actions';
import BuscaCliente from '../components/BuscaCliente';
import BuscaUbicacion from '../components/BuscaUbicacion';
import { ViewerSc } from './ViewerSc';
import Swal from 'sweetalert2'
import BuscaModelo from '../components/BuscaModelo';
import BuscaMoneda from '../components/BuscaMoneda';
//import { ViewScreen1 } from './ViewScreen1'

const DatosGenerales = () => {

    /*const [ItemSub, setItemSub] = useState({


    });*/

    const [show, setShow] = useState(false);
    const [showUb, setShowUb] = useState(false);
    const [showMdl, setShowMdl] = useState(false);
    const [showMnd, setShowMnd] = useState(false);

    const [historicoSel, setHistoricoSel] = useState("");
    const [historicos, setHistoricos] = useState([]);






    //VARIABLES PARA TAMAÑO DE PANTALLA
    const [titulos, setTitulos] = useState('80%');




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

    
    //establecer tamaños y posiciones
    useEffect(() => {  
        if (window.innerWidth >= 2000){
            //alert('es de' + window.innerWidth)
            setTitulos('85%');
        }else if (window.innerWidth >= 1640){
            //alert('2do caso es de' + window.innerWidth)
            setTitulos('65%');
        }else if (window.innerWidth >= 1440){
            //alert('2do caso es de' + window.innerWidth)
            setTitulos('52%');
        }else if (window.innerWidth >= 1024){
            //alert('3er caso es de' + window.innerWidth)
            setTitulos('40%');
        }else if (window.innerWidth >= 768){
            //alert('4to caso es de' + window.innerWidth)        
            setTitulos('35%');
        }else if (window.innerWidth >= 425){
            setTitulos('30%');
            //alert('5to caso es de' + window.innerWidth)        
        }


    }, [])



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
        <div className="animate__animated animate__fadeIn" style={{ marginTop: '10px', height: '96%', width: '100%' }}>
            <BuscaCliente setShow={setShow} show={show} />
            <BuscaUbicacion setShow={setShowUb} show={showUb} />
            <BuscaModelo setShow={setShowMdl} show={showMdl} />
            <BuscaMoneda setShow={setShowMnd} show={showMnd} />
            {selecOP === 1 ?
                (<Card className="animate__animated animate__fadeIn" style={{overflow:'scroll', height: '93vh'}}>
                    <Card.Header>Datos Generales
                                    <Button variant="outline-info" style={{position:'absolute', right:'30px', top:'3px'}} onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                           
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}><i class="far fa-save"></i>   Actualizar</Button>
                    </Card.Header>
                    <Card.Body>

                        <Form>
                            <Form.Group as={Row} className="mb-1" controlId="formCodigo">
                            <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Codigo
                            </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} />
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formAlterno">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Alterno
                            </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="Input" placeholder="Alterno" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodAlterno : ''} onChange={handlerOnChange} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Descripcion
                            </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formCliente">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Cliente
                            </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="Input" placeholder="ID Cliente" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodCliente : ''} onChange={handlerOnChange} />
                                </Col>
                                <Col sm={7}>
                                    <Form.Control type="Input" placeholder="Cliente" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Cliente : ''} onChange={handlerOnChange} />
                                </Col>

                                <Col sm={1}>
                                    <Button variant="outline-info" onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShow(true);
                                            dispatch(selectCLIENTES('', ''));
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}>...</Button>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Ubicación Geográfica
                            </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="Input" placeholder="ID Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodLugar : ''} onChange={handlerOnChange} />
                                </Col>
                                <Col sm={7}>
                                    <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} />
                                </Col>

                                <Col sm={1}>
                                    <Button variant="outline-info" onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShowUb(true); dispatch(limpiaUbicaciones()); dispatch(selectUBICACIONES('', ''));    
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                        
                                    }}>...</Button>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formDF">
                                <Form.Label column sm={10}>

                                </Form.Label>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formFecha">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Fecha
                            </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="Date" placeholder="Fecha" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? (proyects.DatosPresupuesto[0].Fecha).substring(0, 10) : ''} onChange={handlerOnChange} />
                                </Col>
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Histórico
                            </Form.Label>

                                <Col sm={3}>


                                    <InputGroup className="mb-1">
                                        <FormControl aria-label="Text input with dropdown button" value={historicoSel} />
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
                                    </InputGroup>
                                </Col>

                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Plazo
                            </Form.Label>

                                <Col sm={2} style={{fontSize:{titulos} }}>
                                    <Form.Control type="Text" placeholder="Plazo" style={{ textAlign: 'right' }} value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].Plazo) : ''} onChange={handlerOnChange} />
                                </Col>

                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    días
                            </Form.Label>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formJornada">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Jornada diaria
                            </Form.Label>
                                <Col sm={1}>
                                    <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].Jornada) : ''} onChange={handlerOnChange} />
                                </Col>
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    días
                            </Form.Label>



                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Semanal
                            </Form.Label>
                                <Col sm={1}>
                                    <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaSemana) : ''} onChange={handlerOnChange} />
                                </Col>
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    horas
                            </Form.Label>


                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Mensual
                            </Form.Label>
                                <Col sm={1}>
                                    <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaMes) : ''} onChange={handlerOnChange} />
                                </Col>
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    horas
                            </Form.Label>

                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Año
                            </Form.Label>
                                <Col sm={1}>
                                    <Form.Control type="Text" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].JornadaAno) : ''} onChange={handlerOnChange} />
                                </Col>
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    horas
                            </Form.Label>


                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formMoneda">
                                <Form.Label column sm={1} style={{fontSize:titulos }}>
                                    Moneda Principal
                            </Form.Label>
                                <Col sm={1}>
                                    <Form.Control type="Input" placeholder="ID Moneda" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodMoneda : ''} onChange={handlerOnChange} />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control type="Input" placeholder="Modeda" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Moneda : ''} onChange={handlerOnChange} />
                                </Col>

                                <Col sm={1}>
                                    <Button variant="outline-info" onClick={() => {
                                        if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            setShowMnd(true);
                                            dispatch(selectMONEDAS(''));
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }
                                    }}>...</Button>
                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>



                            <Card style={{ height: '100%', width: '90%', marginTop:'25px' }}>
                                <Card.Header style={{ height: '38px' }}> <div style={{marginTop:'-5px' }}>Moneda Principal ({proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].SimboloMoneda : ''}) </div> </Card.Header>
                                <Card.Body>

                                    <Form.Group as={Row} className="mb-1" controlId="formPrt2">


                                        <Col sm={5}>
                                            <Card style={{ height: '100%' }}>
                                                <Card.Header style={{ height: '30px' }}> <p style={{ marginTop: '-5px' }}>Presupuesto Base </p></Card.Header>
                                                <Card.Body column sm={5} >
                                                    <Form.Group as={Row} className="mb-1" controlId="formCD1">
                                                        <Form.Label column sm={1}>
                                                        </Form.Label>

                                                        <Form.Label column sm={2} style={{fontSize:titulos }}>
                                                            C.D.
                                                </Form.Label>
                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoDirectoBase1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                        <Form.Label column sm={2} style={{fontSize:titulos }}>
                                                            C.I.
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoBase1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1" controlId="formTot">
                                                        <Form.Label column sm={3}>

                                                        </Form.Label>
                                                        <Col sm={3}>

                                                        </Col>
                                                        <Form.Label column sm={2} style={{fontSize:titulos }}>
                                                            Total
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoBase1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col sm={1}></Col>
                                        <Col sm={5}>
                                            <Card style={{ height: '100%' }}>
                                                <Card.Header style={{ height: '30px' }}> <p style={{ marginTop: '-5px' }}>Presupuesto Oferta </p></Card.Header>
                                                <Card.Body column sm={5} >
                                                    <Form.Group as={Row} className="mb-1" controlId="formOferta">
                                                        <Form.Label column sm={1}>
                                                        </Form.Label>

                                                        <Form.Label column sm={2} style={{fontSize:{titulos} }}>
                                                            C.D.
                                                </Form.Label>
                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoDirectoOferta1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                        <Form.Label column sm={2} style={{fontSize:titulos }}>
                                                            C.I.
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoIndirectoOferta1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1" controlId="formVOferta">
                                                        <Form.Label column sm={3}>

                                                        </Form.Label>
                                                        <Col sm={3}>

                                                        </Col>
                                                        <Form.Label column sm={2} style={{fontSize:titulos }}>
                                                            Total
                                                </Form.Label>

                                                        <Col sm={3}>
                                                            <Form.Control type="Input" style={{ textAlign: 'right' }} placeholder="0.00" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? formatNumber(proyects.DatosPresupuesto[0].CostoOferta1) : ''} onChange={handlerOnChange} />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </Form.Group>
                                </Card.Body>
                            </Card>



                            <Card style={{ height: '100%', width: '90%' }}>
                                {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                <Card.Body>
                                    <Form.Group as={Row} className="mb-1" controlId="formGridSub">
                                        <Col sm={1}></Col>
                                        <Col sm={10}>
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
                                <Col sm={{ span: 10, offset: 2 }}>
                                    {/* <Button type="submit">Sign in</Button> */}

                                </Col>
                            </Form.Group>
                        </Form>


                    </Card.Body>
                </Card>)
                :
                (
                    <Card className="animate__animated animate__fadeInUp" style={{overflow:'hidden', height: '90vh'}}>
                        <Card.Header className="">Datos de SubPresupuesto</Card.Header>
                        <Card.Body>

                            <Form>
                                <Form.Group as={Row} className="mb-1" controlId="formPres">
                                    <Form.Label column sm={2}>
                                        
                                    </Form.Label>

                                    <Form.Label column sm={1} style={{fontSize:{titulos} }}>
                                        Presupuesto
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} />
                                    </Col>

                                </Form.Group>



                                <Form.Group as={Row} className="mb-1" controlId="formV45">
                                    <Form.Label column sm={2}>
                                    </Form.Label>

                                    <Form.Label column sm={1} style={{fontSize:{titulos} }}>
                                        Descripcion
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} />
                                    </Col>
                                </Form.Group>



                                <Card style={{ height: '100%', width: '100%' }}>
                                    {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                    <Card.Body>
                                        <Form.Group as={Row} className="mb-1" controlId="formGrid2">
                                            <Col sm={1}></Col>
                                            <Col sm={10} >
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





                                <Card style={{ height: '100%', width: '100%' }}>
                                    {/* <Card.Header style={{ height: '35px' }}>Sub Presupuestos</Card.Header> */}
                                    <Card.Body >
                                        <Form.Group as={Row} className="mb-1" controlId="formGrd3">
                                            <Col sm={1}></Col>
                                            <Col sm={10} style={{ height: window.innerHeight - 500 }}>
                                                <ViewerSc />



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

















                )
            }

        </div>
    )
}

export default DatosGenerales
