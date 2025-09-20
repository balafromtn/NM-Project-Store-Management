import React from 'react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import { useSales } from '../context/SalesContext';
import { formatCurrency } from '../utils';

export default function CartPage(){
  const { items, updateQty, remove, clear, total } = useCart();
  const { reduceStocks } = useInventory();
  const { logSale } = useSales();

  const checkout = () =>{
    if(items.length === 0) return alert('Cart empty');
    reduceStocks(items.map(i => ({ id: i.id, qty: i.qty })));
    const sale = { id: Date.now().toString(36), date: new Date().toISOString(), items, total };
    logSale(sale);
    clear();
    alert('Checkout successful!');
  }

  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //     <div className="md:col-span-2">
  //       <h2 className="text-xl font-semibold mb-4">Cart</h2>
  //       {items.length === 0 && <div className="p-6 bg-white rounded card-shadow">Cart is empty</div>}
  //       {items.map(i=> (
  //         <div key={i.id} className="p-4 bg-white rounded mb-3 flex items-center justify-between">
  //           <div>
  //             <div className="font-medium">{i.name}</div>
  //             <div className="text-sm text-gray-500">{formatCurrency(i.price)}</div>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <input type="number" value={i.qty} onChange={e=>updateQty(i.id, Number(e.target.value||1))} className="w-20 p-2 rounded border" />
  //             <button onClick={()=>remove(i.id)} className="px-3 py-2 rounded border">Remove</button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <aside className="p-4 bg-white rounded card-shadow">
  //       <div className="text-sm text-gray-600">Total</div>
  //       <div className="text-2xl font-bold">{formatCurrency(total)}</div>
  //       <div className="mt-4 flex gap-2">
  //         <button onClick={checkout} className="flex-1 py-2 rounded bg-primary text-white">Checkout</button>
  //         <button onClick={clear} className="flex-1 py-2 rounded border">Clear</button>
  //       </div>
  //     </aside>
  //   </div>
  // )
}
