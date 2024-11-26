import { useGetDashboardMetricsQuery } from "@/state/apis/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../../components/Rating/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : dashboardMetrics && dashboardMetrics.popularProducts ? (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Popular Products</h3>
          <div className="overflow-auto h-full">
            {dashboardMetrics.popularProducts.map((product, index) => (
              <div
                // Ensure a unique key using productId or fallback to index
                key={product.productId || index}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                {/* Product Image and Details */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    img
                  </div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">{product.name}</div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">${product.price}</span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                {/* Sold Quantity and Action */}
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="m-5 text-gray-500">No popular products available.</div>
      )}
    </div>
  );
};

export default CardPopularProducts;
