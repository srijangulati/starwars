export const GET_LOGIN = "GET_LOGIN";
export const GET_LOGIN_SUCCESS ="GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";

//actions
function getLogin(){
  return{
    type: GET_LOGIN
  }
}

function getLoginSuccess(data){
  return{
    type:GET_LOGIN_SUCCESS,
    data
  }
}

function getLoginFailure(){
  return{
    type:GET_LOGIN_FAILURE
  }
}

//thunk
export function fetchLogin({name,password}){
  return(dispatch)=>{
    fetch("https://swapi.co/api/people/?search="+name)
      .then((res)=>res.json())
      .then((res)=>{
        if(res.count){
          res.results.map((result)=>{
            if(result.name === name && result.birth_year === password){
              dispatch(getLoginSuccess(result));
            }
          })
        }
        dispatch(getLoginFailure());
      })
      .catch((err)=>{
        dispatch(getLoginFailure());
      })
  }
}

const initialState = {
  isLoginingIn:false,
  loggedIn:{},
  isLoginError:false
};

export default function LoginReducer(state=initialState,actions){
  switch (actions.type) {
    case GET_LOGIN:
      return{
          isLoginingIn:true,
          loggedIn:{},
          isLoginError:false
        };
    case GET_LOGIN_SUCCESS:
      return{
          isLoginingIn:false,
          loggedIn:actions.data,
          isLoginError:false
        };
    case GET_LOGIN_FAILURE:
      return{
          isLoginingIn:false,
          loggedIn:{},
          isLoginError:true
        };
    default:
      return initialState;

  }
}
