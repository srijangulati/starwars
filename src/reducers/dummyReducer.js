//constants
export const DUMMY = "DUMMY";

//actions
function getDummy(){
  return{
    type:DUMMY
  }
}

//thunk
export function fetchDummy(){
  return(dispatch)=>{
    dispatch(getDummy());
  }
}

//initialState
const initialState = {
  dummy:false
}

export default function dummyReducer(state=initialState,actions){
  switch(actions.type){
    case DUMMY:
      return {
        dummy:true
      }
    default:
        return initialState;
  }
}
