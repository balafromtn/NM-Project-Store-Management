import React from 'react';
import { FaBoxOpen, FaShoppingCart, FaReceipt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';

export default function Header({ route, setRoute, openCart, cartOpen }) {
  const { items } = useCart();
  const { products } = useInventory();

  const lowCount = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold text-primary">Store Manager</div>
          <div className="hidden md:block text-sm text-gray-500">Inventory & Sales</div>
        </div>

        <nav className="flex items-center gap-2">
          {/* Inventory button */}
          <button
            onClick={() => setRoute('inventory')}
            className={`px-3 py-2 rounded-md ${route === 'inventory' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <FaBoxOpen className="inline mr-2" />Inventory
            {lowCount > 0 && (
              <span className="ml-2 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                {lowCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={openCart}
            className={`px-3 py-2 rounded-md ${cartOpen ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <FaShoppingCart className="inline mr-2" />Cart
            <span className="ml-1 px-2 py-0.5 text-xs rounded bg-gray-100">{cartCount}</span>
          </button>

          {/* Sales button */}
          <button
            onClick={() => setRoute('sales')}
            className={`px-3 py-2 rounded-md ${route === 'sales' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <FaReceipt className="inline mr-2" />Sales
          </button>
        </nav>
      </div>
    </header>
  );
}
