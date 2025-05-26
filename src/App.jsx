import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import CartPage from "./component/Pages/Cart/CartPage";
import LoginPage from "./component/Pages/RegAndLogin/LoginPage";
import RegisterPage from "./component/Pages/RegAndLogin/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import SinglePage from "./component/Pages/SinglePage/SinglePage";
import PublicRoute from "./PublicRoute";
import Profile from "./component/Pages/RegAndLogin/Profile";
import Categories from "./component/Pages/Categories/Categories ";
import About from "./component/Pages/About/About";
import About1 from "./component/Pages/About/About1";
import Contact from "./component/Pages/Contact/Contact";
import CheckoutPage from "./component/Pages/Cart/CheckoutPage";

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
  const is404 =
    ![
      "/",
      "/shop",
      "/about",
      "/about1",
      "/contact",

      "/productdetails/:id",
      "/cart",
      "/login",
      "/register",
      "/profile",
      "/shop/:categoryName/:subcategoryName",
    ].includes(location.pathname) &&
    !location.pathname.startsWith("/shop") &&
    !location.pathname.startsWith("/productdetails") &&
    !location.pathname.startsWith("/verify") &&
    !location.pathname.startsWith("/reset-password");

  return (
    <>
      {!is404 && <Header />} {/* 🔹 Hide Header if it's 404 */}
      <Routes>
        <Route path="/" element={<Mainbody />} />
        <Route path="/shop" element={<div></div>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/about1" element={<About1 />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/productdetails/:id" element={<SinglePage />} />
          <Route
            path="/shop/:categoryName/:subcategoryName"
            element={<Categories />}
          />
        </Route>
         <Route path="/checkout" element={<CheckoutPage />} />

        {/* ✅ Catch-All Route for 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!is404 && <Footer />} {/* 🔹 Hide Header if it's 404 */}
    </>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme="colored"
      />
      <AppLayout />
    </Router>
  );
}

export default App;
