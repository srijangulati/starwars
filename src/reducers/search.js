export const GET_PLANET = "GET_PLANET";
export const GET_PLANET_SUCCESS = "GET_PLANET_SUCCESS";
export const GET_PLANET_FAILURE = "GET_PLANET_FAILURE";
export const SET_NEXT = "SET_NEXT"

//actions
function getPlanet(){
  return{
    type:GET_PLANET
  }
}
function getPlanetSuccess(data){
  return{
    type:GET_PLANET_SUCCESS,
    data
  }
}
function getPlanetFailure(){
  return{
    type:GET_PLANET_SUCCESS
  }
}
function setNext(data){
  return{
    type:SET_NEXT,
    data
  }
}

//thunk
export function fetchPlanets(search){
  return (dispatch)=>{
    dispatch(getPlanet())
    fetch("https://swapi.co/api/planets?search="+search)
      .then((res)=>res.json())
      .then((res)=>{
        res.results.sort((a,b)=>{return parseInt(a.population)-parseInt(b.population)});
        dispatch(setNext(res.next));
        dispatch(getPlanetSuccess(res.results));
      })
      .catch((err)=>{
        dispatch(getPlanetFailure());
      })
  }
}

export function fetchNext(next){
  return (dispatch)=>{
    dispatch(getPlanet())
    fetch(next)
      .then((res)=>res.json())
      .then((res)=>{
        res.results.sort((a,b)=>{return parseInt(a.population)-parseInt(b.population)});
        dispatch(setNext(res.next));
        dispatch(getPlanetSuccess(res.results));
      })
      .catch((err)=>{
        dispatch(getPlanetFailure());
      })
  }
}

const initialState = {
  isFetching:false,
  planets:[],
  isError:false,
  next:''
}

export default function SearchReducer(state=initialState,actions){
  switch (actions.type) {
    case GET_PLANET:
      return{
        ...state,
        isFetching:true
      }
    case GET_PLANET_SUCCESS:
      return {
        ...state,
        isFetching:false,
        planets:actions.data,
        isError:false
      }
    case GET_PLANET_FAILURE:
      return{
        ...state,
        isFetching:false,
        isError:true
      }
    case SET_NEXT:
      return{
        ...state,
        next:actions.data
      }
    default:
      return initialState;

  }
}
