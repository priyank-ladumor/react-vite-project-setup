import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Loading from "@/components/loader/loader";
import { CartProvider } from "@/stores/demo.context";

const App = lazy(() => import("@/App"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
);
