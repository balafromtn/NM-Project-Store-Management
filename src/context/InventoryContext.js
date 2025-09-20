import React, { createContext, useReducer, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { inventoryReducer } from './reducers';
import { uid } from '../utils';

const InventoryContext = createContext();

const initialProducts = [
  { id: uid(), name: 'Laptop', image: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg', price: 120000, stock: 8, initialStock: 12, tags: ['accesories','electorics'] },
  { id: uid(), name: 'Smart Phone', image: 'https://pisces.bbystatic.com/image2/BestBuy_US/dam/REF-REF-2658350-bento-apple-sv_DER-4df4ae4c-6322-42ae-ab25-11f1e3ef81ff.jpg?format=webp;maxWidth=1400;maxHeight=996', price: 4200, stock: 2, initialStock: 6, tags: ['accesories','electorics'] },
];

export function InventoryProvider({children}){
  const [stored, setStored] = useLocalStorage('sm_inventory', initialProducts);
  const [state, dispatch] = useReducer(inventoryReducer, stored);

  React.useEffect(()=> setStored(state), [state]);

  const addProduct = (data) => dispatch({type:'ADD_PRODUCT', payload:{...data, id: uid() }});
  const updateStock = (id, stock) => dispatch({type:'UPDATE_STOCK', payload:{id, stock}});
  const reduceStocks = (items) => dispatch({type:'REDUCE_STOCKS', payload: items});
  const editProduct = (id, updates) => dispatch({type:'EDIT_PRODUCT', payload:{id, updates}});

  return (
    <InventoryContext.Provider value={{ products: state, addProduct, updateStock, reduceStocks, editProduct }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
