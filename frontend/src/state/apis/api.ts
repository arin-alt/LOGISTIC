import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: number;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

// Debugging log for base URL
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.error("NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables.");
} else {
  console.log("Fetching from:", process.env.NEXT_PUBLIC_API_BASE_URL + "/expenseSummary.json");
}
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("authToken"); // Example: Retrieve auth token if required
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: async (url, options) => {
      let lastError;
      for (let i = 0; i < 3; i++) { // Retry 3 times
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            const errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
            const errorDetails = await response.json().catch(() => ({ message: errorMessage }));
            throw new Error(errorDetails.message || errorMessage);
          }
          return response; // Successful fetch
        } catch (err) {
          lastError = err;
          console.error(`Attempt ${i + 1} failed:`, err);
          if (i === 2 || (err instanceof Error && err.message.includes("404"))) {
            // Stop retrying for unrecoverable errors
            break;
          }
        }
      }
      throw lastError; // Throw last error if retries fail
    },
  }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Dashboard Metrics Fetched:", data);
        } catch (err) {
          handleApiError("Error fetching dashboard metrics", err);
        }
      },
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched Products:", data);
        } catch (err) {
          handleApiError("Error fetching products", err);
        }
      },
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Product Created:", data);
        } catch (err) {
          handleApiError("Error creating product", err);
        }
      },
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched Users:", data);
        } catch (err) {
          handleApiError("Error fetching users", err);
        }
      },
    }),
    getExpenses: build.query<ExpenseSummary[], void>({
      query: () => "/static/expenseSummary",
      providesTags: ["Expenses"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          validateApiResponse(data, "expense summaries");
          console.log("Fetched Expense Summaries:", data);
        } catch (err) {
          handleApiError("Error fetching expense summaries", err);
        }
      },
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenseByCategory",
      providesTags: ["Expenses"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          validateApiResponse(data, "expenses by category");
          console.log("Fetched Expenses by Category:", data);
        } catch (err) {
          handleApiError("Error fetching expenses by category", err);
        }
      },
    }),
  }),
});

// Helper function to handle API errors
interface CustomError {
  message: string;
  meta?: { [key: string]: any };
}

function handleApiError(context: string, err: unknown): void {
  if (typeof err === "object" && err !== null && "message" in err) {
    const customErr = err as CustomError;
    console.error(`${context} - Error Message:`, customErr.message);
    console.error(`${context} - Error Meta:`, customErr.meta || "No Meta Data");
  }
  console.error(`${context} - Full Error:`, err);
}

// Helper function to validate API response format
function validateApiResponse(data: unknown, context: string): void {
  if (!Array.isArray(data)) {
    console.error(`Validation Error: Invalid data format for ${context}.`, {
      receivedData: data,
      expected: "Array",
    });
    throw new Error(`Invalid data format for ${context}. Expected an array.`);
  }
}

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesQuery,
  useGetExpensesByCategoryQuery,
} = api;
