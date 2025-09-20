import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

export default function ProductForm(){
  const { addProduct } = useInventory();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({name:'', image:'', price:'', stock:'', tags:''});

  const onSubmit = (e) =>{
    e.preventDefault();
    if(!form.name || !form.price) return alert('Please fill name and price');
    addProduct({ name: form.name, image: form.image || `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/400/300`, price: Number(form.price), stock: Math.max(0, Number(form.stock||0)), initialStock: Math.max(0, Number(form.stock||0)), tags: form.tags ? form.tags.split(',').map(t=>t.trim()) : [] });
    setForm({name:'', image:'', price:'', stock:'', tags:''});
    setOpen(false);
  };

  return (
    <div>
      <button onClick={()=>setOpen(true)} className="w-full px-4 py-3 rounded-lg bg-accent text-white font-medium">+ Add Product</button>

      {open && (
        <div className="mt-3 p-4 bg-white rounded-lg card-shadow">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Product name" className="p-2 rounded border" />
            <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} placeholder="Image URL (optional)" className="p-2 rounded border" />
            <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Price" type="number" className="p-2 rounded border" />
            <input value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} placeholder="Stock" type="number" className="p-2 rounded border" />
            <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} placeholder="Tags comma separated" className="p-2 rounded border" />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2 rounded bg-primary text-white">Save</button>
              <button type="button" onClick={()=>setOpen(false)} className="flex-1 py-2 rounded border">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
