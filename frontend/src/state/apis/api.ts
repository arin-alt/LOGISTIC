import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string; // Updated to match the schema
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface Users {
  id: string;
  name: string;
  email: string;
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

// Ensure the API base URL is properly set
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables."
  );
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    // Fetch dashboard metrics
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

    // Fetch products
    getProducts: build.query<Product[], string | void>({
      query: () => "/api/products",
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

    // Mutation to create a new product
    createProduct: build.mutation<void, Partial<Product>>({
      query: (newProduct) => ({
        url: "/api/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"], // Re-fetch products after creation
    }),

    // Fetch users
    getUsers: build.query<Users[], void>({
      query: () => "/api/users",
      providesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched Users:", data);
        } catch (err) {
          handleApiError("Error fetching Users", err);
        }
      },
    }),

    // Fetch expense summaries
    getExpenses: build.query<ExpenseSummary[], void>({
      query: () => "/api/expenseSummary",
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

    // Fetch expenses by category
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/api/expenseByCategory",
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
function handleApiError(context: string, err: unknown): void {
  console.log(`${context} - Full Error Object:`, err);

  if (err instanceof Error) {
    // Handle standard Error object
    console.error(`${context} - Error Message:`, err.message);
  } else if (typeof err === "string") {
    // Handle string errors
    console.error(`${context} - Error Message:`, err);
  } else if (typeof err === "object" && err !== null) {
    // Attempt to extract meaningful details from an object
    if ("error" in err && "message" in err) {
      console.error(`${context} - Backend Error Message:`, (err as any).message);
    } else {
      console.error(`${context} - Error Details:`, JSON.stringify(err));
    }
  } else {
    // Handle all other cases
    console.error(`${context} - Unknown Error:`, err);
  }
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
  useCreateProductMutation, // Export the mutation hook
  useGetExpensesQuery,
  useGetExpensesByCategoryQuery,
  useGetUsersQuery,
} = api;
