import { useState, useCallback } from "react";

import { useProducts } from "./hooks/useProducts";
import { useNotification } from "./hooks/useNotification";
import { useCart } from "./hooks/useCart";
import { calculateCartTotal } from "./models/carts";
import { useCoupon } from "./hooks/useCoupon";

import { Header } from "./components/layout/Header";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { Notification } from "./components/ui/Notification";

const App = () => {
  const { notifications, setNotifications, addNotification } = useNotification();
  const { products, filteredProducts, searchTerm, setSearchTerm, addProduct, updateProduct, deleteProduct } =
    useProducts(addNotification);

  const { cart, setCart, addToCart, removeFromCart, updateQuantity, totalItemCount } = useCart(
    products,
    addNotification,
  );
  const { coupons, selectedCoupon, setSelectedCoupon, applyCoupon, addCoupon, deleteCoupon } =
    useCoupon(addNotification);

  const [isAdmin, setIsAdmin] = useState(false);


  const completeOrder = useCallback(() => {
    const orderNumber = `ORD-${Date.now()}`;
    addNotification(`주문이 완료되었습니다. 주문번호: ${orderNumber}`, "success");
    setCart([]);
    setSelectedCoupon(null);
  }, [addNotification]);

  const totals = calculateCartTotal(cart, selectedCoupon);

  const handleCloseNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, [setNotifications]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Notification
        notifications={notifications}
        onClose={handleCloseNotification}
      />
      
      <Header
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalItemCount={totalItemCount}
        hasCartItems={cart.length > 0}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            addCoupon={addCoupon}
            deleteCoupon={deleteCoupon}
            addNotification={addNotification}
          />
        ) : (
          <ShopPage
            products={products}
            filteredProducts={filteredProducts}
            searchTerm={searchTerm}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
            applyCoupon={applyCoupon}
            totals={totals}
            completeOrder={completeOrder}
            isAdmin={isAdmin}
          />
        )}
      </main>
    </div>
  );
};

export default App;
