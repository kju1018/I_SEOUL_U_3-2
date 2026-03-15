import { useProductForm } from '../../hooks/useProductForm';
import { ProductForm } from './ProductForm';
import { ProductTable } from './ProductTable';
import { Button } from '../../components/ui/Button';
import { useProductStore } from '../../store/useProductStore';
import { useUIStore } from '../../store/useUIStore';

interface ProductManagementProps {}

export const ProductManagement = ({}: ProductManagementProps) => {
  const { products, deleteProduct } = useProductStore();
  const { addNotification } = useUIStore();
  const {
    showProductForm,
    setShowProductForm,
    editingProduct,
    setEditingProduct,
    productForm,
    setProductForm,
    handleProductSubmit,
    startEditProduct,
  } = useProductForm();

  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">상품 목록</h2>
          <Button
            onClick={() => {
              setEditingProduct("new");
              setProductForm({ name: "", price: 0, stock: 0, description: "", discounts: [] });
              setShowProductForm(true);
            }}
          >
            새 상품 추가
          </Button>
        </div>
      </div>

      <ProductTable
        products={products}
        onEdit={startEditProduct}
        onDelete={deleteProduct}
      />
      {showProductForm && (
        <ProductForm
          editingProduct={editingProduct}
          productForm={productForm}
          setProductForm={setProductForm}
          onSubmit={handleProductSubmit}
          onCancel={() => {
            setEditingProduct(null);
            setProductForm({ name: "", price: 0, stock: 0, description: "", discounts: [] });
            setShowProductForm(false);
          }}
          addNotification={addNotification}
        />
      )}
    </section>

  );
};
