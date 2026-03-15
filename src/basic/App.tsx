import { useState, useCallback } from "react";

import { useProducts } from "./hooks/useProducts";
import { useNotification } from "./hooks/useNotification";
import { useCart } from "./hooks/useCart";
import { calculateCartTotal } from "./models/carts";
import { useCoupon } from "./hooks/useCoupon";

import { Header } from "./components/layout/Header";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-md shadow-md text-white flex justify-between items-center ${
                notif.type === "error" ? "bg-red-600" : notif.type === "warning" ? "bg-yellow-600" : "bg-green-600"
              }`}
            >
              <span className="mr-2">{notif.message}</span>
              <button
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
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
