import { useCallback } from "react";

import { Header } from "./components/layout/Header";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { Notification } from "./components/ui/Notification";
import { Layout } from "./components/layout/Layout";
import { useUIStore } from "./store/useUIStore";
import { useCartStore } from "./store/useCartStore";
import { useCouponStore } from "./store/useCouponStore";

const App = () => {
  const { notifications, isAdmin, addNotification, removeNotification } = useUIStore();

  const { setCart } = useCartStore();
  const { setSelectedCoupon } = useCouponStore();

  const completeOrder = useCallback(() => {
    const orderNumber = `ORD-${Date.now()}`;
    addNotification(`주문이 완료되었습니다. 주문번호: ${orderNumber}`, "success");
    setCart([]);
    setSelectedCoupon(null);
  }, [addNotification, setCart, setSelectedCoupon]);

  return (
    <Layout
      notification={<Notification notifications={notifications} onClose={removeNotification} />}
      header={<Header />}
    >
      {isAdmin ? (
        <AdminPage />
      ) : (
        <ShopPage
          completeOrder={completeOrder}
          isAdmin={isAdmin}
        />
      )}
    </Layout>
  );
};

export default App;
