"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@state/apis/api"; // Corrected alias path
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/components/HeaderIndex"; // Adjusted path for the Header component
import Rating from "@/components/Rating"; // Adjusted path for the Rating component
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

// Define TypeScript type for form data
type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Added explicit typing
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch products using RTK Query with a search term
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  // Mutation for creating a product
  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      await createProduct(productData).unwrap(); // Ensure errors are handled properly
      setIsModalOpen(false); // Close modal after successful creation
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded bg-white focus:outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: ProductFormData & { productId: string }) => (
          <div
            key={product.productId}
            className="border shadow rounded-md p-4 w-full bg-white"
          >
            <div className="flex flex-col items-center">
              <Image
                src={`/images/product-${
                  Math.floor(Math.random() * 3) + 1
                }.png`} // Dynamically select placeholder images
                alt={product.name}
                width={150}
                height={150}
                className="mb-3 rounded-2xl"
              />
              <h3 className="text-lg text-gray-900 font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-800">${product.price.toFixed(2)}</p>
              <div className="text-sm text-gray-600 mt-1">
                Stock: {product.stockQuantity}
              </div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
