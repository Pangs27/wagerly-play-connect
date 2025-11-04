import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Matchmaking from "./pages/Matchmaking";
import AppWelcome from "./pages/AppWelcome";
import Wagers from "./pages/Wagers";
import Predictions from "./pages/Predictions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/app/welcome" element={<AppWelcome />} />
          <Route path="/wagers" element={<Wagers />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
