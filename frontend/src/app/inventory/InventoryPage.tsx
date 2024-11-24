"use client";

import React from "react";
import { useGetProductsQuery } from "@/state/apis/api";
import Header from "@/components/Header";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";

// Define the structure of the product object for TypeScript typing
interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (params: any) => 
      `$${(params.row as Product).price.toFixed(2)}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (params: any) => 
      (params.row as Product).rating ? (params.row as Product).rating!.toFixed(1) : "N/A",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
    valueGetter: (params: any) => 
      (params.row as Product).stockQuantity.toString(),
  },
];

const Inventory: React.FC = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

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
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products as Product[]}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        autoHeight
      />
    </div>
  );
};

export default Inventory;
