import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import StallMenu from "./pages/StallMenu";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import VendorHome from "./pages/VendorHome";
import VendorDashboard from "./pages/VendorDashboard";

/* -------- Layouts -------- */

const LandingLayout = () => (
  <div className="min-h-screen bg-base-100">
    <Outlet />
  </div>
);

const MainLayout = () => (
  <div className="min-h-screen bg-base-100">
    <Navbar />
    <main className="pt-20 pb-10 px-4">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>

          <Routes>
            {/* Landing (NO navbar) */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* App routes (WITH navbar) */}
            <Route element={<MainLayout />}>
              {/* Customer */}
              <Route path="/customer" element={<Home />} />
              <Route path="/stall/:stallId" element={<StallMenu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:orderId" element={<OrderStatus />} />

              {/* Vendor */}
              <Route path="/vendor" element={<VendorHome />} />
              <Route path="/vendor/:stallId" element={<VendorDashboard />} />
            </Route>
          </Routes>

          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "hsl(var(--b2))",
                color: "hsl(var(--bc))",
                borderRadius: "999px",
              },
            }}
          />

        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
