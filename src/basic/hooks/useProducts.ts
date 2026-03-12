import { useState } from "react";
import { initialProducts } from "../constants";
import { ProductWithUI } from "../../types";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductWithUI[]>(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  return {
    products: products,
    setProducts: setProducts,
  };
};
