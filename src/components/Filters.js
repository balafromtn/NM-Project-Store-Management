import React from 'react';

export default function Filters({ q, setQ, category, setCategory, sort, setSort, categories }) {
  return (
    <div className="flex gap-3 items-center">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="p-3 rounded-lg border w-64" />
      <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 rounded border">
        <option value="">All categories</option>
        {categories.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="p-2 rounded border">
        <option value="">Sort</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
    </div>
  );
}
