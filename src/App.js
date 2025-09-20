import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import CartDrawer from './components/CartDrawer';

function App() {
  const [route, setRoute] = useState('inventory');
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // Close cart drawer automatically when route changes
  useEffect(() => {
    closeCart();
  }, [route]);

  return (
    <div className="bg-white min-h-screen relative">
      {/* Pass cartOpen state to Header */}
      <Header route={route} setRoute={setRoute} openCart={openCart} cartOpen={cartOpen} />

      <main className="max-w-6xl mx-auto p-4">
        {route === 'inventory' && <InventoryPage />}
        {route === 'sales' && <SalesPage />}
      </main>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </div>
  );
}

export default App;
