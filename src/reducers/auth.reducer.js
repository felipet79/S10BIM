import {
    SIGN_IN,
    ERROR,
    LOG_OUT,
    LOADING_LOGIN,
    SELECT_COMPANY,
	REFRESH_IDCONNECTION
} from '../constants';

const initialState = {
    DataCompany: JSON.parse(localStorage.getItem("company-s10")),
    auth: false,
	loading: true,
    User: JSON.parse(localStorage.getItem("user-s10")),
    Companies: [],
    Roles: [],
}

const authReducerFn = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOADING_LOGIN:
            return{
                loading: true
            }

        case SIGN_IN:
			localStorage.setItem('user-s10', JSON.stringify(payload));
            return{
                ...state,
				User: payload,
                Companies: payload.Companies,
            }
        case SELECT_COMPANY:
            localStorage.setItem('company-s10', JSON.stringify(payload));
            // console.log(payload);
            return{
                ...state,
                DataCompany: payload
            }

			case REFRESH_IDCONNECTION:
				
				return{
					...state,
					loading: false
				}
		

        case LOG_OUT:
            localStorage.removeItem('company-s10');
			localStorage.removeItem('user-s10');
			localStorage.removeItem('connectionId');
            return{
                ...state,
                auth: false,
                user: null,
                loading: false
            } 

        case ERROR:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default authReducerFn;