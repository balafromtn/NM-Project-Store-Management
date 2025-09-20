import React, { useState, useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import Filters from '../components/Filters';

export default function InventoryPage(){
  const { products } = useInventory();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const categories = useMemo(()=> {
    const s = new Set();
    products.forEach(p => (p.tags||[]).forEach(t => s.add(t)));
    return Array.from(s);
  }, [products]);

  let filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || (p.tags||[]).join(' ').toLowerCase().includes(q.toLowerCase()));
  if(category) filtered = filtered.filter(p => (p.tags||[]).includes(category));
  if(sort==='price_asc') filtered = filtered.sort((a,b)=> a.price - b.price);
  if(sort==='price_desc') filtered = filtered.sort((a,b)=> b.price - a.price);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <Filters q={q} setQ={setQ} category={category} setCategory={setCategory} sort={sort} setSort={setSort} categories={categories} />
        </div>
        <div className="w-56">
          <ProductForm />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {filtered.length} products</div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Low stock threshold:</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
