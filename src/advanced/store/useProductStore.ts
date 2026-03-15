import { create } from "zustand";
import { ProductWithUI } from "../../types";
import { initialProducts } from "../constants";
import { useUIStore } from "./useUIStore";

interface ProductState {
  products: ProductWithUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addProduct: (product: Omit<ProductWithUI, "id">) => void;
  updateProduct: (id: string, updates: Partial<ProductWithUI>) => void;
  deleteProduct: (id: string) => void;
  setProducts: (products: ProductWithUI[]) => void;
}

const getInitialProducts = (): ProductWithUI[] => {
  const saved = localStorage.getItem("products");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialProducts;
    }
  }
  return initialProducts;
};

export const useProductStore = create<ProductState>((set) => ({
  products: getInitialProducts(),
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  addProduct: (newProduct) => {
    const { addNotification } = useUIStore.getState();
    set((state) => {
      const product: ProductWithUI = {
        ...newProduct,
        id: `p${Date.now()}`,
      };
      const updatedProducts = [...state.products, product];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
    addNotification("상품이 추가되었습니다.", "success");
  },
  updateProduct: (productId, updates) => {
    const { addNotification } = useUIStore.getState();
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId ? { ...product, ...updates } : product,
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
    addNotification("상품이 수정되었습니다.", "success");
  },
  deleteProduct: (productId) => {
    const { addNotification } = useUIStore.getState();
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== productId);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
    addNotification("상품이 삭제되었습니다.", "success");
  },
  setProducts: (products) => {
    localStorage.setItem("products", JSON.stringify(products));
    set({ products });
  },
}));
