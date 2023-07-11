import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer ({ name }){
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  const onConfirm = () =>{
    dispatch({ type:actionTypes.confirm})
  };
  const onError = () =>{
    dispatch({ type:actionTypes.error})
  };
  const onWrite = (newValue) =>{
    dispatch({ type:actionTypes.write, payload: newValue})
  };
  const onCheck = ()=>{
    dispatch({ type:actionTypes.check})
  }
  const onDelete = ()=>{
    dispatch({ type:actionTypes.delete})
  }
  const onReset = () =>{
    dispatch({ type:actionTypes.reset})
  }

  React.useEffect(()=>{
    if(!!state.loading){
      setTimeout(()=>{
          if(state.value === SECURITY_CODE){
            onConfirm();
          }else{
            onError();
          }
      },3000)
    }
  },[state.loading]);

  if(!state.deleted && !state.confirmed){
    return (
      <div>
        <h2> Eliminar {name}</h2>
        <p>Por Favor, Escribe el codigo de seguridad</p>
        {(state.error && !state.loading) && (
          <p> Error: El codigo es incorrecto</p>
        )}
        {state.loading && (
          <p> Cargando...</p>
        )}
        
        <input 
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) =>{
            onWrite(event.target.value);
          }}
        />
        <button onClick={onCheck}>
        Comprobar</button>
      </div>
    );
  }else if(!!state.confirmed && !state.deleted ){
    return(
      <React.Fragment>

        <p>Pedimos Confirmacion... ¿Estas seguro?</p>
        <button onClick={onDelete}>
          Si, eliminar
        </button>
        <button onClick={onReset}>
          No, Me arrepenti
          </button>
      </React.Fragment>
    );
  }else{
    return(
      <React.Fragment>
        <p>Eliminado con Exito</p>
        <button onClick={onReset}>
          Resetear, volver atras
          </button>
      </React.Fragment>
    );
  }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted:false,
    confirmed: false,
}

const actionTypes = {
  confirm: 'CONFIRM',
  delete: 'DELETE',
  error: 'ERROR',
  check: 'CHECK',
  reset: 'RESET',
  write: 'WRITE',
}

const reducerObject = (state,payload)=>({
  [actionTypes.error]: {
    ...state,
    error:true,
    loading:false,
  },
  [actionTypes.check]: {
    ...state,
    loading:true,
  },
  [actionTypes.confirm]:{
    ...state,
    error: false,
    loading: false,
    confirmed:true,
  },
  [actionTypes.delete]:{
    ...state,
    deleted:true,
  },
  [actionTypes.reset]:{
    ...state,
    confirmed:false,
    deleted:false,
    value:'',
  },
  [actionTypes.write]:{
    ...state,
    value:payload,
  },
});

const reducer = (state,action)=>{
  if(reducerObject(state)[action.type]){
    return  reducerObject(state,action.payload)[action.type]
  }else {
    return state;
  }
}
export { UseReducer };