"use client";

import { useGetUsersQuery } from "@state/apis/api";
import Header from "@components/Header";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 }, // Updated to match the "id" field from API
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  // State for pagination model
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10, // Default page size
  });

  if (isLoading) {
    return <div className="py-4 text-center text-gray-500">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch users. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <Header name="Users" />

      {/* DataGrid Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 mt-5 p-4">
        <DataGrid
          rows={users} // Rows data comes from the API response
          columns={columns} // Columns configuration
          getRowId={(row) => row.id} // Use "id" as the unique identifier
          checkboxSelection // Enables checkbox selection
          pagination // Enables pagination
          paginationModel={paginationModel} // Bind pagination model
          onPaginationModelChange={setPaginationModel} // Handle pagination changes
          className="!text-gray-700"
          autoHeight // Adjusts grid height automatically
        />
      </div>
    </div>
  );
};

export default Users;
