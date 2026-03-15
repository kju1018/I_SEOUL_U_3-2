import { useCallback } from "react";

import { useCart } from "./hooks/useCart";
import { calculateCartTotal } from "./models/carts";
import { useCoupon } from "./hooks/useCoupon";

import { Header } from "./components/layout/Header";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { Notification } from "./components/ui/Notification";
import { Layout } from "./components/layout/Layout";
import { useUIStore } from "./store/useUIStore";
import { useProductStore } from "./store/useProductStore";

const App = () => {
  const { notifications, isAdmin, addNotification, removeNotification } = useUIStore();
  const { products } = useProductStore();

  const { cart, setCart, addToCart, removeFromCart, updateQuantity, totalItemCount } = useCart(
    products,
    addNotification,
  );
  const { coupons, selectedCoupon, setSelectedCoupon, applyCoupon, addCoupon, deleteCoupon } =
    useCoupon(addNotification);

  const completeOrder = useCallback(() => {
    const orderNumber = `ORD-${Date.now()}`;
    addNotification(`주문이 완료되었습니다. 주문번호: ${orderNumber}`, "success");
    setCart([]);
    setSelectedCoupon(null);
  }, [addNotification, setCart, setSelectedCoupon]);

  const totals = calculateCartTotal(cart, selectedCoupon);

  return (
    <Layout
      notification={<Notification notifications={notifications} onClose={removeNotification} />}
      header={
        <Header
          totalItemCount={totalItemCount}
          hasCartItems={cart.length > 0}
        />
      }
    >
      {isAdmin ? (
        <AdminPage
          coupons={coupons}
          addCoupon={addCoupon}
          deleteCoupon={deleteCoupon}
          addNotification={addNotification}
        />
      ) : (
        <ShopPage
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
    </Layout>
  );
};

export default App;
