import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="variants" element={<VariantsPage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="faqs" element={<FaqsPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="agenda" element={<AgendaPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
