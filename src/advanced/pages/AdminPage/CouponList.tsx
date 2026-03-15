import { CouponCard } from './CouponCard';

import { useCouponStore } from '../../store/useCouponStore';

interface CouponListProps {}

export const CouponList = ({}: CouponListProps) => {
  const { coupons, deleteCoupon } = useCouponStore();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.code}
          coupon={coupon}
          onDelete={deleteCoupon}
        />
      ))}
    </div>
  );
};
