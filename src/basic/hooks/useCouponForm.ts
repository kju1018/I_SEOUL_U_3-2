import { useState } from 'react';
import { Coupon } from '../../types';

interface UseCouponFormProps {
  addCoupon: (coupon: Coupon) => void;
}

export const useCouponForm = ({ addCoupon }: UseCouponFormProps) => {
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    name: '',
    code: '',
    discountType: 'amount' as 'amount' | 'percentage',
    discountValue: 0
  });

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(couponForm);
    setCouponForm({
      name: '',
      code: '',
      discountType: 'amount',
      discountValue: 0
    });
    setShowCouponForm(false);
  };

  return {
    showCouponForm,
    setShowCouponForm,
    couponForm,
    setCouponForm,
    handleCouponSubmit
  };
};
