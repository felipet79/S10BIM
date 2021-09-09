import React, { useRef, useEffect, useState } from 'react'

import Script from 'react-load-script';
import $ from 'jquery';
import queryString from 'query-string';

//import { cleanDataChart, cleanDataChart1, selectPc, navigationTree, navigationTreePC, selectItems} from '../actions/proyects.actions';

//import adskLogoSvg from "./logo.svg";
//import VisibilityIcon from "@material-ui/icons/Visibility";
import * as THREE from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { relativeTimeRounding } from 'moment';
import { selectParidas } from '../actions/proyects.actions';



var ponerdato=true;
const viewerLibaryURL1 = '//cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.js';
const viewerStylesheetURL1 = '//cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.css';

var seleccionados="", seleccionadosCat="", seleccionadosFamilia="", seleccionadosTipo=""; 
const viewerLibaryURL2 = 'js/three.js';


var T_uniqueIds = [];
var T_categorias = [];
var T_NombreT = [];
var T_TipoT = [];
var T_cantidad_elementos=0;



const viewerStylesheetURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css?v=v7.*';
const viewerLibaryURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
let viewerLibraryLoaded = false;
let viewerLibraryLoaded1 = false;
let viewerStyleLoaded = false;
let viewerLoading = false;

//const viewerLibaryURL1 = 'js/ForgeViewer.js';


var viewer1 ;
//export const Viewer1=null;



//export const CambiardeModelo = async (NuevoModelo) => {
    //setModelURL(NuevoModelo);
    //await launchViewer(modelURL);

//}


export const MostarModelo = (idelem) => {
    //alert("refresca");
   //viewer.resize();
   //viewer.showAll();
   //viewer.refresh(false);
   //viewer.refresh(true);
   //var urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
   //await ViewScreen1.launchViewer(urn);
   highlightRevit(idelem);
}


function highlightRevit(idsRevit) {
    // Every Forge Viewer model has an ‘ExternalId Mapping’
    // this mapping is an object that has as keys the
    viewer1.model.getExternalIdMapping((mapping) => {
        configureElementByUniqueIdAndMapping(idsRevit, mapping);
    });
}
function configureElementByUniqueIdAndMapping(idsRevit, mapping) {
    var elementsDbId = [];
    var idsRevitArray = idsRevit.split(',');
    for (var uniqueId in idsRevitArray) {
        const elementDbId = mapping[idsRevitArray[uniqueId]];
        if (elementDbId) {
            elementsDbId.push(elementDbId);
        }
    }
    viewer1.isolate(elementsDbId);
    viewer1.fitToView(elementsDbId);
}


    export const RefrescarV = async() => {
        //alert("refresca");
       viewer1.resize();
       //viewer.showAll();
       //viewer.refresh(false);
       //viewer.refresh(true);
       //var urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
       //await ViewScreen1.launchViewer(urn);

    }


var UniquesSel=null;

  
export const ViewerScP = (props) => {


	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);

	//const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state:any) => state.proyects);





    useEffect(() => {
	



        UniquesSel=proyects.DataUnique;
		//orderTree(proyects.DataPc);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		 // eslint-disable-next-line
	}, [proyects.DataUnique])

    
    const [ modelURL, setModelURL ] = useState('dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x');
    //'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x'
    //const [Viewer1, setViewer1] = useState(null);

    var urn;
    //const container: any = useRef();
    var posX = 0;
    var posY = 0;
    var posZ = 0;

    const [loadViewerLibrary, setLoadViewerLibrary] = useState(false);
    const [loadViewerLibrary1, setLoadViewerLibrary1] = useState(false);

    const handleStyleLoad = async() => {
        viewerStyleLoaded = true;
        if (cargado1 && cargado2){
            //urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
            await launchViewer(modelURL);
            //alert(urn);
        }

        if (viewerLibraryLoaded && viewerLibraryLoaded1) {
            /*urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmhxbTRIV0ZmUm82VGtzand2MjZQSlE_dmVyc2lvbj0x';
            viewerLibraryLoaded && launchViewer(urn)*/

        }
    }
    var cargado1=false;
    var cargado2=false;

 


    const handleScriptLoad1 = async () => {
        //alert('ya cargo');

        cargado2=true;
        if (cargado1 && cargado2){
            //urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
            await launchViewer(modelURL);
            //alert(urn);
        }

        

        
    }


    

    const handleScriptLoad = async () => {
        viewerLibraryLoaded = true;

        //viewerStyleLoaded && loadViewer(modelURL)
        //urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmhxbTRIV0ZmUm82VGtzand2MjZQSlE_dmVyc2lvbj0x';
        cargado1=true;
        if (cargado1 && cargado2){
            //urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
            await launchViewer(modelURL);
        }

        setTimeout(() => {

     

        }, 4000);
        setTimeout(() => {
            //viewer.loadExtension('MenuContextual');
            //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
            //viewer.refresh();
        }, 8000);

        //loadViewer(modelURL);
    }

    function carga2() {

        //var urn = getParameterByName('urn');
        
        //alert('esta es la funcion');
        //seleccionados='c884ae1b-61e7-4f9d-0001-719e20b22d0b-006f9464';
        //var cadena = '5c069bcb-62a6-44a8-a199-48eb6d184f17-000546cc';
        //var cadena = '5c069bcb-62a6-44a8-a199-48eb6d184f17-000546cc';
        if (viewer1)
            highlightRevit(seleccionados);



        var geom = new THREE.SphereGeometry(1, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var sphereMesh = new THREE.Mesh(geom, material);
        //var scene = new THREE.scene(geom, material);
        //var sphereMesh = new THREE.(geom, material);
        var scene = new THREE.Scene();
        //viewer.impl.scene.add(scene);
        if (!viewer1.overlays.hasScene(scene)) {
            viewer1.overlays.addScene(scene);
            //viewer.impl.scene.add('custom-scene');
        }

        /*if (!viewer.overlays.hasScene('custom-scene')) {
            viewer.overlays.addScene('custom-scene');
            //viewer.impl.scene.add('custom-scene');
        }*/
        //alert('hola');
        //viewer.impl.scene.add(sphereMesh);
        
        scene.background = new THREE.Color(0x2a3b4c);
        alert('carga2');
        viewer1.overlays.addMesh( sphereMesh, scene);
        sphereMesh.position.set(1, 2, 3);
        viewer1.refresh();
        

    }


    function highlightRevit(idsRevit) {
        // Every Forge Viewer model has an ‘ExternalId Mapping’
        // this mapping is an object that has as keys the
        viewer1.model.getExternalIdMapping((mapping) => {
            configureElementByUniqueIdAndMapping(idsRevit, mapping);
        });
    }
    function configureElementByUniqueIdAndMapping(idsRevit, mapping) {
        var elementsDbId = [];
        var idsRevitArray = idsRevit.split(',');
        for (var uniqueId in idsRevitArray) {
            const elementDbId = mapping[idsRevitArray[uniqueId]];
            if (elementDbId) {
                elementsDbId.push(elementDbId);
            }
        }
        viewer1.isolate(elementsDbId);
        viewer1.fitToView(elementsDbId);
    }



    // @urn the model to show
    // @viewablesId which viewables to show, applies to BIM 360 Plans folder
    function launchViewer(urn, viewableId = '') {
        //alert(viewerLibraryLoaded1);

        console.log('RENDERIZANDO EL VIEWER  ***********************');
        var options = {
            env: 'AutodeskProduction',
            getAccessToken: getForgeToken,
            api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
        };
        //alert('se cargo'+'urn= '+urn+' acces token=');
        //if (!Autodesk) return;
            Autodesk.Viewing.Initializer(options, () => {
            const config = {
                extensions: []
            };

            viewer1 = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer1'), config);
            //viewer = new Autodesk.Viewing.GuiViewer3D(container.current, config);
            viewer1.start();
            var documentId = 'urn:' + urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
            
            //alert('Estoy en la carga');

            //const Cronos = new Autodesk.DataVisualization.UI.ChronosTimeSlider('');

            if (!viewer1) return;
            if (!viewer1.autocam) return;
            // smooth navigation...
            viewer1.autocam.shotParams.destinationPercent = 3;
            viewer1.autocam.shotParams.duration = 3;




        });




        function onDocumentLoadSuccess(doc) {
            // if a viewableId was specified, load that view, otherwise the default view

            //var items = doc.getRoot().find({ role: '3d', type: 'geometry' });
            //var items = doc.getSubItemsWithProperties(doc.getRoot(),{ role: '3d', type: 'geometry' },false);

            /*var Items = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRoot(), {
                'type' : 'geometry',
                'role' : '2d'
            }, false);*/


            /*var viewables1 = doc.getRoot().search({'type':'geometry'});
            viewer.loadDocumentNode(doc, viewables1[6]);*/

            

            var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
            /*var items = doc.getRoot().find({ role: '3d', type: 'geometry' });
            console.log('estas son las vistas',items);*/
            



            viewer1.loadDocumentNode(doc, viewables).then(i => {
                
                // any additional action here?
                //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                
                //alert("cargando extension "+viewer.isExtensionLoaded("NestedViewerExtension"));
            });
            
            //viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionBinded);
            viewer1.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);

            
            //viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);



            onModelLoaded1(viewer1);

            

        }


        

        

        function PonerProps(event) {


            $('#forgeViewer1 #LateralToolbar.ControlGroup').css({
                'background-color': 'black',
                'border-radius': '10px',
                'display': 'none'
            });

            $('#forgeViewer1 #guiviewer3d-toolbar').css({
                'background-color': 'rgba(255,255,255,0.10)',
                'border-radius': '5px',
                'display': 'none'
            });
            $('#forgeViewer1 #settingsTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)'           ,
                'display': 'none'
            });
            $('#forgeViewer1 #modelTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)',
                'display': 'none'
            });
            $('#forgeViewer1 #navTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)',
                'display': 'none'
            });

            $('#forgeViewer1 #toolbar-documentModels').css({
                'background-color': 'rgba(1,1,1,0.55)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.90)',
                'display': 'none'
            });

            //console.log('Este es el evento', event);
            //onModelLoaded1(viewer);
  

        }


        function onDocumentLoadFailure(viewerErrorCode) {
            console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
            //alert('Estoy en la carga');

        }




        function addIds(DBids, uniqueIds, callback) {
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewer1.getSelection()[uniqueId];
                this.viewer1.getProperties(objSelected, (props) => {
                    uniqueIds.push(props.externalId);
                    n = n++;
                    if (n == DBids.length) {
                        callback(null, uniqueIds)
                    }
                });

            }

        }







        const SensorStyleDefinitions = {
            co2: {
                url: `uno.svg`,
                color: 0xffffff,
            },
            temperature: {
                url: `uno.svg`,
                color: 0xffffff,
            },
            default: {
                url: `uno.svg`,
                color: 0xffffff,
            },
        };

        /**
         * Handles `Autodesk.Viewing.GEOMETRY_LOADED_EVENT` event that is sent when a model has been completely loaded in the viewer.
         *
         * @param {Autodesk.Viewing.GuiViewer3D} viewer The viewer in which the model is loaded.
         */
        async function onModelLoaded1(viewer) {
            const dataVizExt = viewer1.getExtension("Autodesk.DataVisualization");
            const DATAVIZEXTN = Autodesk.DataVisualization?.Core;
            if (!DATAVIZEXTN) { return; }
            var styleMap = {};

            // Create model-to-style map from style definitions.
            Object.entries(SensorStyleDefinitions).forEach(([type, styleDef]) => {

                styleMap[type] = new DATAVIZEXTN.ViewableStyle(
                    DATAVIZEXTN?.ViewableType.SPRITE,
                    new THREE.Color(styleDef.color),
                    styleDef.url
                );



            });


            const div = document.createElement("div");  // <div></div>
            const app = document.getElementById('root'); // <div id="app">App</div>
            const div1 = document.createElement("div1");  // <div></div>
            const div2 = document.createElement('div2'); // <div id="app">App</div>
            const div3 = document.createElement("div3");  // <div></div>
            const div4 = document.createElement('div4'); // <div id="app">App</div>


            const viewableData = new DATAVIZEXTN.ViewableData();

            /*await viewableData.finish();
            dataVizExt.addViewables(viewableData);
            dataVizExt.removeAllViewables();*/


            viewableData.spriteSize = 20;
            let startId = 1;

            
            await viewableData.finish();
            if (!dataVizExt) return;
            dataVizExt.addViewables(viewableData);

            /**
             * Called when a user clicks on a Sprite Viewable
             * @param {Event} event 
             */
            function onItemClick(event) {
                //alert('click');
                //alert(devices[event.dbId - 1].position.x);
                //alert(event.dbId);
            }

            /**
             *  Called when a user hovers over a Sprite Viewable 
             * @param {Event} event 
             */

            function onItemHovering(event) {


                //console.log("Show tooltip here", event);
                //console.log("Show tooltip here", event.originalEvent);
                //alert(event.point);
                //alert(viewer.model.getUpVector());


                // const currAppState = appStateRef.current;

                div.style.display = 'none';
                

                posX = event.originalEvent.normalizedX;
                posY = event.originalEvent.normalizedY;
                //posZ=event.point.z;



                if (event.dbId) {
                    //alert(event.dbId);
                    //console.log(devices[event.dbId].position.x);
                    //alert(devices[event.dbId-1].position.x);
                    //alert(event.originalEvent.clientX);


                    //const div = document.createElement("div");
                    //div.textContent = "Esto es un div insertado con JS.";
                    var tempX = event.originalEvent.clientX + document.body.scrollLeft;
                    var tempY = event.originalEvent.clientY + document.body.scrollTop;
                    /*const app = document.createElement("div"); // <div></div>
                    app.id = "app"; // <div id="app"></div>
                    app.appendChild(div);*/

                    
                    //var ClientRect = div.getBoundingClientRect();
                    /*var ClientRect = elemento.getBoundingClientRect();
	                return { //objeto
	                x: Math.round(evt.clientX - ClientRect.left),
	                y: Math.round(evt.clientY - ClientRect.top)
                        }*/
                    div.appendChild(div1);
                    
                    
    
                    div1.textContent = 'Ejemplo '+event.dbId ;  
                    div1.style.textAlign = 'center';  
                    //div.textContent = "Ejemplo "+ event.dbId;                // <div>Ejemplo</div>
                    div2.innerHTML = 'Otro dato';  
                    div1.classList.add('card');
                    //div1.classList.add('card-header');
                    
                    div2.classList.add('card-title');
                    //div3.classList.add('card-header');


                    div1.style.fontSize = '0.8rem';
                    //div1.style.border = '1px 1px 1px 2px rgba(255,255,255,0.95)';
                    
                    div1.style.backgroundColor = 'rgba(1,1,1,0.85)';
                    div1.style.width = '100%';
                    
                    div.appendChild(div2);
                    div2.style.fontSize = '0.7rem';

                    div.style.backgroundColor = 'rgba(1,1,1,0.65)';
                    //div.style.alignContent = 'center';
                    div.style.borderRadius = '10px';
                    div.style.position = 'absolute';
                    div.style.zIndex = '999';
                    div.style.fontSize = '0.7rem';
                    div.style.width = '150px';
                    div.style.height = '110px';
                    
                    
                    //div.style.top = event.originalEvent.pageY;
                    //div.style.left = event.originalEvent.pageX;
                    //div.style.top = event.originalEvent.pageY+'px';
                    div.style.top = (event.originalEvent.pageY-120)+'px';
                    div.style.left = (event.originalEvent.pageX-65)+'px';
                    //div.style.left = posX+'px';
                    div.style.display = 'block';
                    //div.style.visibility = 'block';
                    app.insertAdjacentElement("beforebegin", div);


                }

                //alert('show');
            }

            const DataVizCore = Autodesk.DataVisualization.Core;
            viewer.addEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
            //viewer.addEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);


        }




               



    }







    const loadViewer = (svfUrl: string) => {

      
        launchViewer(modelURL);
        //launchViewer(modelURL);


    }



    const cargar = async () => {
            if (viewer1){
                //viewer.uninitialize();
                viewer1.finish();
            }

            launchViewer(proyects.UrnS1);
                        
            //alert(urn);

    }


    

 

    

   


    

	useEffect(() => {
		//console.log('datos de subProyectos actualizados')
		//if (proyects.treeSubControl==undefined) return;
		//console.log(proyects.treeSubControl)
        if (proyects.UrnS1){

            setModelURL(proyects.UrnS1);
            //alert(modelURL);
            //alert(proyects.Urn);
            cargar();
    
        }
  
	}, [proyects.UrnS1])





    async function postData(url = '', data = {}) {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                //'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString.stringify(data)
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    /*const fetchConToken11 = () => {
        postData('https://developer.api.autodesk.com/authentication/v1/authenticate', {
            'client_id': 'Lrn6oqLnwpCBd8GS0LuimGx5SHONYw4b',
            'client_secret': 'JLA2LfrdwUg4hMkz',
            'grant_type': 'client_credentials',
            'scope': 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete'
        })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call

            });
    }*/


    function getForgeToken(callback) {
        postData('https://developer.api.autodesk.com/authentication/v1/authenticate', {
            'client_id': 'Lrn6oqLnwpCBd8GS0LuimGx5SHONYw4b',
            'client_secret': 'JLA2LfrdwUg4hMkz',
            'grant_type': 'client_credentials',
            'scope': 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete'
        })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                callback(data.access_token, data.expires_in);
            });
    }



    
    const loadStyleSheet = (href: string) => {
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.href = href;
        styles.onload = handleStyleLoad;
        document.getElementsByTagName('head')[0].appendChild(styles);
    }


    useEffect(() => {

        async function loadServiceWorker() {
            //await new Promise(r=>{serviceWorker.register({onSuccess:()=>r()})});
            setLoadViewerLibrary(true);
            //setLoadViewerLibrary1(true);
            //await loadStyleSheet(viewerStylesheetURL1);
            await loadStyleSheet(viewerStylesheetURL);

            //alert('init');
        }
        loadServiceWorker();

        /*return ()=> {
           if (window.NOP_VIEWER) window.NOP_VIEWER.finish() //terminate Viewer when unmounting
        }*/
    },[]);



    



    const laneId = 'demo-lane'
    const lanes = [
        {
            laneId,
            label: 'Plazo del Proyecto',
        },
    ]
    var now = new Date();
    const events = [
        {
            eventId: 'event-1',
            laneId: laneId,
            startTimeMillis: 1399845600000,
            //endTimeMillis: 1530698899000,
            endTimeMillis: now.getTime()
        },
        {
            eventId: 'event-2',
            laneId,
            startTimeMillis: 1167606000000,
            endTimeMillis: 1230698892000,
        },
    ]
    const dateFormat = (ms: number) => new Date(ms).toLocaleString();

    var tamano = $('#FrmPrin').width();

    const [fecha, setfecha] = useState(new Date(now.getTime()).toLocaleString());
    const [fechasel, setfechasel] = useState(new Date(now.getTime()).toLocaleString());


    const evento = (evento) => {

        //alert(fecha);
        //console.log("evento click de la fecha ", evento);
        setfecha(fechasel);

    }
    //const a = TimelineTheme;

    const oncursor = (millisAtCursor, startMillis, endMillis) => {

        //alert(new Date(millisAtCursor).toLocaleString());
        setfechasel(new Date(millisAtCursor).toLocaleString());
        //setfecha(new Date(now.getTime()).toLocaleString());
        //fecha=
    }



    
    

    return (
        <>
            <div className="card" id="forgeViewer1" style={{ height: "100%", width: '100%', 
            /*background: 'linear-gradient(to bottom, rgba(242,246,248,1) 0%,rgba(216,225,231,1) 55%,rgba(181,198,208,1) 82%,rgba(224,239,249,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f2f6f8", endColorstr="#e0eff9",GradientType=0 )',             */
         }}></div>
            

            {/* </div> */}

            {/* {loadViewerLibrary1 ? <Script url={viewerLibaryURL1} onLoad={handleScriptLoad1}></Script> : null} */}
            {loadViewerLibrary ? <Script url={viewerLibaryURL} onLoad={handleScriptLoad}></Script> : null}

            {/* {<Script url={viewerLibaryURL} onLoad={handleScriptLoad}></Script>} 
            {<Script url={viewerLibaryURL1} onLoad={handleScriptLoad1}></Script>} */}
            {/* </div> */}
        </>

    )
}



