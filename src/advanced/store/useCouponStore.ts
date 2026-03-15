import { create } from "zustand";
import { Coupon, CartItem } from "../../types";
import { initialCoupons } from "../constants";
import { calculateCartTotal } from "../models/carts";
import { useUIStore } from "./useUIStore";

interface CouponState {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  addCoupon: (newCoupon: Coupon) => void;
  deleteCoupon: (couponCode: string) => void;
  applyCoupon: (cart: CartItem[], coupon: Coupon) => void;
  setSelectedCoupon: (coupon: Coupon | null) => void;
  setCoupons: (coupons: Coupon[]) => void;
}

const getInitialCoupons = (): Coupon[] => {
  const saved = localStorage.getItem("coupons");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialCoupons;
    }
  }
  return initialCoupons;
};

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: getInitialCoupons(),
  selectedCoupon: null,

  addCoupon: (newCoupon) => {
    const { coupons } = get();
    const { addNotification } = useUIStore.getState();
    const existingCoupon = coupons.find((c) => c.code === newCoupon.code);

    if (existingCoupon) {
      addNotification("이미 존재하는 쿠폰 코드입니다.", "error");
      return;
    }

    const updatedCoupons = [...coupons, newCoupon];
    set({ coupons: updatedCoupons });
    localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
    addNotification("쿠폰이 추가되었습니다.", "success");
  },

  deleteCoupon: (couponCode) => {
    const { coupons, selectedCoupon } = get();
    const { addNotification } = useUIStore.getState();
    const updatedCoupons = coupons.filter((c) => c.code !== couponCode);

    set({ coupons: updatedCoupons });
    localStorage.setItem("coupons", JSON.stringify(updatedCoupons));

    if (selectedCoupon?.code === couponCode) {
      set({ selectedCoupon: null });
    }
    
    addNotification("쿠폰이 삭제되었습니다.", "success");
  },

  applyCoupon: (cart, coupon) => {
    const { selectedCoupon } = get();
    const { addNotification } = useUIStore.getState();
    const currentTotal = calculateCartTotal(cart, selectedCoupon).totalAfterDiscount;

    if (currentTotal < 10000 && coupon.discountType === "percentage") {
      addNotification("percentage 쿠폰은 10,000원 이상 구매 시 사용 가능합니다.", "error");
      return;
    }

    set({ selectedCoupon: coupon });
    addNotification("쿠폰이 적용되었습니다.", "success");
  },

  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),

  setCoupons: (coupons) => {
    set({ coupons });
    localStorage.setItem("coupons", JSON.stringify(coupons));
  },
}));
