import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {refreshConnection} from './actions/signalr.action';
import React, { useEffect } from 'react';
import SignIn from "./views/Signin";
// import SignUp from "./views/Signup";
import Layout from './views/layout';

//Views
// import Proyects from "./views/Proyects";
import Home from "./views/Home";

import Proyects from "./views/Proyects";
// import Test from "./views/Test";

import 'devextreme/dist/css/dx.light.css';
import Presupuestos from "./views/Presupuestos";

import Models from "./views/Models";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);	
	useEffect(() => {
		
		if (auth.loading) {
			dispatch(refreshConnection());
		}
	}, [auth.loading]);


	if(auth.loading) return 'Cargando...';
  return (
    <Router>
      <Switch>
		    {/* <Route path="/test" component={Test} /> */}
        <Route exact path="/" component={SignIn} />
        {/* <Route path="/signup" component={SignUp} /> */}

        <Layout>
          {/* <Route path="/inicio" component={Home} /> */}
          {/* <Route path="/inicio" component={Proyects} /> */}
          {/* <Route path="/proyects/:codProject" component={Proyects} /> */}
          <Route path="/presupuesto" component={Presupuestos} />

          <Route path="/modelos" component={Models} />

          
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
