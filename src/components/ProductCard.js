import React, { useState } from 'react';
import { formatCurrency } from '../utils';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const onAdd = () => {
    if (product.stock <= 0) { toast.error('Out of stock'); return; }
    if (qty > product.stock) { toast.error('Quantity exceeds available stock'); return; }
    add({ id: product.id, name: product.name, price: product.price, qty });
    toast.success('Added to cart');
  };

  const stockPct = Math.min(100, Math.round((product.stock / (product.initialStock || 20)) * 100));
  const low = product.stock <= 3;

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow hover:-translate-y-1 transform transition">
      <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-lg">{product.name}</div>
          <div className="text-sm text-gray-500 mt-1">{product.tags?.slice(0,2).map(t => <span key={t} className="inline-block mr-2 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{t}</span>)}</div>
        </div>

        <div className="text-right">
          <div className="font-bold">{formatCurrency(product.price)}</div>
          <div className={`text-sm ${low ? 'text-red-500' : 'text-gray-500'}`}>Stock: {product.stock}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
          <div style={{ width: `${stockPct}%` }} className={`h-2 ${low ? 'bg-red-400' : 'bg-green-400'}`}></div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center border rounded">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2"><FaMinus/></button>
          <input type="number" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-14 text-center p-2 outline-none" />
          <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2"><FaPlus/></button>
        </div>

        <button disabled={product.stock <= 0} onClick={onAdd} className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50">Add</button>
        <button className="px-3 py-2 rounded border">Edit</button>
      </div>
    </div>
  );
}
