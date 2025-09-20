import React, { createContext, useReducer, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { salesReducer } from './reducers';

const SalesContext = createContext();

export function SalesProvider({children}){
  const [stored, setStored] = useLocalStorage('sm_sales', []);
  const [state, dispatch] = useReducer(salesReducer, stored);
  React.useEffect(()=> setStored(state), [state]);

  const logSale = (sale) => dispatch({type:'LOG_SALE', payload: sale});

  useEffect(()=>{
    const handler = (e) => { if(e?.detail) logSale(e.detail); };
    window.addEventListener('sm_log_sale', handler);
    return ()=> window.removeEventListener('sm_log_sale', handler);
  }, []);

  return (
    <SalesContext.Provider value={{ sales: state, logSale }}>
      {children}
    </SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);
