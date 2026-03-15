import { calculateCartTotal } from "../../models/carts";
import { ProductList } from "./ProductList";
import { CartList } from "./CartList";
import { CartDiscount } from "./CartDiscount";
import { OrderSummary } from "./OrderSummary";
import { useCartStore } from "../../store/useCartStore";
import { useCouponStore } from "../../store/useCouponStore";

interface ShopPageProps {
  completeOrder: () => void;
}

export const ShopPage = ({
  completeOrder,
}: ShopPageProps) => {
  const { cart } = useCartStore();
  const { selectedCoupon } = useCouponStore();
  
  const totals = calculateCartTotal(cart, selectedCoupon);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ProductList />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          <CartList />

          {cart.length > 0 && (
            <>
              <CartDiscount />
              <OrderSummary totals={totals} onCompleteOrder={completeOrder} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
