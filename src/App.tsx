import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAdmin from "@/components/RequireAdmin";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import DashboardPage from "./pages/admin/DashboardPage.tsx";
import ProductsPage from "./pages/admin/ProductsPage.tsx";
import VariantsPage from "./pages/admin/VariantsPage.tsx";
import PoliciesPage from "./pages/admin/PoliciesPage.tsx";
import FaqsPage from "./pages/admin/FaqsPage.tsx";
import LeadsPage from "./pages/admin/LeadsPage.tsx";
import SimulatorPage from "./pages/admin/SimulatorPage.tsx";
import KnowledgePage from "./pages/admin/KnowledgePage.tsx";
import AgendaPage from "./pages/admin/AgendaPage.tsx";
import StudioInfoPage from "./pages/admin/StudioInfoPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="variants" element={<VariantsPage />} />
              <Route path="policies" element={<PoliciesPage />} />
              <Route path="faqs" element={<FaqsPage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="simulator" element={<SimulatorPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="info" element={<StudioInfoPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
