// inventory reducer
export function inventoryReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];

    case "UPDATE_STOCK":
      return state.map((p) =>
        p.id === action.payload.id
          ? { ...p, stock: Math.max(0, action.payload.stock) }
          : p
      );

    case "REDUCE_STOCKS":
      return state.map((p) => {
        const found = action.payload.find((x) => x.id === p.id);
        if (!found) return p;
        return { ...p, stock: Math.max(0, p.stock - found.qty) };
      });

    case "EDIT_PRODUCT":
      return state.map((p) =>
        p.id === action.payload.id
          ? { ...p, ...action.payload.updates }
          : p
      );

    default:
      return state;
  }
}

// cart reducer
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists) {
        return state.map((i) =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + action.payload.qty }
            : i
        );
      }
      return [...state, action.payload];
    }

    case "UPDATE_QTY":
      return state.map((i) =>
        i.id === action.payload.id
          ? { ...i, qty: Math.max(1, action.payload.qty) }
          : i
      );

    case "EDIT_ITEM": // ✅ new case
      return state.map((i) =>
        i.id === action.payload.id
          ? { ...i, ...action.payload.updates }
          : i
      );

    case "REMOVE":
      return state.filter((i) => i.id !== action.payload.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

// sales reducer
export function salesReducer(state, action) {
  switch (action.type) {
    case "LOG_SALE":
      return [action.payload, ...state];
    default:
      return state;
  }
}
