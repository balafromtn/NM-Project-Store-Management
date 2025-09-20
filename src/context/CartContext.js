import React, { createContext, useReducer, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { cartReducer } from './reducers';

const CartContext = createContext();

export function CartProvider({children}){
  const [stored, setStored] = useLocalStorage('sm_cart', []);
  const [state, dispatch] = useReducer(cartReducer, stored);

  React.useEffect(()=> setStored(state), [state]);

  const add = (item) => dispatch({type:'ADD', payload:item});
  const updateQty = (id, qty) => dispatch({type:'UPDATE_QTY', payload:{id, qty}});
  const remove = (id) => dispatch({type:'REMOVE', payload:{id}});
  const clear = () => dispatch({type:'CLEAR'});

  const total = state.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state, add, updateQty, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
