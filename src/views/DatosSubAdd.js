import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
//import { agregaGrupo1, guardarGrupo, limpiaUbicaciones, modificaGrupo1, modificarGrupo, selectCLIENTES, selectMODELOS, selectMONEDAS, selectUBICACIONES } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import Swal from 'sweetalert2'
import BuscaModelo from '../components/BuscaModelo';
import { TextBox } from 'devextreme-react';

import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import { agregaSub1, guardarSubPresupuesto, LimpiarSubPres } from '../actions/proyects.actions';



const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);


const DatosSubAdd = ({ nivel, itemSelected, setNuevoSubPres, accion, SubPresupuestos }) => {

    /*const [ItemSub, setItemSub] = useState({

    
    });*/
    const initialP={    
    Cantidad: 1,
    CodAlterno: "",
    CodModelo: null,
    CodSubpresupuesto: "001",
    CostoOferta1: 0,
    CostoOferta2: 0,
    Descripcion: "",
    NombreModelo: null,
    UrnWeb:'',
    }
    const initialP1={    
        CodPresupuesto: itemSelected,
        CodSubpresupuesto: "001",
        Descripcion: "",
    }
    
    

    const [show, setShow] = useState(false);
    const [showMdl, setShowMdl] = useState(false);

    const [subseleccionado, setSubSeleccionado] = useState(null);

    const [subpresupuestoN, setSubPresupuestoN] = useState(initialP);
    const [subpresupuestoT, setSubPresupuestoT] = useState(initialP1);


    //VARIABLES PARA TAMAÑO DE PANTALLA
    const [titulos, setTitulos] = useState('100%');


    const dispatch = useDispatch();

    const proyects = useSelector((state) => state.proyects);

    const [selecOP, setselecOP] = useState(1);

    //const subproyects = useSelector((state) => state.subproyects);


    const showFn = () => {
        setShow(true)
    }

    




    


 
/*
    useEffect(() => {
        if (proyects.seleccionado === undefined) return;
        setselecOP(proyects.seleccionado) 
    }, [proyects.seleccionado])
*/


    //establecer tamaños y posiciones
    useEffect(() => {
        console.log('DATOS DE SUBPRESUPUESTOS en aDD SUBPRESUPUESTOS');
		//console.log(proyects.treeSubControl[proyects.treeSubControl.length-1].CodSubpresupuesto);
        console.log(proyects.subPres);
        console.log(proyects.treeSubControl);
        let toca=0;
        if (proyects.treeSubControl.length>0)
            toca= parseInt(proyects.treeSubControl[proyects.treeSubControl.length-1].CodSubpresupuesto,10)+1;
        else
            toca=1;

        let concat='00';
        if (toca>=10)
            concat='0';
        if (toca>=100)
            concat='';

        setSubPresupuestoN( (state) => ({...state, CodSubpresupuesto:concat+toca}));
        setSubPresupuestoT( (state) => ({...state, CodPresupuesto:itemSelected,CodSubpresupuesto:concat+toca}));   

        
        
        /* CodPresupuesto: "1701001"
            CodSubpresupuesto: "001"
            Descripcion: "SUBPRESUPUESTO 1"*/
            
        

            /*Cantidad: 1
            CodAlterno: ""
            CodModelo: null
            CodSubpresupuesto: "009"
            CostoOferta1: 0
            CostoOferta2: 0
            Descripcion: "POST-VENTA"
            NombreModelo: null
            UrnWeb: ""
            */

        /*if (accion===1){
           
            
            if (presupuestoN.Nivel===1){
                const filtro = proyects.treePartyControl.filter((filtro1) => filtro1.Nivel === 1);
                
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
            
            

        }*/

        

      

        

    }, [])

 
    const CambiaDescripcion = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
       setSubPresupuestoN( (state) => ({...state,Descripcion:data.value}));
       setSubPresupuestoT( (state) => ({...state,Descripcion:data.value}));
	}
    
   

    


    const valida = (e) => {


        console.log('ESTOS SON MIS DATOS A GUARGAR PRES N');
        console.log(subpresupuestoN);
        console.log('ESTOS SON MIS DATOS A GUARGAR PRES T');
        console.log(subpresupuestoT);
        
        dispatch(guardarSubPresupuesto(itemSelected,subpresupuestoN.CodSubpresupuesto,subpresupuestoN.Descripcion,subpresupuestoN.CodModelo,''));

        const Modificado1=[{
            CodPresupuesto: itemSelected,
            CodSubpresupuesto: subpresupuestoN.CodSubpresupuesto,
            Descripcion: subpresupuestoN.Descripcion,
        }];   
        
        dispatch(agregaSub1(Modificado1));

        setTimeout(() => {
            SubPresupuestos(itemSelected);
            dispatch(LimpiarSubPres());                
        }, 1400);

        //dispatch(modificaGrupo1(Nuevo));
        /*CodPresupuesto: "01"
        Descripcion: "ADMINISTRATIVO TRIADA"
        ERPCode: "01"
        Fila: 1
        Nivel: 1
        PhantomId: "01"
        PhantomParentId: null*/
        
        /*
        
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
              
          setNuevoGrupo(false);    

        }*/

            Swal.fire(
            'Bien!',
            'Los datos de tu nuevo SubPresupuesto ' + subpresupuestoN.Descripcion + ' se guardaron Correctamente!',
            'success'
          )
          setNuevoSubPres(false);
          e.preventDefault();
          
    }
    
    
    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '40px', marginTop: '35vh', height: '40%', width: '95%', background:'transparent' }}>
            <BuscaModelo
                setShow={setShowMdl}
                subseleccionado={subseleccionado}
                setSubSeleccionado={setSubSeleccionado}
                CodPresupuesto={itemSelected}
                show={showMdl}
                tipo={'3'}
                setSubPresupuestoN={setSubPresupuestoN}
            />

            {selecOP === 1 ?
                (<Card className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: '25vh', padding: '15px' }}>
                    <Card.Header style={{fontSize:'1rem', background:'#398bf7', color:'white' }}>Nuevo SubPresupuesto
                            
                    </Card.Header>
                    <Card.Body>

                        <Form onSubmit={valida}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: '300px', top: '23px' }} 
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
                                </Col>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}
                                    
                                    <TextBox
                                        defaultValue={subpresupuestoN.CodSubpresupuesto}
                                        value={subpresupuestoN.CodSubpresupuesto}
                                        readOnly={true}
                                        //onValueChanged={CambiaCodigo}
                                        //valueChangeEvent="keyup"
                                       // onValueChanged={CambiaCodigo}
                                        
                                    >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </TextBox> 

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
                                        defaultValue={subpresupuestoN.Descripcion}
                                        value={subpresupuestoN.Descripcion}
                                        onValueChanged={CambiaDescripcion}
                                    //readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                    </TextBox>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formModelo">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                </Form.Label>

                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Modelo
                                </Form.Label>
                                <Col sm={8}>
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={subpresupuestoN.NombreModelo}
                                        value={subpresupuestoN.NombreModelo}
                                        onValueChanged={CambiaDescripcion}
                                        readOnly={true}
                                    >
                                    
                                    </TextBox>
                                </Col>
                                    <Col sm={1}>

                                    <Button1 variant="outline-info"  
                                    onClick={() => {
                                        setShowMdl(true);
                                    }}>
                                        <i class="far fa-save"></i>   Seleccionar</Button1>
                                                                      
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

export default DatosSubAdd
