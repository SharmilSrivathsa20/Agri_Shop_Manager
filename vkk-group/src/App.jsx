import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Billing from "./pages/Billing";
import StockEntry from "./pages/StockEntry";
import Login from "./pages/Login";
import ShopDashboard from "./pages/ShopDashboard";

function Layout() {

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const hideNavbar = location.pathname === "/login";

  // protect routes
  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/stock" element={<StockEntry />} />
        <Route path="/shop" element={<ShopDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;