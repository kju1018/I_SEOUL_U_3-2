import { Coupon } from '../../../types';
import { CouponCard } from './CouponCard';

interface CouponListProps {
  coupons: Coupon[];
  onDelete: (id: string) => void;
}

export const CouponList = ({ coupons, onDelete }: CouponListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.code}
          coupon={coupon}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
