import { Coupon, CartItem } from "../../../types";
import { ProductList } from "./ProductList";
import { CartList } from "./CartList";
import { CartDiscount } from "./CartDiscount";
import { OrderSummary } from "./OrderSummary";
import { useCartStore } from "../../store/useCartStore";
import { useProductStore } from "../../store/useProductStore";

interface ShopPageProps {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  setSelectedCoupon: (coupon: Coupon | null) => void;
  applyCoupon: (cart: CartItem[], coupon: Coupon) => void;
  totals: {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
  };
  completeOrder: () => void;
  isAdmin: boolean;
}

export const ShopPage = ({
  coupons,
  selectedCoupon,
  setSelectedCoupon,
  applyCoupon,
  totals,
  completeOrder,
  isAdmin,
}: ShopPageProps) => {
  const { cart } = useCartStore();
  const { products } = useProductStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ProductList isAdmin={isAdmin} />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          <CartList />

          {cart.length > 0 && (
            <>
              <CartDiscount
                coupons={coupons}
                selectedCoupon={selectedCoupon}
                onApplyCoupon={(coupon) => applyCoupon(cart, coupon)}
                onSelectCoupon={setSelectedCoupon}
              />
              <OrderSummary totals={totals} onCompleteOrder={completeOrder} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
