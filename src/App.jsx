import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./contexts/UserContext";
import { MainProvider } from "./contexts/MainContext";

// Templates
import DefaultTemplate from "./template/DefaultTemplate";
// Pages
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import LootPage from "./pages/LootPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

// Fonts
import "./assets/fonts/ByteBounce.ttf";
import "./assets/fonts/star-crush.regular.ttf";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
// CSS
import "./assets/css/index.css";
import ThankYouPage from "./pages/ThankYouPage";
import AuthRouteGreetings from "./components/AuthRouteGreetings";

export default function App() {
  return (
    <MainProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultTemplate}>
              <Route index Component={HomePage} />
              <Route path="/products" Component={ProductsListPage} />
              <Route path="/products/:slug" Component={ProductDetailPage} />
              <Route path="/about-us" Component={AboutUs} />
              <Route path="/login" Component={LoginPage} />
              <Route path="/register" Component={RegisterPage} />
              <Route path="/loot" Component={LootPage} />
              <Route path="/checkout" Component={CheckoutPage} />
              <Route
                path="/greetings"
                element={
                  <AuthRouteGreetings>
                    <ThankYouPage />
                  </AuthRouteGreetings>
                }
              />

              <Route
                path="/user/:username"
                element={
                  <AuthRoute>
                    <UserPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  // <AdminRoute>
                  <AdminPage />
                  // {/* </AdminRoute> */}
                }
              />
            </Route>
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </MainProvider>
  );
}
