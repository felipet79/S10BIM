import { SIGN_IN, SELECT_COMPANY, LOG_OUT } from "../constants";
import {connectSignalr} from './signalr.action';
import axios from "axios";


export const signIn = (form, showFn) => {
  return async (dispatch) => { 
      try {
        form.ModuleId = 21;
        form.AccessTypeId = 2;
        const { data } = await axios.post("http://200.48.100.203:5033/api/SecurityAuthApi/LogonApp", form);
        console.log(data, "<--- response");

        if (data.Type === 1) {
          alert(data.Message);
          return;
        } else {
          dispatch({
            type: SIGN_IN,
            payload: data.Value,
          });
          showFn()
        }
      } catch (error) {
        console.error(error);
      }
  };
};




export const selectCompany = (company, history) => {
  return async (dispatch) => {
    console.log(company, '<--- DataCompany');
	// console.log(history);
	dispatch(connectSignalr(company.Token));
	dispatch({
		type: SELECT_COMPANY,
		payload: company,
	  });
    history.push("/presupuesto");
    window.location.reload(true);
  };
};

export const logOut = (history) => {
	return async (dispatch) => {
	  dispatch({
		  type: LOG_OUT,
		});
		history.push("/");
	};
  };
  
