import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./presentation/pages/authentikasi/Login";
import Register from "./presentation/pages/authentikasi/Register";
import Home from "./presentation/pages/home/Home";
import ProductDetail from "./presentation/pages/users/ProductDetail";
import Custom from "./presentation/pages/users/CustomStudio";
import Cart from "./presentation/pages/users/Cart";
import Profile from "./presentation/pages/authentikasi/Profile";
import Checkout from "./presentation/pages/payment/Checkout";
import PaymentInstruction from "./presentation/pages/payment/PaymentInstruction";
import { PageTransition } from "./presentation/components/PageTransition";
import { CheckoutLayout } from "./presentation/components/molecules/CheckoutLayout";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Komponen internal untuk menangani lokasi rute berpindah
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/custom"
          element={
            <PageTransition>
              <Custom />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/product"
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          }
        />

        {/* Rute Berantai Checkout Flow menggunakan Layout */}
        {/* <Route element={<CheckoutLayout />}>
          <Route
            path="/cart"
            element={
              <PageTransition>
                <Cart />
              </PageTransition>
            }
          />
          <Route
            path="/checkout"
            element={
              <PageTransition>
                <Checkout />
              </PageTransition>
            }
          />
          <Route
            path="/payment"
            element={
              <PageTransition>
                <PaymentInstruction />
              </PageTransition>
            }
          />
        </Route> */}
        <Route element={<CheckoutLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentInstruction />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
