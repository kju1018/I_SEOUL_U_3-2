import { Coupon } from '../../../types';
import { useCouponForm } from '../../hooks/useCouponForm';
import { Button } from '../../components/ui/Button';

import { CouponForm } from './CouponForm';
import { CouponList } from './CouponList';

interface CouponManagementProps {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export const CouponManagement = ({
  coupons,
  addCoupon,
  deleteCoupon,
  addNotification
}: CouponManagementProps) => {
  const { showCouponForm, setShowCouponForm, couponForm, setCouponForm, handleCouponSubmit } = useCouponForm({
    addCoupon,
  });

  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">쿠폰 관리</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <CouponList
            coupons={coupons}
            onDelete={deleteCoupon}
          />

          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowCouponForm(!showCouponForm)}
              className="flex flex-col items-center h-auto py-2"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="mt-2 text-sm font-medium">새 쿠폰 추가</p>
            </Button>
          </div>
        </div>

        {showCouponForm && (
          <CouponForm
            couponForm={couponForm}
            setCouponForm={setCouponForm}
            onSubmit={handleCouponSubmit}
            onCancel={() => setShowCouponForm(false)}
            addNotification={addNotification}
          />
        )}
      </div>
    </section>
  );
};
