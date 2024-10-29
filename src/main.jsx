import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";

// Lazy load the App component
const App = lazy(() => import("./App"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Suspense fallback={<center>Loading...</center>}> */}
      <App />
      {/* </Suspense> */}
    </QueryClientProvider>
  </StrictMode>,
);
