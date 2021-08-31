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
/*import { Timeline } from 'react-svg-timeline'
import { now } from 'moment';
import Tooltip from "@material-ui/core/Tooltip";*/


//import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
//import "gantt-task-react/dist/index.css";

//import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from '../../gantt-task-react-main/index';
//import "gantt-task-react/dist/index.css";
//import "gantt-task-react/dist/index.css";

//import { CustomToolTip } from "forge-dataviz-iot-react-components";
//import Cronos from 'chronos-etu';
//import { Font, TextGeometry } from 'threejs-full-es6'
//import FontJson from './helvetiker_bold.typeface.json'
//import { Theme as MaterialTheme } from '@material-ui/core';
//import zIndex from '@material-ui/core/styles/zIndex';
//import { TimelineTheme } from './Proyectos/theme/model';

const devices = [
    {
        position: {
            x: 2.590268290876452,
            y: 1.20446526068116,
            z: 2.355262787057484,
        },
        type: "temperature",
        sensorTypes: ["co2", "temperature"],
    },
    {
        position: {
            x: -97.94954550038506,
            y: -50.21776820050724,
            z: 12.444056161946492,
        },
        type: "temperature",
        sensorTypes: ["temperature"],
    },
    {
        position: {
            x: 162.61,
            y: 75.54,
            z: -0.61,
        },
        type: "temperature",
        sensorTypes: ["temperature"],
    },
    {
        position: {
            x: 48.53,
            y: -48.27,
            z: -19.24,
        },
        type: "temperature",
        sensorTypes: ["temperature"],
    },

];

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


//URN=dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLi02VW9rWXRDUVZXVDdiWDFZeXRZUHc/dmVyc2lvbj0x
//const modelURL = 'https://dukedhx.github.io/Forge-Workshop/shaver/0.svf';
//const modelURL = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmhxbTRIV0ZmUm82VGtzand2MjZQSlE_dmVyc2lvbj0x';
//const modelURL = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x';
//const modelURL = 'https:\/\/developer.api.autodesk.com\/derivativeservice\/v2\/derivatives\/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmhxbTRIV0ZmUm82VGtzand2MjZQSlE_dmVyc2lvbj0x'
//const viewerLibaryURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.*';
const viewerStylesheetURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css?v=v7.*';
const viewerLibaryURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
let viewerLibraryLoaded = false;
let viewerLibraryLoaded1 = false;
let viewerStyleLoaded = false;
let viewerLoading = false;

//const viewerLibaryURL1 = 'js/ForgeViewer.js';


var viewerM ;
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
    if (viewerM)
        if (viewerM.model)
    viewerM.model.getExternalIdMapping((mapping) => {
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
    viewerM.isolate(elementsDbId);
    viewerM.fitToView(elementsDbId);
}


    export const RefrescarV = async() => {
        //alert("refresca");
       if (viewerM)
        viewerM.resize();
       //viewer.showAll();
       //viewer.refresh(false);
       //viewer.refresh(true);
       //var urn = 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlk1YXg4MUthUWZ1OUppZlU1b0M0M0E/dmVyc2lvbj0x';
       //await ViewScreen1.launchViewer(urn);

    }


var UniquesSel=null;

  
export const ViewerScM = (props) => {


	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);

	//const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state:any) => state.proyects);





    useEffect(() => {
		//console.log('datos de items en Forge')
		//console.log(proyects.DataUnique)
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

    /*function initTasks() {
        const currentDate = new Date();
        const tasks: Task[] = [
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
            name: "Proyecto Edificio Colinas",
            id: "ProjectSample",
            progress: 25,
            type: "project",
            padre: true,
            nivel:0,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              2,
              12,
              28
            ),
            name: "Desbroce y desbosque de terreno",
            id: "Task 0",
            progress: 45,
            type: "task",
            project: "ProjectSample",    
            nivel:1,        
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
            name: "Research",
            id: "Task 1",
            progress: 25,
            dependencies: ["Task 0"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Excavacion sin clasificar",
            id: "Task 2",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Excavacion sin clasificar",
            id: "Task 8",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 0, 0),
            name: "Relleno compactado",
            id: "Task 3",
            progress: 2,
            dependencies: ["Task 2"],
            type: "project",
            project: "ProjectSample",
            padre:true,
            nivel:1,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
            name: "Review",
            id: "Task 4",
            type: "task",
            progress: 70,
            dependencies: ["Task 2"],
            project: "Task 3",
            nivel:2,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Excavacion sin clasificar",
            id: "Task 5",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },          
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "Release",
            id: "Task 6",
            progress: currentDate.getMonth(),
            type: "milestone",
            dependencies: ["Task 4"],
            project: "Task 3",
            nivel:2,
            visible:true,
          },
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Excavacion sin clasificar",
            id: "Task 7",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Excavacion sin clasificar",
            id: "Task 8",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            nivel:1,
            visible:true,
          },          
          {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
            name: "Party Time",
            id: "Task 9",
            progress: 0,
            isDisabled: true,
            type: "task",
            nivel:1,
            visible:true,
          },
        ];
        return tasks;
      }

    
    const [tasks, setTasks] = React.useState<Task[]>(initTasks());
    const currentDate = new Date();*/



    
    //return tasks;
  
    

    //const { env, docUrn, adapterType, api } = props.appData;
    /*if (props.appData.dataStart && props.appData.dataEnd) {
        let dataStart = new Date(props.appData.dataStart);
        let dataEnd = new Date(props.appData.dataEnd);
        startRange.setTime(dataStart.getTime());
        endRange.setTime(dataEnd.getTime());

        if (startDate.getTime() < startRange.getTime() || startDate.getTime() >= endRange.getTime()) {
            startDate.setTime(startRange.getTime());
        }

        if (endDate.getTime() <= startRange.getTime() || endDate.getTime() >= endRange.getTime()) {
            endDate.setTime(endRange.getTime());
        }

        if (currDate.getTime() <= startRange.getTime() || currDate.getTime() >= endRange.getTime()) {
            currDate.setTime(endRange.getTime());
        }

        // give it a little bit buffer to make the range selection visible
        startRange.setTime(dataStart.getTime() - 2 * 60 * 60 * 24 * 1000);
        endRange.setTime(dataEnd.getTime() + 2 * 60 * 60 * 24 * 1000);
    }*/


    /*timeOptionRef.current = timeOptions;
    appStateRef.current = appState;
    hoveredDeviceInfoRef.current = hoveredDeviceInfo;*/







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

        

        /*viewerLibraryLoaded1 = true;
        setTimeout(() => {
            if (viewer) {
                //viewer.loadExtension('MenuContextual');
                //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });

                //alert('carga extension');
                //viewer.loadExtension('MenuContextual');
                //viewer.activateExtension("NestedViewerExtension");

                //alert(viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true }));



                //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                //alert(viewer.isExtensionLoaded("NestedViewerExtension"));
                //viewer.refresh(true);
            }
        }, 5000);*/
    }


    const handleScriptLoad2 = () => {

        /*var geom = new THREE.SphereGeometry(10, 8, 8);
        var material8 = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
        var sphereMesh = new THREE.Mesh(geom, material8);
        //var Cam = new THREE.Camera();
        //Cam.position.set(1,1,1);

        //var sphereMesh = new THREE.(geom, material8);
        sphereMesh.position.set(1, 2, 3);
        //sphereMesh.position.set(1, 2, 3);
        //sphereMesh.matrixWorld.setPosition(new THREE.Vector3(-59, 2, 3));
        //sphereMesh
        //sphereMesh.geometry.attributes.position.set([-59, 2, 3], 1);

        //sphereMesh.position.set(  1, 2, 3);
        //sphereMesh.
        if (!viewer.overlays.hasScene('custom-scene1')) {
            viewer.overlays.addScene('custom-scene1');
        }

        viewer.overlays.addMesh(sphereMesh, 'custom-scene1');
        /*sphereMesh.translateX(1);
        sphereMesh.translateY(20);
        sphereMesh.translateZ(3);*/

        //alert(sphereMesh.geometry.attributes);*/

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

            /*if (viewer) {
                viewer.refresh(true);
                viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                viewer.loadExtension('MenuContextual');
                viewer.refresh();
                //launchViewer(urn);
            }
            //viewer.loadExtension('MenuContextual');

            //alert('se carga');
            //launchViewer(urn);*/

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
        if (viewerM)
            highlightRevit(seleccionados);



        var geom = new THREE.SphereGeometry(1, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var sphereMesh = new THREE.Mesh(geom, material);
        //var scene = new THREE.scene(geom, material);
        //var sphereMesh = new THREE.(geom, material);
        var scene = new THREE.Scene();
        //viewer.impl.scene.add(scene);
        if (!viewerM.overlays.hasScene(scene)) {
            viewerM.overlays.addScene(scene);
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
        viewerM.overlays.addMesh( sphereMesh, scene);
        sphereMesh.position.set(1, 2, 3);
        viewerM.refresh();
        //alert('mostrado');
        //handleScriptLoad2();
        ///onModelLoaded(viewer);
        //var geom1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );


    }


    function highlightRevit(idsRevit) {
        // Every Forge Viewer model has an ‘ExternalId Mapping’
        // this mapping is an object that has as keys the
        viewerM.model.getExternalIdMapping((mapping) => {
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
        viewerM.isolate(elementsDbId);
        viewerM.fitToView(elementsDbId);
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
                extensions: ['Autodesk.VisualClusters', 'Autodesk.DocumentBrowser', 'Autodesk.BIM360.Minimap', 'Autodesk.ViewCubeUi', 'Autodesk.AEC.Minimap3DExtension', 'Autodesk.AEC.Minimap3DExtension', 'Autodesk.DataVisualization']
            };

            viewerM = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewerM'), config);
            //viewer = new Autodesk.Viewing.GuiViewer3D(container.current, config);
            viewerM.start();
            var documentId = 'urn:' + urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

            //const Cronos = new Autodesk.DataVisualization.UI.ChronosTimeSlider('');

            if (!viewerM) return;
            if (!viewerM.autocam) return;
            // smooth navigation...
            viewerM.autocam.shotParams.destinationPercent = 3;
            viewerM.autocam.shotParams.duration = 3;




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




            viewerM.loadDocumentNode(doc, viewables).then(i => {
                // any additional action here?
                //viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                /*viewerM.loadExtension("Autodesk.BIM360.Minimap");
                viewerM.loadExtension("Autodesk.AEC.Minimap3DExtension");
                viewerM.loadExtension("Autodesk.AEC.LevelsExtension");*/
                //alert("cargando extension "+viewer.isExtensionLoaded("NestedViewerExtension"));
            });

            viewerM.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionBinded);
            viewerM.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);


            //viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);



            onModelLoaded1(viewerM);

            //init22();


        }


        function verseleccionado() {
            let viewerImpl = viewerM.impl;

            /*this.activate = (name) => {
                this.active = true;
            };
    
            this.deactivate = (name) => {
                this.clearMarkedObject(this.markedFragments);
                this.active = false;
            };*/

            //this.handleSingleClick = (event, button) => {
            //if (button === 0) {
            //const res = [];
            //const vpVec = viewerImpl.clientToViewport(event.canvasX, event.canvasY);
            /* const dbId = viewerImpl
                 .renderer()
                 .idAtPixel(vpVec.x, vpVec.y, res, [viewerImpl.renderer().getOverlayIdTarget()]);
 
             if (true) {
                 let test = viewerImpl.hitTestViewport(vpVec, false);
                 console.log(test);
             }*/

            // "dbId == -1" when nothing is clicked.

            // }



        }


        function onSelectionBinded(event) {
            //alert('hola');
            var currSelection = viewerM.getSelection();
            var domElem = document.getElementById('MySelectionValue');
            //let vector = new THREE.Vector3();
            //event.object.getWorldPosition(vector);
            //console.log(vector);
            domElem.innerText = currSelection.length /*+ " " + vector.x + "," + vector.y + "," + vector.z*/;
            console.log('Este es el evento de cambiar ', event);
            //verseleccionado();
            //alert(event.clientX);

            /*var uniqueIds = [];
            var DBids = viewer.getSelection();
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewer.getSelection()[n];
                n = n + 1;
                console.log('Este es el objeto seleccionado',objSelected);
            }*/

            //console.log('Estas son las props');
            var uniqueIds = [];
            var DBids = viewerM.getSelection();
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewerM.getSelection()[n];
                n = n + 1;
                viewerM.getProperties(objSelected, (props) => {
                    uniqueIds.push(props.externalId);
                    if (n == DBids.length) {
                        //callbackObj.showMessage(uniqueIds);
                        //callbackObj.returnex(uniqueIds);
                        //alert(uniqueIds);
                        console.log(props);
                        //9c9538fd-af40-4b3d-bd89-f8e4acac1fd8-000525ae
                    }
                })
            }

            let viewerImpl = viewerM.impl;

            /*this.activate = (name) => {
                this.active = true;
            };
    
            this.deactivate = (name) => {
                this.clearMarkedObject(this.markedFragments);
                this.active = false;
            };*/

            //this.handleSingleClick = (event, button) => {
            //if (button === 0) {
            //const res = [];
            //const vpVec = viewerImpl.clientToViewport(event.canvasX, event.canvasY);
            /* const dbId = viewerImpl
                 .renderer()
                 .idAtPixel(vpVec.x, vpVec.y, res, [viewerImpl.renderer().getOverlayIdTarget()]);
 
             if (true) {
                 let test = viewerImpl.hitTestViewport(vpVec, false);
                 console.log(test);
             }*/

            // "dbId == -1" when nothing is clicked.

            // }



        }

        function PonerProps(event) {


            $('#LateralToolbar.ControlGroup').css({
                'background-color': '#fff',
                'border-radius': '10px'
            });

            $('#guiviewer3d-toolbar').css({
                'background-color': 'rgba(255,255,255,0.10)',
                'border-radius': '5px'
            });
            $('#settingsTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)'
            });
            $('#modelTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)'
            });
            $('#navTools').css({
                'background-color': 'rgba(255,255,255,0.15)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.80)'
            });

            $('#toolbar-documentModels').css({
                'background-color': 'rgba(1,1,1,0.55)',
                'border-radius': '15px',
                'color': 'rgba(1,1,1,0.90)'
            });

            //console.log('Este es el evento', event);
            onModelLoaded1(viewerM);
  

        }


        function onDocumentLoadFailure(viewerErrorCode) {
            console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
        }




        function addIds(DBids, uniqueIds, callback) {
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewerM.getSelection()[uniqueId];
                this.viewerM.getProperties(objSelected, (props) => {
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
        async function onModelLoaded1(viewerM) {
            const dataVizExt = viewerM.getExtension("Autodesk.DataVisualization");
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

            devices.forEach((device) => {
                let style = styleMap[device.type] || styleMap["default"];
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId);
                viewableData.addViewable(viewable);
                startId++;
            });
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
            viewerM.addEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
            //viewer.addEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);


        }





        function seleccionar_btn(){
            //btn.addClass();
            alert('hola');

        }




    }




    const loadViewer = (svfUrl: string) => {

      
        launchViewer(modelURL);
        //launchViewer(modelURL);


    }



    const cargar = async () => {
            if (viewerM){
                //viewer.uninitialize();
                viewerM.finish();
            }
     
            launchViewer(proyects.Urn);
            //alert(urn);

    }

	useEffect(() => {
		//console.log('datos de subProyectos actualizados')
		//if (proyects.treeSubControl==undefined) return;
		//console.log(proyects.treeSubControl)
        if (proyects.Urn){

            setModelURL(proyects.Urn);
            //alert(modelURL);
            //alert(proyects.Urn);
            cargar();
    
        }
  
	}, [proyects.Urn])





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
            <div className="card" id="forgeViewerM" style={{ height: "100%", width: '100%',             
             background: 'linear-gradient(to bottom, rgba(242,246,248,1) 0%,rgba(216,225,231,1) 55%,rgba(181,198,208,1) 82%,rgba(224,239,249,1) 100%)',
             filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f2f6f8", endColorstr="#e0eff9",GradientType=0 )',             
            }}
             ></div>
            {/* <div style={{ fontSize:'0.7rem', top:'10px', position:'absolute', zIndex:1 }}>Items seleccionados: <span id="MySelectionValue">0</span></div> */}

 
            {/* </div> */}

            {/* {loadViewerLibrary1 ? <Script url={viewerLibaryURL1} onLoad={handleScriptLoad1}></Script> : null} */}
            {loadViewerLibrary ? <Script url={viewerLibaryURL} onLoad={handleScriptLoad}></Script> : null}

            {/* {<Script url={viewerLibaryURL} onLoad={handleScriptLoad}></Script>} 
            {<Script url={viewerLibaryURL1} onLoad={handleScriptLoad1}></Script>} */}
            {/* </div> */}
        </>

    )
}



