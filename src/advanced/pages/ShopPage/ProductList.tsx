import { ProductWithUI, CartItem } from "../../../types";
import { ProductEmptyState } from "./ProductEmptyState";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: ProductWithUI[];
  filteredProducts: ProductWithUI[];
  searchTerm: string;
  cart: CartItem[];
  addToCart: (product: ProductWithUI) => void;
  isAdmin: boolean;
}

export const ProductList = ({
  products,
  filteredProducts,
  searchTerm,
  cart,
  addToCart,
  isAdmin,
}: ProductListProps) => {
  return (
    <section>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">전체 상품</h2>
        <div className="text-sm text-gray-600">총 {products.length}개 상품</div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <ProductEmptyState searchTerm={searchTerm} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              addToCart={addToCart}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </section>
  );
};
