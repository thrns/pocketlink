'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductList from './components/ProductList';
import ProductTypeModal from './components/ProductTypeModal';
import CreateProductModal from './components/CreateProductModal';
import ExternalLinkModal from './components/ExternalLinkModal';
import { useShop } from '@/app/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { Package, Plus, TrendingDown, DollarSign } from 'lucide-react';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';

export default function InventoryPage() {
  const router = useRouter();
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    loading,
    discounts,
  } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExternalLinkModalOpen, setIsExternalLinkModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (product) =>
        (product.title || product.name || '').toLowerCase().includes(query) ||
        (product.description || '').toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleEditProduct = (product) => {
    setProductToEdit(product);

    // Check if it's an external link product
    if (product.product_type === 'external_link') {
      setIsExternalLinkModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAddProduct = async (product, imageFile) => {
    await addProduct(product, imageFile);
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async (productId, product, imageFile) => {
    await editProduct(productId, product, imageFile);
    setIsModalOpen(false);
  };

  const handleProductTypeSelect = (type) => {
    if (type === 'external_link') {
      // For external link products, open the ExternalLinkModal
      setIsExternalLinkModalOpen(true);
      setIsTypeModalOpen(false);
    } else {
      // For other product types, proceed with CreateProductModal
      setSelectedProductType(type);
      setIsTypeModalOpen(false);
      setIsModalOpen(true);
    }
  };

  const handleCreateProduct = () => {
    setProductToEdit(null);
    setIsTypeModalOpen(true);
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ECOMMERCE_SHOP}
      featureName="E-commerce"
      description="Manage your product catalog with advanced inventory management. Add products, track stock, and organize your e-commerce store efficiently."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            {/* Header Section */}
            <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center justify-start gap-4">
                <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-3 shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Inventory Management
                  </h1>
                  <p className="text-gray-600">
                    Manage your products, pricing, and inventory
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white">
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            {/* Product Grid */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Products
                </h2>
                <p className="text-gray-600">
                  Manage your product catalog and inventory
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: 'Wireless Headphones',
                      price: '₹2,999',
                      stock: 24,
                      image: '/placeholder-product.jpg',
                      status: 'active',
                    },
                    {
                      name: 'Smart Watch',
                      price: '₹8,999',
                      stock: 12,
                      image: '/placeholder-product.jpg',
                      status: 'active',
                    },
                    {
                      name: 'Phone Case',
                      price: '₹599',
                      stock: 45,
                      image: '/placeholder-product.jpg',
                      status: 'active',
                    },
                    {
                      name: 'Bluetooth Speaker',
                      price: '₹1,899',
                      stock: 8,
                      image: '/placeholder-product.jpg',
                      status: 'low stock',
                    },
                    {
                      name: 'Laptop Stand',
                      price: '₹1,299',
                      stock: 18,
                      image: '/placeholder-product.jpg',
                      status: 'active',
                    },
                    {
                      name: 'USB Cable',
                      price: '₹299',
                      stock: 67,
                      image: '/placeholder-product.jpg',
                      status: 'active',
                    },
                  ].map((product, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3 h-48 rounded bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-purple-600">
                        {product.price}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm text-gray-700">
                          Edit
                        </button>
                        <button className="rounded bg-red-100 px-3 py-2 text-sm text-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Low Stock Items
                    </p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-yellow-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Value
                    </p>
                    <p className="text-2xl font-bold text-gray-900">₹89,456</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <main className="h-full w-full space-y-6 overflow-y-auto p-6">
        {/* Header Section */}
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-violet p-3">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Inventory Management
              </h1>
              <p className="text-gray-600">
                Manage your products, pricing, and inventory
              </p>
            </div>
          </div>

          {/* Add Product Button */}
          <div className="md:ml-0 ml-16">
            <Button
              onClick={() => {
                setProductToEdit(null);
                handleCreateProduct();
              }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={16} />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Section */}

        <ProductList
          products={filteredProducts}
          onDeleteProduct={deleteProduct}
          setIsModalOpen={setIsModalOpen}
          onEditProduct={handleEditProduct}
          setProductToEdit={setProductToEdit}
          onCreateCategory={handleCreateProduct}
        />

        <ProductTypeModal
          isOpen={isTypeModalOpen}
          onClose={() => setIsTypeModalOpen(false)}
          onSelectType={handleProductTypeSelect}
        />

        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleAddProduct}
          onEdit={handleUpdateProduct}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
          productType={selectedProductType}
          discounts={discounts}
        />

        <ExternalLinkModal
          isOpen={isExternalLinkModalOpen}
          onClose={() => setIsExternalLinkModalOpen(false)}
          productToEdit={productToEdit}
        />
      </main>
    </PremiumGate>
  );
}
