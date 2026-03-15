import { ProductWithUI } from '../../../types';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../../components/ui/Button';

interface ProductRowProps {
  product: ProductWithUI;
  onEdit: (product: ProductWithUI) => void;
  onDelete: (productId: string) => void;
}

export const ProductRow = ({ product, onEdit, onDelete }: ProductRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatPrice(product.price, true)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.stock > 10
              ? "bg-green-100 text-green-800"
              : product.stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock}개
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {product.description || "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="link"
          onClick={() => onEdit(product)}
          className="mr-3"
        >
          수정
        </Button>
        <Button
          variant="link"
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-900"
        >
          삭제
        </Button>
      </td>
    </tr>
  );
};
