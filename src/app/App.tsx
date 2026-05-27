import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useMemo } from "react";

export default function App() {
  // Memoize router to prevent recreation on re-renders
  const memoizedRouter = useMemo(() => router, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={memoizedRouter} />
      </AuthProvider>
    </ErrorBoundary>
  );
}