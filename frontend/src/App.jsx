import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StallMenu from "./pages/StallMenu";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import VendorHome from "./pages/VendorHome";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
            <Navbar />
            <main className="pt-20 pb-10 px-4">
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/stall/:stallId" element={<StallMenu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:orderId" element={<OrderStatus />} />

                {/* Vendor Routes */}
                <Route path="/vendor" element={<VendorHome />} />
                <Route path="/vendor/:stallId" element={<VendorDashboard />} />
              </Routes>
            </main>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                  borderRadius: "100px",
                },
              }}
            />
          </div>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;