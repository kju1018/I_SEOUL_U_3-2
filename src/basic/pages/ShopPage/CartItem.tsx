import { CartItem as CartItemType } from "../../../types";
import { calculateItemTotal } from "../../models/carts";
import { Button } from "../../components/ui/Button";

interface CartItemProps {
  item: CartItemType;
  cart: CartItemType[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export const CartItem = ({
  item,
  cart,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) => {
  const itemTotal = calculateItemTotal(item, cart);
  const originalPrice = item.product.price * item.quantity;
  const hasDiscount = itemTotal < originalPrice;
  const discountRate = hasDiscount ? Math.round((1 - itemTotal / originalPrice) * 100) : 0;

  return (
    <div className="border-b pb-3 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-gray-900 flex-1">{item.product.name}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.product.id)}
          className="ml-2 hover:text-red-500"
          aria-label="Remove item"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="w-6 h-6"
          >
            <span className="text-xs">−</span>
          </Button>
          <span className="mx-3 text-sm font-medium w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="w-6 h-6"
          >
            <span className="text-xs">+</span>
          </Button>
        </div>
        <div className="text-right">
          {hasDiscount && (
            <span className="text-xs text-red-500 font-medium block">-{discountRate}%</span>
          )}
          <p className="text-sm font-medium text-gray-900">
            {Math.round(itemTotal).toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};
