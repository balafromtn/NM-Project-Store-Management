import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";
import { formatCurrency } from "../utils";
import toast from "react-hot-toast";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, remove, clear, total } = useCart();
  const { reduceStocks } = useInventory();

  const checkout = () => {
    if (items.length === 0) {
      toast.error("Cart empty");
      return;
    }
    reduceStocks(items.map((i) => ({ id: i.id, qty: i.qty })));
    const sale = {
      id: Date.now().toString(36),
      date: new Date().toISOString(),
      items,
      total,
    };
    window.dispatchEvent(new CustomEvent("sm_log_sale", { detail: sale }));
    clear();
    toast.success("Checkout successful");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slideable Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-800 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // If dragged more than 120px to the right, close the drawer
              if (info.offset.x > 120) {
                onClose();
              }
            }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cart</h3>
              <div className="text-sm text-gray-500">{items.length} items</div>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
              {items.length === 0 && (
                <div className="text-center text-gray-500">Cart is empty</div>
              )}
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(it.price)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={it.qty}
                      onChange={(e) =>
                        updateQty(
                          it.id,
                          Math.max(1, Number(e.target.value || 1))
                        )
                      }
                      className="w-20 p-2 rounded border"
                    />
                    <button
                      onClick={() => remove(it.id)}
                      className="px-3 py-1 rounded border"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xl font-bold">{formatCurrency(total)}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={checkout}
                  className="flex-1 py-2 rounded bg-primary text-white"
                >
                  Checkout
                </button>
                <button
                  onClick={() => {
                    clear();
                    toast("Cleared");
                  }}
                  className="flex-1 py-2 rounded border"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
