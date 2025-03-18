import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header/Header";
import Mainbody from "./component/Mainbody/Mainbody";
import "./index.css";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/owl.carousel.css";
import "./assets/css/vipodha_megamenu.css";
import "./assets/css/style.css";
import Footer from "./component/Header/Footer";
import CartPage from "./component/Pages/CartPage";
import LoginPage from "./component/Pages/RegAndLogin/LoginPage";
import RegisterPage from "./component/Pages/RegAndLogin/RegisterPage";
import SingleSareePage from "./component/Pages/SingleSareePage";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";

// ✅ 404 Not Found Component
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>404 - Page Not Found</h2>
    <p>Oops! The page you're looking for doesn't exist.</p>
  </div>
);

// ✅ Wrapper Component to Hide Header on 404 Page
const AppLayout = () => {
  const location = useLocation(); // 🔹 Get the current route

  // 🔹 Hide Header only on the 404 page
  const hideHeaderRoutes = ["/404"]; 
  const is404 = !["/", "/shop", "/cart", "/login", "/register"].includes(location.pathname) &&
              !location.pathname.startsWith("/shop/SingplesareePage/");

  return (
    <>
      {!is404 && <Header /> } {/* 🔹 Hide Header if it's 404 */}
      <Routes>
        <Route path="/" element={<Mainbody />} />
        <Route path="/shop" element={<div></div>} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Add Cart Page Route */}
        <Route path="/login" element={<LoginPage />} /> {/* ✅ Add Login Page Route */}
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ Add Register Page Route */}
       

        <Route element={<ProtectedRoute />}>
        <Route path="/shop/SingplesareePage/:id" element={<SingleSareePage />} />
        </Route>


        {/* ✅ Catch-All Route for 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!is404 && <Footer /> } {/* 🔹 Hide Header if it's 404 */}
    </>
  );
};

function App() {
  return (
    <Router>
         <ToastContainer />
      <AppLayout />
    </Router>
  );
}

export default App;
