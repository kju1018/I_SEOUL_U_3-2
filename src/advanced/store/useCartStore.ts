import { create } from "zustand";
import { CartItem, ProductWithUI } from "../../types";
import { getRemainingStock } from "../models/carts";
import { useUIStore } from "./useUIStore";
import { useProductStore } from "./useProductStore";

interface CartState {
  cart: CartItem[];
  addToCart: (product: ProductWithUI) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  setCart: (cart: CartItem[]) => void;
  totalItemCount: number;
}

const getInitialCart = (): CartItem[] => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: getInitialCart(),
  totalItemCount: getInitialCart().reduce((sum, item) => sum + item.quantity, 0),

  addToCart: (product) => {
    const { cart } = get();
    const { addNotification } = useUIStore.getState();
    const remainingStock = getRemainingStock(product, cart);

    if (remainingStock <= 0) {
      addNotification("재고가 부족합니다!", "error");
      return;
    }

    const existingItem = cart.find((item) => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      if (newQuantity > product.stock) {
        addNotification(`재고는 ${product.stock}개까지만 있습니다.`, "error");
        return;
      }
      updatedCart = cart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: newQuantity } : item,
      );
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    set({ cart: updatedCart, totalItemCount: totalCount });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    addNotification("장바구니에 담았습니다", "success");
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    
    if (updatedCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem("cart");
    }
    
    const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    set({ cart: updatedCart, totalItemCount: totalCount });
  },

  updateQuantity: (productId, newQuantity) => {
    const { cart, removeFromCart } = get();
    const { products } = useProductStore.getState();
    const { addNotification } = useUIStore.getState();

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (newQuantity > product.stock) {
      addNotification(`재고는 ${product.stock}개까지만 있습니다.`, "error");
      return;
    }

    const updatedCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item,
    );
    
    const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    set({ cart: updatedCart, totalItemCount: totalCount });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  setCart: (cart) => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    set({ cart, totalItemCount: totalCount });
  },
}));
